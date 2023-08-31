import { randomInt } from "node:crypto"
import { LDClient, LDContext } from "launchdarkly-node-server-sdk"
import { v4 as uuidv4 } from "uuid"

import contexts from "./contexts.json" assert { type: "json" }
import { Evaluatable } from "./evaluation.js"

const users = contexts.users as User[]
const organizations = contexts.organizations as Organization[]

interface User {
    name: string
}

interface Organization {
    key: string
    name: string
}

class Context implements Evaluatable {
    private readonly ldClient: LDClient
    private readonly ldContext: LDContext

    constructor(client: LDClient, user: User, organization: Organization) {
        this.ldClient = client
        this.ldContext = {
            kind: "multi",
            user: {
                kind: "user",
                key: uuidv4(),
                name: user.name,
                email: user.name.replace(" ", "").toLowerCase + "@" + organization.key + ".com",
            },
            organization: {
                kind: "organization",
                key: organization.key,
                name: organization.name,
            },
        }
    }

    async evaluate() {
        const flagValue = await this.ldClient.variation("new-feature-sample", this.ldContext, "off")
        return {
            value: flagValue
        }
    }
}

export default function Contexts(client: LDClient) {
    const contexts: Context[] = []
    for (let index = 0; index < users.length; index++) {
        const user = users[index]
        const organization = organizations[(index * randomInt(281474976710655)) % 10]
        contexts.push(new Context(client, user, organization))
    }
    return contexts
}

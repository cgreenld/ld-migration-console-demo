import chalk from "chalk"
import fs from "node:fs"

import { Evaluatable, Evaluation } from "./evaluation.js"

function RenderReadString(enabled: boolean, authoritative: boolean) {
    return enabled ? chalk.greenBright(authoritative ? chalk.bold.underline("Enabled") : "Enabled") : chalk.gray("Disabled")
}

// function RenderWriteString(enabled: boolean, authoritative: boolean) {
//     return enabled ? chalk.greenBright(authoritative ? chalk.bold.underline("W") : "w") : chalk.gray("w")
// }

function RenderEvaluation(evaluation: Evaluation) {
    const components = [
        chalk.white("["),
        RenderReadString(evaluation.value, !evaluation.value),
        chalk.white("]"),
    ]
    return components.join("")
}

export default async function Render(evaluateables: Evaluatable[]) {
    const evaluations = await Promise.all(evaluateables.map((evaluateable) => evaluateable.evaluate()))
    fs.writeSync(1, "\x1B[2J\x1B[H")
    fs.writeSync(
        1,
        "┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐\n",
    )
    fs.writeSync(
        1,
        `│                                                   ${chalk.bold.underline(
            "RELEASE PROGRESSION",  
        )}                                                    │\n`,
    )
    fs.writeSync(
        1,
        "│                                                                                                                          │\n",
    )
    fs.writeSync(
        1,
        `│                                          ${chalk.gray("Feature Disabled")}          ${chalk.greenBright(
            "Feature Enabled"   ,              
        )}                                       │\n`,
    )
    fs.writeSync(
        1,
        "┝━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┥\n",
    )
    fs.writeSync(
        1,
        "│                                                                                                                          │\n",
    )
    
    evaluations.forEach((evaluation, index) => {
        if (index % 10 == 0) {
            fs.writeSync(1, "│  ")
        }
        fs.writeSync(1, RenderEvaluation(evaluation) + "  ")
        if(evaluation.value == true) {
            fs.writeSync(1, " ")
        }
        if (index % 10 == 9) {
            fs.writeSync(1, "│\n")
            fs.writeSync(1, "│                                                                                                                          │\n")
        }
    })
    fs.writeSync(
        1,
        "└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘\n",
    )
    fs.writeSync(1, "\n")
    fs.fsyncSync(1)
}

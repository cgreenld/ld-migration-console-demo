# De-Risk Use Case Demos for LaunchDarkly
This repository houses the code to help better visualize what the De-Risked release could look like across multiple context instances.

On the front end this could be something like browsers or users, on the backend this could illustrate how this serves as an improvement
over the Blue Green Deployment.  Especially in environments where you can't count on audience participation to demoo a % rollout, this 
provided a way to show the power of decoupling deploy from release at scale

## Turn on a New Feature without releasing a new Version

- Toggle the flag on

## Turn off a Feature without releasing a new version

- toggle the flag off

## Make It Gradual

- Leverage a % rollout

# Setting Up the Demo
To run this demo, you will need to have Node.js 16+ installed on your workstation, along with a distribution of npm and 
yarn to install dependencies, build the application, and optionally run it.

The demo requires access to a LaunchDarkly project with at least one environment, and a flag with the key 
"new-feature-sample".  This flag must have six variations, each with the following keys.

- "true"
- "false"

Once you have this project, environment, and flag created, configure the demo with the SDK Key.  Copy the 
```.env.sample``` file to ```.env``` and add the value of the SDK Key to the LAUNCHDARKLY_SDK_KEY environment variable.

Install the dependencies for the demo by running ```yarn install``` in the root directory, and then build the demo by 
running ```yarn build```.  This will create an executable distribution in the ```dist``` directory.  You can run this 
demo by running ```yarn start``` or changing your working directory to ```dist``` and running ```node index.js```.

# Suggested Script/Demonstration Flow


import {Client} from "@typeit/discord";
import {
    NeoBot
} from "./bot"
import * as fs from 'fs';

async function run() {

    const secretName = "bot_token"
    const secretPath = `/run/secrets/${secretName}`
    console.log(`Trying to load secret '${secretPath}'.`)
    if (!fs.existsSync(secretPath)) {
        console.log("No token is provided, unable to run bot. Please provide in secret in docker-compose.yml file. ")
        return;
    }
    let token = fs.readFileSync(secretPath).toString();

    let client = new Client({
        classes: [
            NeoBot
        ],
        silent: false,
        variablesChar: ":"
    });
    await client.login(token);
}

run().then();
import { RequestInit } from 'node-fetch';

export const hostname = process.env.JIRA_HOSTNAME;
const username = process.env.JIRA_USERNAME;
const password = process.env.JIRA_PASSWORD;
export const region = process.env.REGION ?? '';

if (!hostname) {
    console.error('No jira hostname!')
    process.exit(1);
}
if (!username) {
    console.error('No Username!')
    process.exit(1);
}
if (!password) {
    console.error('No password!')
    process.exit(1);
}

export const fetchOptions: RequestInit = {
    headers: {
        'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
        'Content-Type': 'application/json',
        'User-Agent': 'github.com/tricks-gmbh/tempo_cli',
    }
};

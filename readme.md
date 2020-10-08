# jira tempo cli by tricks

## Production Use

    docker run -it --rm -e JIRA_HOSTNAME=jira.company.org -e JIRA_USERNAME=m.mustermann -e JIRA_PASSWORD="passwd" -e REGION="NW" tricks/tempo_cli

For region choose an Bundesland like https://github.com/sfakir/feiertagejs/blob/master/docs.md#region

## Dev Use

    git clone git@github.com:tricks-gmbh/tempo_cli.git
    cd tempo_cli
    cp .env.dist .env

Please edit the .env file

    npm run watch

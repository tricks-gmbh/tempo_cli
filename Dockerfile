FROM node:14-alpine

ENV JIRA_HOSTNAME "jira.company.org"
ENV COMPANY "tricks"
ENV JIRA_USERNAME "m.mustermann"
ENV JIRA_PASSWORD "passwd"
ENV REGION "NW"

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY * ./

RUN npm run build

ENTRYPOINT ["node", "dist/"]

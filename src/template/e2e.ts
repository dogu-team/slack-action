import * as github from "@actions/github"


import { Slack } from "../sdk/slack";
import { users } from "../user";
import { SlackOption } from "./template";

export async function e2e(option: SlackOption) {
  const { workflow, serverUrl, repo, runId, actor } = github.context
  const { pull_request, comment } = github.context.payload
  const nickname = users[actor] ? users[actor] : actor;

  await Slack.web.chat.postMessage({
    channel: option.channel,
    "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*${ workflow }* :circleci-fail:`
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `Action\n${ serverUrl }/${ repo.repo }/actions/runs/${ runId }`
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `Commit\n - author: @${nickname} (${ actor })\n - message: ${ JSON.stringify(github.context.payload) }\n - link: ${ pull_request ? pull_request.html_url : 'error' }`
          }
        }
      ]
  })
}
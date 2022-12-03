import github from "@actions/github"


import { Slack } from "../sdk/slack";
import { users } from "../user";
import { SlackOption } from "./template";

export async function e2e(option: SlackOption) {
  const { workflow } = github.context
  const actor = github.context.actor;
  const nickname = users[actor] ? users[actor] : actor;

  await Slack.web.chat.postMessage({
    channel: option.channel,
    "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*${nickname}*\n*${{ workflow }}* :circleci-fail:`
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Action\n${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Commit\n - author: ${{github.event.head_commit.author.name}}\n - message: ${{github.event.head_commit.message}}\n - link: ${{ github.event.pull_request.html_url || github.event.head_commit.url }}"
          }
        }
      ]
  })
}
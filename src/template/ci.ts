import * as github from '@actions/github';
import * as core from '@actions/core';

import { Slack } from '../sdk/slack';
import { users } from '../user';
import { SlackOption } from './template';

export async function CI(option: SlackOption) {
  const context = github.context;
  const payload = github.context.payload;
  const userId = users[context.actor] ? users[context.actor] : context.actor;

  await Slack.web.chat.postMessage({
    channel: option.channel,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${context.workflow}* :circleci-fail:`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Action*\n${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Commit*\n - author: <@${userId}> (${
            context.actor
          })\n - message: ${payload.head_commit.message}\n - link: ${
            payload.pull_request
              ? payload.pull_request.html_url
              : payload.head_commit.url
          }`,
        },
      },
    ],
  });
}

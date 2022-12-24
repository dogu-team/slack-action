import * as github from '@actions/github';
import * as core from '@actions/core';

import { Slack } from '../sdk/slack';
import { users } from '../user';
import { SlackOption } from './template';

export async function cd(option: SlackOption) {
  const context = github.context;
  const payload = github.context.payload;
  const userId = users[context.actor] ? users[context.actor] : context.actor;
  const fail = core.getInput('fail', { required: false }) === 'true';

  await Slack.web.chat.postMessage({
    channel: option.channel,
    icon_emoji: ':arona:',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${context.workflow}* ${
            fail ? ':circleci-fail:' : ':circleci-pass:'
          }`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Action*\n- trigger: <@${userId}>\n- url: ${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`,
        },
      },
    ],
  });
}

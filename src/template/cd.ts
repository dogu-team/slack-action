import * as github from '@actions/github';

import { Slack } from '../sdk/slack';
import { users } from '../user';
import { SlackOption } from './template';

export async function CD(option: SlackOption) {
  const context = github.context;
  const payload = github.context.payload;
  const userId = users[context.actor] ? users[context.actor] : context.actor;

  await Slack.web.chat.postMessage({
    channel: option.channel,
    icon_emoji: option.isFail ? ':what:' : ':arona:',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${context.workflow}* ${
            option.isFail ? ':circleci-fail:' : ':circleci-pass:'
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

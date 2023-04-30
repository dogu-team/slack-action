import * as github from '@actions/github';
import * as core from '@actions/core';

import { Slack } from '../sdk/slack';
import { users } from '../user';
import { TemplateOption } from './template';
import { ResultStatus } from '../types';
import { Emoji } from '../emoji/emoji';

export async function CI(option: TemplateOption) {
  const context = github.context;
  const payload = github.context.payload;
  const userId = users[context.actor] ? users[context.actor] : context.actor;

  const slackMessage = {
    channel: option.channel,
    icon_emoji: Emoji.getProfile(option.resultStatus),
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${context.workflow}* ${Emoji.getCircle(option.resultStatus)}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Action*\n${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`,
        },
      },
    ],
  };

  if (option.resultStatus === ResultStatus.FAILURE) {
    slackMessage.blocks.push({
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
    });
  }

  await Slack.web.chat.postMessage(slackMessage);
}

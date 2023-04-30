import * as github from '@actions/github';

import { Slack } from '../sdk/slack';
import { users } from '../user';
import { TemplateOption } from './template';
import { ResultStatus } from '../types';
import { Emoji } from '../emoji/emoji';

export async function CD(option: TemplateOption) {
  const context = github.context;
  const payload = github.context.payload;
  const userId = users[context.actor] ? users[context.actor] : context.actor;

  await Slack.web.chat.postMessage({
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
          text: `*Action*\n- trigger: <@${userId}>\n- url: ${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`,
        },
      },
    ],
  });
}

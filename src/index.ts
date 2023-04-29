import * as core from '@actions/core';
import './types';

import { Slack } from './sdk/slack';
import { templates } from './template/template';

(async () => {
  try {
    const slackChannel = core.getInput('slack-channel-id');
    const templateName = core.getInput('template');
    const fail = core.getInput('fail');

    Slack.init(process.env.SLACK_BOT_TOKEN);

    const template = templates[templateName];
    if (!template) {
      core.setFailed('No template specified');
      return;
    }

    await template({
      channel: slackChannel,
      fail: fail === 'true' ? true : false,
    });
  } catch (error: any) {
    core.setFailed(error.message);
  }
})();

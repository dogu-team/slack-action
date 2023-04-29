import * as core from '@actions/core';
import * as github from '@actions/github';
import './types';

import { Slack } from './sdk/slack';
import { templates } from './template/template';

(async () => {
  try {
    const slackChannel = core.getInput('slack-channel-id');
    const templateName = core.getInput('template');
    const isFail = core.getBooleanInput('is-fail');

    Slack.init(process.env.SLACK_BOT_TOKEN);

    const template = templates[templateName];
    if (!template) {
      core.setFailed('No template specified');
      return;
    }

    await template({
      channel: slackChannel,
      isFail: isFail,
    });
  } catch (error: any) {
    core.setFailed(error.message);
  }
})();

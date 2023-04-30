import * as core from '@actions/core';
import * as github from '@actions/github';
import './types';

import { Slack } from './sdk/slack';
import { templates } from './template/template';
import { ResultStatus } from './types';

(async () => {
  try {
    const slackChannel = core.getInput('slack-channel-id');
    const templateName = core.getInput('template');
    const resultStatus = core.getInput('result-status');
    const ignoreNotify = core.getBooleanInput('ignore-notify', {
      required: false,
    });

    if (ignoreNotify) {
      return;
    }

    Slack.init(process.env.SLACK_BOT_TOKEN);

    const template = templates[templateName];
    if (!template) {
      core.setFailed('No template specified');
      return;
    }

    const existResultStatus = Object.values(ResultStatus).includes(
      resultStatus as ResultStatus,
    );
    if (existResultStatus) {
      core.setFailed(`${resultStatus} is invalid status`);
      return;
    }

    await template({
      channel: slackChannel,
      resultStatus: resultStatus as ResultStatus,
    });
  } catch (error: any) {
    core.setFailed(error.message);
  }
})();

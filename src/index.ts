import core from "@actions/core"
import github from "@actions/github"
import { Slack } from "./sdk/slack";
import { templates } from "./template/template";
import { users } from "./user";

(async () => {
  try {
    const slackToken = core.getInput('slack-token');
    const slackChannel = core.getInput('slack-channel');
    const templateName = core.getInput("template");

    Slack.init(slackToken);

    const template = templates[templateName];
    if(!template) {
      core.setFailed("No template specified")
      return;
    }
    
    await template({channel: slackChannel});
  }
  catch(error: any) {
    core.setFailed(error.message);
  }
})();
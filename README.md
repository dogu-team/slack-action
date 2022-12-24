# Slack Action

## Inputs

### `slack-channel-id`

**Required** Slack Channel ID

### `template`

**Required** Action Template

- e2e
- cd (required input: "fail")

## Example usage

```yaml
- name: Send Slack
  uses: dogu-team/slack@v1.0
  with:
    template: 'e2e'
    slack-channel-id: 'C03PL9TC44Q'
  env:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
```

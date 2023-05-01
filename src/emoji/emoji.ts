import { ResultStatus } from '../types';

export module Emoji {
  export function getCircle(status: ResultStatus) {
    switch (status) {
      case ResultStatus.SUCCESS:
        return ':circleci-pass:';
      case ResultStatus.FAILURE:
        return ':circleci-fail:';
      case ResultStatus.CANCELLED:
        return ':circleci-cancel:';
      case ResultStatus.SKIPPED:
        return ':circleci-skip:';
      default:
        return ':circleci-cancel:';
    }
  }

  export function getProfile(status: ResultStatus) {
    switch (status) {
      case ResultStatus.SUCCESS:
        return ':arona:';
      case ResultStatus.FAILURE:
        return ':what:';
      case ResultStatus.CANCELLED:
        return ':like_peanuts:';
      case ResultStatus.SKIPPED:
        return ':arknights_2:';
      default:
        return ':paimon-ahe:';
    }
  }
}

import { DatabaseDelegate } from './databases';

export class YouleapClient {
  get db(): DatabaseDelegate {
    return new DatabaseDelegate();
  }
}

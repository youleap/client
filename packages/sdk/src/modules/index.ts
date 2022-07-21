import { ErrorFormat, LogDefinition, LogLevel, YouleapClientOptions } from '../types';
import { DatabaseDelegate } from './databases';

export class YouleapClient {
  private errorFormat?: ErrorFormat;
  private log?: Array<LogLevel | LogDefinition>;

  constructor(args?: YouleapClientOptions) {
    this.errorFormat = args?.errorFormat;
    this.log = args?.log;
  }
  
  get db(): DatabaseDelegate {
    return new DatabaseDelegate();
  }
}

const youleap = new YouleapClient();
const furniture = await youleap.db.catalog.furniture.count({
  select: {
    id: true,
  },
  where: {
    images: {
      isEmpty: true,
    },
  },
});

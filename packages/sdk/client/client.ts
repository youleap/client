import { ErrorFormat, LogDefinition, LogLevel, YouleapClientOptions } from '../types';
export class YouleapClient {
  private errorFormat?: ErrorFormat;
  private log?: Array<LogLevel | LogDefinition>;
  private accessToken?: string;

  constructor(args?: YouleapClientOptions) {
    this.errorFormat = args?.errorFormat;
    this.log = args?.log;
    this.accessToken = args?.accessToken;
  }

  public function = {};
  public api = {};
}

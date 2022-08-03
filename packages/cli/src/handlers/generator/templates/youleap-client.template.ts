export const YOULEAP_CLIENT_TEMPLATE = `
import { ErrorFormat, LogDefinition, LogLevel, YouleapClientOptions } from '../types/index';
import { CatalogDelegate } from './bases';

export class YouleapClient {
  private errorFormat?: ErrorFormat;
  private log?: Array<LogLevel | LogDefinition>;

  constructor(args?: YouleapClientOptions) {
    this.errorFormat = args?.errorFormat;
    this.log = args?.log;
  }
  
  public function = {};
  public api = {};
}
`;

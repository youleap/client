import { ErrorFormat, LogDefinition, LogLevel, YouleapClientOptions } from '../types/index';
import { CatalogDelegate } from './bases';

export class YouleapClient {
  private errorFormat?: ErrorFormat;
  private log?: Array<LogLevel | LogDefinition>;
  private accessToken?: string;

  constructor(args?: YouleapClientOptions) {
    this.errorFormat = args?.errorFormat;
    this.log = args?.log;
    this.accessToken = args?.accessToken;
  }

  public db = {
    catalog: new CatalogDelegate(this.accessToken),
  };

  public function = {};
  public api = {};
}

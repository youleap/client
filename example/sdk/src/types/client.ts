import { ErrorFormat, LogDefinition, LogLevel } from './common';

export interface YouleapClientOptions {
  errorFormat?: ErrorFormat;
  log?: Array<LogLevel | LogDefinition>;
  accessToken?: string;
}

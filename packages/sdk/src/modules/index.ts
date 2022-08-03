import { ErrorFormat, LogDefinition, LogLevel, YouleapClientOptions } from '../types';
import { DatabaseDelegate } from './databases';

export class YouleapClient {
  private errorFormat?: ErrorFormat;
  private log?: Array<LogLevel | LogDefinition>;
  private accessToken?: string;

  constructor(args?: YouleapClientOptions) {
    this.errorFormat = args?.errorFormat;
    this.log = args?.log;
    this.accessToken = args?.accessToken;
  }

  get db(): DatabaseDelegate {
    return new DatabaseDelegate();
  }
}

// const youleap = new YouleapClient();
// const furniture = youleap.db.catalog.furniture.findUnique({
//   select: {
//     id: true,
//   },
//   where: {
//     id: 'row_dfasdfasdf',
//   },
// });

// const mongoQuery = {
//   tableId: 'table_asdfasdfasdf',
//   id: 'row_dfasdfasdf',
//   $or: [
//     {
//       id: 'row_dfasdfasdf',
//       'cells.columnName': 'images',
//       'cells.value': 'asdf',
//       $and: {
//         'cells.columnName': 'inStock',
//         'cells.value': true,
//       },
//     },
//     {
//       'cells.columnName': 'unitCost',
//       'cells.value': {
//         $gte: 83,
//         $lt: 23,
//         $in: [8, 2, 1],
//       },
//     },
//   ],
// };

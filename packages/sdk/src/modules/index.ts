import { DatabaseDelegate } from './databases';

export class YouleapClient {
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
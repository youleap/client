import { YouleapClient } from '@youleap/sdk';
const youleap = new YouleapClient({ accessToken: 'YOULEAP_SECRET' });

(async () => {
  //TODO: add strict Date validation within the SDK
  //TODO: Add move verbose "BAD REQUEST" error messaging
  const result = await youleap.db.smsBroadcast.stores.create({
    data: {
      storeId: 123123,
    },
  });

  console.log(result);
})();

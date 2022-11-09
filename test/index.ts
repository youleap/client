import { YouleapClient } from '@youleap/sdk';
const youleap = new YouleapClient({ accessToken: 'YOULEAP_SECRET' });

(async () => {
  //TODO: add strict Date validation within the SDK
  //TODO: Add move verbose "BAD REQUEST" error messaging
  const result = await youleap.db.smsBroadcast.stores.findFirst({
    where: {
      excludedDates: {
        equals: 'opt1',
      },
    },
  });

  console.log(result);
})();

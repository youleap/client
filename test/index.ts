import { YouleapClient } from '@youleap/sdk';
const youleap = new YouleapClient({ accessToken: 'YOULEAP_SECRET' });

(async () => {
  //TODO: add strict Date validation within the SDK
  //TODO: Add move verbose "BAD REQUEST" error messaging
  const result = await youleap.db.smsBroadcast.stores.findUnique({
    where: {
      id: 'row_cvxhc8jl8bndp6t',
    },
  });

  console.log(result);
})();

import { YouleapClient } from '@youleap/sdk';
const youleap = new YouleapClient();

(async () => {
  const result = await youleap.db.baseTheBest.bestTableEver.findFirst({
    where: {
      name: 'mama',
    },
  });

  console.log(result);
})();

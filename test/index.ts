import { YouleapClient } from '@youleap/sdk';
const youleap = new YouleapClient({ accessToken: 'YOULEAP_SECRET' });

(async () => {
  /////TODO: fix multiselect not working in SDK.
  /////TODO: fix create method requiring the addition of non-required fields.s
  //TODO: add strict Date validation within the SDK
  const result = await youleap.db.smsBroadcast.campaigns.create({
    data: {
      week: 3,
      day: 'Sunday',
      link: 'https://youleap-local.io',
      addContactName: true,
      addUnsubscribeLink: false,
      cronjobId: 'cron1',
      type: 2,
    },
  });

  console.log(result);
})();

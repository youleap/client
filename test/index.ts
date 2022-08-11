import { YouleapClient } from '@youleap/sdk';

const youleap = new YouleapClient();

(async () => {
  try {
    const result = await youleap.db.catalog.furniture.updateMany({
      where: {
        unitCost: "4543",
      },
      data: {
        name: 'lols',
        vendor: 'someRandoVendor',
      },
    });

    console.log({ result });
  } catch (e) {
    console.log(e);
  }
})();

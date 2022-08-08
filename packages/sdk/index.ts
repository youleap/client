export class YouleapClient {
  constructor() {
    throw new Error(
      'You should generate this SDK before using it. Please install the youleap cli and follow the instructions: \n' +
        'Install the Youleap CLI: `npm install -g @youleap/cli` \n' +
        "Authenticate the CLI to you'r Youleap account: `youleap auth login` \n" +
        'Generate the SDK: `youleap generate` \n' +
        '\n\nSee the documentation for details: https://www.npmjs.com/package/@youleap/@youleap/cli',
    );
  }
}

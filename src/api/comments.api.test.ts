import { bootstrap, HttpClient } from '@wix/yoshi-flow-bm/test/serverless';
import { fetchComments } from './comments.api';
import { aComment } from '@wix/ambassador-node-workshop-scala-app/builders';

import {
  NodeWorkshopScalaApp,
  Comment,
} from '@wix/ambassador-node-workshop-scala-app/rpc';

const serverlessApp = bootstrap();

describe('Comments API', () => {
  serverlessApp.beforeAndAfter();

  let client: HttpClient;
  beforeAll(async () => {
    client = new HttpClient({ baseURL: serverlessApp.getUrl() });
  });
  it('Should return comments', async () => {
    const commentsStub =
      serverlessApp.ambassador.createStub(NodeWorkshopScalaApp);

    const mockComment = aComment().build();
    const anotherComment: Comment = { author: 'Ariel', text: 'OMG' };
    commentsStub
      .CommentsService()
      .fetch.always()
      .resolve([mockComment, anotherComment]);

    const { data: response } = await client.request(fetchComments());
    expect(response.comments.length).toEqual(2);
    expect(response.comments.map((c) => c.text)).toContain('OMG');
  });
});

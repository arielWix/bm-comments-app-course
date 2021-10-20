import { method } from '@wix/yoshi-flow-bm/serverless';

import {
  NodeWorkshopScalaApp,
  Comment,
} from '@wix/ambassador-node-workshop-scala-app/rpc';

const commentService = NodeWorkshopScalaApp().CommentsService();

const MY_APP_ID = '8e4e1d91-8ab7-437b-9ee5-bb3cd76173b1';

export const fetchComments = method(async function () {
  const commentsRes = await commentService(this.context.aspects).fetch(
    MY_APP_ID,
  );
  return { comments: commentsRes };
});

export const addComment = method(async function (commentToAdd: string) {
  const newComment: Comment = {
    author: 'Ariel',
    text: commentToAdd,
  };
  await commentService(this.context.aspects).add(MY_APP_ID, newComment);
});

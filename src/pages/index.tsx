import React, { FC, useCallback, useEffect, useState } from 'react';
import { useAppLoaded, useHttpClient } from '@wix/yoshi-flow-bm';

import { addComment, fetchComments } from '../api/comments.api';

const Index: FC = () => {
  useAppLoaded({ auto: true });

  const httpClient = useHttpClient();
  const [text, setText] = useState('');
  const [savedComments, setComments] = useState<string[]>([]);

  const refreshData = useCallback(async () => {
    try {
      const comments = await httpClient.request(fetchComments());
      setComments(comments.data.comments.map((c) => c.text));
      setText('');
    } catch (e) {}
  }, [httpClient]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleSubmit = async () => {
    try {
      await httpClient.request(addComment(text));
      await refreshData();
    } catch (e) {}
  };

  return (
    <div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}> Click Me! </button>
      <div>List of comments:</div>
      <div>
        {savedComments?.map((comment) => (
          <div>{comment}</div>
        ))}
      </div>
    </div>
  );
};

export default Index;

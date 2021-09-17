import React, { useState } from 'react';
import PostItem from './components/PostItem';
import './styles/app.css'

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'JS', body: 'Description' },
    { id: 2, title: 'JS 2', body: 'Description' },
    { id: 3, title: 'JS 3', body: 'Description' },
    { id: 4, title: 'JS 4', body: 'Description' },
    { id: 5, title: 'JS 5', body: 'Description' }
  ])

  return (
    <div className="App">
      {posts.map(post =>
        <PostItem post={post} key={post.id} />
      )}
    </div>
  );
}

export default App;

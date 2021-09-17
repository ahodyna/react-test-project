import React, {useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

import './styles/app.css'

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'JS', body: 'Description' },
    { id: 2, title: 'JS 2', body: 'Description' },
    { id: 3, title: 'JS 3', body: 'Description' },
    { id: 4, title: 'JS 4', body: 'Description' },
    { id: 5, title: 'JS 5', body: 'Description' }
  ])
const createPost = (newPost) => {
  setPosts([...posts, newPost])
}


  return (
    <div className="App">

      <PostForm create={createPost}/>
      <PostList posts={posts} title="List of Post 1" />

    </div>
  );
}

export default App;

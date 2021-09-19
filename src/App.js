import React, { useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MySelect from './components/UI/select/MySelect';

import './styles/app.css'

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'aJS', body: 'aDescription' },
    { id: 2, title: 'wJS 2', body: 'vDescription' },
    { id: 3, title: 'qwJS 3', body: 'rDescription' },
    { id: 4, title: 'tJS 4', body: 'Description' },
    { id: 5, title: 'aJS 5', body: 'qDescription' }
  ])

  const [selectedSort, setSelectedSort] = useState('')

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort)
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
  }


  return (
    <div className="App">

      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>

        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Sort by"
          options={[
            { value: 'title', name: 'name' },
            { value: 'body', name: 'description' },
          ]}></MySelect>
      </div>
      {posts.length !== 0 ? <PostList remove={removePost} posts={posts} title="List of Post 1" />
        : <h2 style={{ textAlign: 'center' }}>Not found</h2>}


    </div>
  );
}

export default App;

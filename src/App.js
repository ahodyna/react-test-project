import React, { useState, useMemo } from 'react';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';


import './styles/app.css'

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'aJS', body: 'aDescription' },
    { id: 2, title: 'wJS 2', body: 'vDescription' },
    { id: 3, title: 'qwJS 3', body: 'rDescription' },
    { id: 4, title: 'tJS 4', body: 'Description' },
    { id: 5, title: 'aJS 5', body: 'qDescription' }
  ])
  const [filter, setFilter] = useState({ sort: '', query: '' })


  const sortedPost = useMemo(() => {

    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSerchedPosts = useMemo(() => {
    return sortedPost.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPost])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">

      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />

      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />

      {sortedAndSerchedPosts.length
        ?
        <PostList remove={removePost} posts={sortedAndSerchedPosts} title="List of Post 1" />
        :
        <h2 style={{ textAlign: 'center' }}>Not found</h2>}


    </div>
  );
}

export default App;

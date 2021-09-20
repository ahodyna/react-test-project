import React, { useEffect, useState } from 'react';
import { usePosts } from './hooks/usePosts';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/modal/MyModal';


import './styles/app.css'
import PostService from './API/PostService';
import Loader from './components/UI/loader/Loader';

function App() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSerchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(() => {
    fetchPosts()
  }, [])


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  async function fetchPosts() {
    setIsPostsLoading(true)
    const posts = await PostService.getAll();
    setPosts(posts.data)
    setIsPostsLoading(false)
  }


  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>Create post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} /></MyModal>
      <hr style={{ margin: '15px 0' }} />

      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {isPostsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center' , marginTop: 50}}> <Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSerchedPosts} title="List of Post 1" />
      }


    </div>
  );
}

export default App;

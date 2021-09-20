import React, { useEffect, useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/modal/MyModal';

import '../styles/app.css'
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { getPageCount } from '../utils/page';
import Pagination from '../components/UI/pagination/Pagination';

function Posts() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotaPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const sortedAndSerchedPosts = usePosts(posts, filter.sort, filter.query);



  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotaPages(getPageCount(totalCount, limit));
  })

  console.log('totalPages', totalPages)
  useEffect(() => {
    fetchPosts()
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
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
      {postError &&
        <h2>Smth went wrong...{postError}</h2>

      }
      {isPostsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}> <Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSerchedPosts} title="List of Post 1" />
      }

      <Pagination page={page}
       changePage={changePage} 
      totalPages={totalPages} />

    </div>
  );
}

export default Posts;

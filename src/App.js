import React from 'react';
import PostItem from './components/PostItem';
import './styles/app.css'

function App() {

  return (
    <div className="App">
      <PostItem post={{ id: 1, title: 'JS', body: 'Description' }} />
      <PostItem post={{ id: 2, title: 'JS', body: 'Description' }} />
      <PostItem post={{ id: 3, title: 'JS', body: 'Description' }} />
      <PostItem post={{ id: 4, title: 'JS', body: 'Description' }} />
      <PostItem post={{ id: 5, title: 'JS', body: 'Description' }} />
    </div>
  );
}

export default App;

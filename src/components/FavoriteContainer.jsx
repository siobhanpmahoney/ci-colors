import React, {useState, useEffect, useContext} from 'react'
import { withRouter } from 'react-router';
import ls from 'local-storage';
// import {fetchFeed} from '../service'
import {FavoriteContext} from '../context/FavoriteProvider'
import PostList from './PostList'
import NoFavoritesMessage from './NoFavoritesMessage'
import LoadingMessage from './LoadingMessage'



const FavoriteContainer = (props) => {


  const {favoritePosts, setFavoritePosts, updateFavoritePosts} = useContext(FavoriteContext);
  const [location, setLocation] = useState(props.location.pathname)
  const [posts, setPosts] = useState(favoritePosts)

  // const [posts, setPosts] = useState(favoritePosts)

  useEffect(() => {
    generatePostList()
    renderPostList()
  }, [favoritePosts, location])

  const generatePostList = () => {
     setPosts(favoritePosts)
  }

  const renderPostList = () => {
    return <PostList posts={favoritePosts} />
  }

  return (
    <div className='post-container'>

      {posts.length > 0 ? renderPostList() : <NoFavoritesMessage /> }

  </div>
  )
}

export default withRouter(FavoriteContainer)

import React, {useState, useEffect, useContext} from 'react'
import { withRouter } from 'react-router';
import ls from 'local-storage';
// import {fetchFeed} from '../service'
import {FavoriteContext} from '../context/FavoriteProvider'
import PostList from './PostList'
import NoFavoritesMessage from './NoFavoritesMessage'
import LoadingMessage from './LoadingMessage'



const FavoriteContainer = (props) => {


  const {favoritePosts, setFavoritePosts} = useContext(FavoriteContext);
  const [location, setLocation] = useState(props.location.pathname)
  const [posts, setPosts] = useState(favoritePosts)

  // const [posts, setPosts] = useState(favoritePosts)

  useEffect(() => {
    setPosts(favoritePosts)
  }, [location, favoritePosts, posts])

  const generatePostList = () => {
    return ls.get("favorites")
  }

  return (
    <div className='post-container'>

      {posts.length > 0 ? <PostList posts={posts} /> : <NoFavoritesMessage /> }

  </div>
  )
}

export default withRouter(FavoriteContainer)

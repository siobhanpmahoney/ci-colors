import React, {useState, useEffect, useContext} from 'react'
import { withRouter } from 'react-router';
import ls from 'local-storage';
// import {fetchFeed} from '../service'
import {FavoriteContext} from '../context/FavoriteProvider'
import PostItem from './PostItem'
import NoFavoritesMessage from './NoFavoritesMessage'
import LoadingMessage from './LoadingMessage'



const PostList = (props) => {

  const {favoritePosts, setFavoritePosts} = useContext(FavoriteContext);
  const [posts, setPosts] = useState(props.posts)
  const [location, setLocation] = useState(props.location.pathname)



  useEffect(() => {
    mapPostComponents()
  }, [favoritePosts, posts, location])

  const mapPostComponents = () => {
    return !!props.posts && props.posts.map((post) => {
      return <PostItem post={post} key={post.id} />
    })
  }






  return (
    <div className='post-list'>
      {mapPostComponents()}
    </div>
  )

}

export default withRouter(PostList)

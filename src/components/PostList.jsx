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


  useEffect(() => {
    console.log(posts)
  }, [favoritePosts, posts])




  return (
    <div className='post-list'>

      {posts && posts.map((post) => {
        return <PostItem post={post} key={post.id} />
      })}

    </div>
  )

}

export default withRouter(PostList)

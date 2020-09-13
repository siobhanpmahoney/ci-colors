import React, {useState, useEffect, useContext} from 'react'
import { withRouter } from 'react-router';
import ls from 'local-storage';
// import {fetchFeed} from '../service'
import {FavoriteContext} from '../context/FavoriteProvider'
import PostItem from './PostItem'
import NoFavoritesMessage from './NoFavoritesMessage'
import LoadingMessage from './LoadingMessage'



const FormerPostList = (props) => {

  const {favoritePosts, setFavoritePosts} = useContext(FavoriteContext);
  const [location, setLocation] = useState(props.location.pathname)

  const [posts, setPosts] = useState(props.location.pathname == '/feed' ? [] : favoritePosts)






  useEffect(() => {
    generatePostList()
  }, [location, favoritePosts])

  const generatePostList = () => {
    props.location.pathname == "/feed" ? fetchFeed() : ls.get("favorites")
  }

  const fetchFeed = () => {
     new Promise((resolve, reject) => {
      fetch("https://www.reddit.com/r/architecture/.json")
        .then((response) => response.json())
        .then((json) =>

          resolve(
              setPosts(json.data.children.map((post) => {
              return {
                post_hint: post.data.post_hint,
                url: post.data.url,
                title: post.data.title,
                author: post.data.author,
                ups: post.data.ups,
                created: post.data.created,
                id: post.data.id,
                secure_media: post.data.secure_media,
                secure_media_embed: post.data.secure_media_embed,
                is_video: post.data.is_video
              };
            }))
          )
        );
    });
  };

  const fillerMessage = () => {
    return location == "/feed" ? (
       <LoadingMessage />
    ) : (
       <NoFavoritesMessage />
    )
  }





  return (
    <div className='post-container'>
    <div className='post-list'>
      {posts.length < 1 ? fillerMessage() : (
        <div>
          {posts.map((post) => {
            return <PostItem post={post} key={post.id} />
          })}
        </div>
      )

      }

    </div>
  </div>
  )
}

export default withRouter(FormerPostList)

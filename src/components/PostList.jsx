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

  const [posts, setPosts] = useState(props.location.pathname == 'feed' ? fetchFeed() : favoritePosts)

  const [location, setLocation] = useState(props.location.pathname)

  useEffect(() => {
    generatePostList()
  }, [location, favoritePosts])

  const generatePostList = () => {
    location == "/feed" ? fetchFeed() : ls.get("favorites")
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
    <div className="feed-container-wrapper">
      {posts.length < 1 ? fillerMessage() : (
        <div>
          {posts.map((post) => {
            return <PostItem post={post} key={post.id} />
          })}
        </div>
      )

      }

    </div>
  )
}

export default withRouter(PostList)

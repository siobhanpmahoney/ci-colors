import React, {useState, useEffect, useContext} from 'react'
import { withRouter } from 'react-router';
import ls from 'local-storage';
// import {fetchFeed} from '../service'
import {FavoriteContext} from '../context/FavoriteProvider'


const PostList = (props) => {

  const {favoritePosts, setFavoritePosts} = useContext(FavoriteContext);

  const [posts, setPosts] = useState(props.location.pathname == 'feed' ? fetchFeed() : favoritePosts)

  const [location, setLocation] = useState(props.location.pathname)

  useEffect(() => {
    generatePostList()
  }, [location, posts])

  const generatePostList = () => {
    location == "/feed" ? fetchFeed() : ls.get("favorites")
  }

  const fetchFeed = () => {
     new Promise((resolve, reject) => {
      fetch("https://www.reddit.com/r/analog/.json")
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




  return (
    <div className="feed-container-wrapper">
      {location == "/feed" ? (
        posts.length > 0 ? (
          <div>{posts.map((post) => {
              return <div>{post.id}</div>
            })}</div>
        ) : (
          <div>loading...</div>
        )

      ) : (
        <div> <h1> FAVES </h1></div>
      )}
    </div>
  )
}

export default withRouter(PostList)

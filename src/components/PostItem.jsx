import React, {useState, useEffect, useContext} from 'react'
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {FavoriteContext} from '../context/FavoriteProvider'
import {generateTimestamp} from "../service"


const PostItem = (props) => {
  const {favoritePosts, setFavoritePosts, updateFavorites} = useContext(FavoriteContext);
  const [location, setLocation] = useState(props.location.pathname)

  const [favoriteStatus, setFavoriteStatus] = useState(!!favoritePosts.find((p) => p.id == props.post.id) || false)


  useEffect(() => {
    updateFavoriteState()
    // dynamicIcon()
  }, [favoritePosts])

  const checkFavStatus = () => {
    return !!favoritePosts.find((p) => p.id == props.post.id)
  }

  const updateFavoriteState = () => {
    setFavoriteStatus(!!favoritePosts.find((p) => p.id == props.post.id))
  }

  // helper method for rendering the timestamp posted as the difference between current time and time of post
  const getTimeStamp = () => {
    return generateTimestamp(props.post.created)
  }

  // handles rendering media for video posts
  const videoEmbed = () => {
    return {
      __html: decode(props.post.secure_media_embed.content)
    }
  }

  // helper method to unpack iframe HTML element to render in jsx
  const decode = (input) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = input;
    return txt.value;
  };

  const dynamicIcon = () => {
    let iconClassName = ""

    if (!!favoriteStatus) {
      if (props.location.pathname == "/feed") {
        iconClassName = "fas fa-heart favorited fav-icon";
      } else {
        iconClassName = "far fa-trash-alt delete-favorite fav-icon";
      }
    } else {
      iconClassName = "fas fa-heart nonfavorite fav-icon";
    }

    return <i className={iconClassName} id={props.post.id} onClick={() => updateFavorites(props.post.id, props.post)} />
    // );
  };

  // helper function for rendering correct icon
  const selectIcon = () => {
    if (!favoriteStatus) {
      return "fas fa-heart nonfavorite fav-icon";
    } else {
      if (props.location.pathname == "/feed") {
        return "fas fa-heart favorited fav-icon";
      } else {
        return "far fa-trash-alt delete-favorite fav-icon";
      }
    }
  };

  return (
    <div className="post-item-wrapper">
      <div className="post-item-content">
        <div className="post-item-image">
          {dynamicIcon()}
          {props.post.post_hint == "image" ? (
            <img className="img-element" src={props.post.url} alt="Img" />
          ) : (
            <div
              className="img-element"
              dangerouslySetInnerHTML={videoEmbed()}
            />
          )}
        </div>

        <div className="post-item-text">
          <div className="post-item-title">
            <a href={props.post.url} target="_blank">
              {props.post.title}
            </a>
          </div>

          <div className="post-item-metadata">
            <span className="post-item-author">
              <i className="fas fa-user metadata-icon" />
              <a className="post-item-metadata-detail">/u/{props.post.author}</a>
            </span>

            <span className="post-item-time">
              <i className="far fa-clock metadata-icon" />
              <span className="post-item-metadata-detail">
                {getTimeStamp()}
              </span>
            </span>

            <span className="post-item-likes">
              <i className="fas fa-bolt metadata-icon" />
              <span className="post-item-metadata-detail">{props.post.ups}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(PostItem)

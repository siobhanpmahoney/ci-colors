import React, {useState, useEffect, useContext} from 'react'
import {FavoriteContext} from '../context/FavoriteProvider'


const PostItem = (props) => {
  const {favoritePosts, setFavoritePosts} = useContext(FavoriteContext);

  const {favoriteState, setFavoriteState} = useState(props.post.isFavorite)

  useEffect(() => {
    checkFavoriteState()
  }, [favoriteState])

  const checkFavoriteState = () => {
    console.log(favoritePosts && favoritePosts.length > 0 && !!favoritePosts.find((p) => p.id == props.post.id))
    return favoritePosts && favoritePosts.length > 0 && !!favoritePosts.find((p) => p.id == props.post.id)
  }

  return (
    <div>
      {props.post.id} - {!!favoriteState ? "true" : "false"}
    </div>
  )
}

export default PostItem

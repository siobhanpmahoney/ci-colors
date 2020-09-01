import React, {useState, useEffect, useContext} from 'react'
import ls from 'local-storage';

export const FavoriteContext = React.createContext({})

const FavoriteProvider = ({children}) => {

  const [favoritePosts, setFavoritePosts] = React.useState(!ls.get("favorites") ? ls.get("favorites") : {})

  useEffect(() => {
    ls.set("favorites", favoritePosts)
  }, [favoritePosts])

  const updateFavorites = (postId, post) => {
    if (!!favoritePosts[postId]) {
      let copy = Object.assign({}, favoritePosts)
      delete copy[postId]
      setFavoritePosts(copy)
    } else {
      setFavoritePosts(Object.assign({}, favoritePosts, {[postId]: post}))
    }
  }

  const favoriteState = {
    favoritePosts,
    setFavoritePosts
  }

  return (
    <FavoriteContext.Provider value={{favoritePosts, updateFavorites}}>
      {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteProvider

import React, {useState, useEffect, useContext} from 'react'
import ls from 'local-storage';

export const FavoriteContext = React.createContext({})

const FavoriteProvider = ({children}) => {

  const [favoritePosts, setFavoritePosts] = React.useState(!ls.get("favorites") ? [] : ls.get("favorites"))

  useEffect(() => {
    ls.set("favorites", favoritePosts)
  }, [favoritePosts])

  const updateFavorites = (postId, post) => {
    // check if item is a favorite
    let index = favoritePosts.findIndex((p) => p.id == postId)
    if (index != -1) {
      // if already a fave, remove from faves
       setFavoritePosts([...favoritePosts.slice(0, index), ...favoritePosts.slice(index+1)])
    } else {
      // if not currently a fave, add to fave
       setFavoritePosts([...favoritePosts, post])
    }

  }

  const updateLocalStorage = () => {
     ls.set("favorites", favoritePosts)
  }



  const favoriteState = {
    favoritePosts,
    setFavoritePosts
  }

  return (
    <FavoriteContext.Provider value={{favoritePosts, setFavoritePosts, updateFavorites}}>
      {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteProvider

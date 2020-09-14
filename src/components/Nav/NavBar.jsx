import React, {useState, useContext, useEffect} from 'react';
import {FavoriteContext} from '../../context/FavoriteProvider'
import NavList from './NavList';

const NavBar = (props) => {
  const {favoritePosts, setFavoritePosts, updateFavoritePosts} = useContext(FavoriteContext);

  const [count, setCount] = useState(favoritePosts.length)

  useEffect(() => {
    setCount(favoritePosts.length)
  }, [favoritePosts])

  return (
    <nav className='nav'>
      <NavList
        list={[
          { to: '/feed', icon: 'fab fa-reddit-alien', text: `/r/architecture` },
          { to: '/favorites', icon: 'fas fa-heart', text: `Favorites (${count})` },
        ]}
        />
    </nav>
  );



}

export default NavBar

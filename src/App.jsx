import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import { Switch, Route, Redirect } from "react-router";

import {FavoriteContext} from './context/FavoriteProvider'
import { fetchAllColors } from './service'
import Home from "./components/Home"
import PostList from "./components/PostList"

function App() {
  const {updateFavorites} = useContext(FavoriteContext);

  const [colors, setColors] = useState([])

  useEffect(() => {
    fetch("https://reqres.in/api/unknown")
    .then(res => res.json())
    .then(response => setColors(response.data))

  }, [])


  return (

    <div className = 'App'>
      <Switch>
        <Route exact path="/" render={(routerProps) => {
            return <Home history={routerProps.history} />;
          }} />

        <Route exact path="/feed" render={(routerProps) => {
            return <PostList history={routerProps.history} />
        }} />

        <Route exact path="/favorites" render={(routerProps) => {
            return <PostList history={routerProps.history} />;
        }} />

        <Redirect to="/feed" />
      </Switch>



      <div id="colorList">

        {colors.map((color) => {
          return (
            <div>
              <h1>DEPLOY WORKED</h1>
              <div className="colorOption" id={color.id} key={color.id} >
                <span className="colorLabel"> {color.name}</span>
                <span className="colorBlob" style={{backgroundColor:`${color.color}`}} onClick={() => updateFavorites(color.color.slice(1), color)}> </span>
              </div>
            </div>
          )
        })}
      </div>



    </div>
  );
}

export default App;

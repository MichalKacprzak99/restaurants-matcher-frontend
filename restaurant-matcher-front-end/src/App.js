import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import {HomePage, PeoplePage, CuisinePage, RestaurantPage, FriendshipPage} from './pages';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



const App = () => {
  const appBarLinks = [
    {to: "/", name: "Home", element: <HomePage/>},
    {to: "/restaurants", name: "Restaurants", element: <RestaurantPage/>},
    {to: "/people", name: "People", element: <PeoplePage/>},
    {to: "/friendships", name: "Friendships", element: <FriendshipPage/>},
    {to: "/cuisines", name: "Cuisines", element: <CuisinePage/>},
  ]

  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            {appBarLinks.map((link, index) => {
              const {to, name} = link
              return (
                <Typography key={index} variant="h6" component="div" sx={{flexGrow: 1}}>
                  <Link to={to} style={{textDecoration: 'none'}}>{name}</Link>
                </Typography>
              )
            })}
          </Toolbar>
        </AppBar>
      </Box>


      <Routes>
        {appBarLinks.map((link, index) => {
          const {to, element} = link
          return (
            <Route key={index} exact path={to} element={element}/>
          )
        })}
      </Routes>
    </>
  );
}

export default App;

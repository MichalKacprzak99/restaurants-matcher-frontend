import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import {HomePage, PeoplePage, CuisinePage, RestaurantPage} from './pages';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



const App = () => {
  // TODO change elements
  const appBarLinks = [
    {to: "restaurants", name: "Restaurants", element: <RestaurantPage/>},
    {to: "people", name: "People", element: <PeoplePage/>},
    {to: "friends", name: "Friends", element: <HomePage/>},
    {to: "cuisines", name: "Cuisines", element: <CuisinePage/>},
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
        <Route exact path='/' element={<HomePage/>}/>
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

import './App.css';
import Appbar from './components/Appbar';
import Data from './components/Data';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Result from './components/Result.js';
import Details from './components/Details.js';
import View from './components/View.js';
import Edit from './components/Edit.js';
import Login from './components/Login';
import { AuthProvider } from './context/AuthProvider';
import AdvancedSearch from './components/Advance';
import AdminPage from './admin/admin';
import Signup from './admin/Signup';

class App extends Component {
  render() {
    const myStyle = {
      backgroundImage:
        "url('https://getwallpapers.com/wallpaper/full/2/0/f/119773.jpg')",
      backgroundSize: 'cover',
      minHeight: "100vh",
      backgroundRepeat: 'repeat',
    }
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/home' element={
              <div className="App" style={myStyle}>
                  <Appbar />
                  <Data style={{ margin: '3em' }} />
              </div>
            } />
            <Route exact path='/' element={
              <Login />} />
            <Route exact path='/result' element={
              <Result />
            } />
            <Route exact path='/details/:id' element={<Details />} />
            <Route exact path='/view/:id' element={<View />} />
            <Route exact path='update/:id' element={<Edit />} />
            <Route exact path='/adv' element={<AdvancedSearch />} />
            <Route exact path='/admin' element={<AdminPage />} />
            <Route exact path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
export default App;

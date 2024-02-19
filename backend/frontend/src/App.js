import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from './components/Notfound';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/HouseScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import SearchScreen from './screens/SearchScreen';
import NewListing from './components/NewListing';
import VerifyScreen from './screens/VerifyScreen';
import ForumScreen from './screens/ForumScreen';
import PostScreen from './screens/PostScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import HomePage from './screens/HomePage';
import PersonalisedListingsScreen from './screens/PersonalisedListingsScreen';
import { logout } from './reducers/UserReducers';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.loggedIn;


  const checkSession = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/accounts/check-session/');
      console.log(response.data);
    } catch (error) {
      
        dispatch(logout());
    
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log(isLoggedIn)
      const interval = setInterval(() => {
        checkSession();
      }, 60000); 

      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/all' element={<HomeScreen />} />
        <Route path='/test' element={<ForumScreen />} />
        <Route path='/prefs' element={<ProtectedRoute><PersonalisedListingsScreen /></ProtectedRoute>} />
        <Route path='/search' element={<ProtectedRoute><SearchScreen /></ProtectedRoute>} />
        <Route path='/editprofile' element={<ProtectedRoute><EditProfileScreen /></ProtectedRoute>} />
        <Route path='/posts' element={<ProtectedRoute><ForumScreen /></ProtectedRoute>} />
        <Route path='/post/:postId' element={<ProtectedRoute><PostScreen /></ProtectedRoute>} />
        <Route path='/newlisting' element={<ProtectedRoute><NewListing /></ProtectedRoute>} />
        <Route path='/listings/:slug' element={<ProtectedRoute><ProductScreen /></ProtectedRoute>} />
        <Route path='/verify' element={<ProtectedRoute><VerifyScreen /></ProtectedRoute>} />
        <Route path='/register' element={<PublicRoute><RegisterScreen /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><LoginScreen /></PublicRoute>} />
        <Route path='/profile' element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

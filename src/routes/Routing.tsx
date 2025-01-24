import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home/Home';
import { SearchProvider } from '@/context/SearchContext';

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={
        <SearchProvider><Home />
        </SearchProvider>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
};

export default Routing;

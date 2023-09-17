import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import MapContainer from './utils/Map';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <GlobalStyle />
      {/* <MapContainer/> */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/singUp" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

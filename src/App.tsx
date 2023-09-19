import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Main from './pages/Main';
import MapContainer from './utils/Map';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Plan from './pages/Plan';
import DatePick from './components/DatePick';

function App() {
  return (
    <>
      <GlobalStyle />

      {/* <MapContainer/> */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/singUp" element={<SignUp />} />
          <Route path="/plan" element={<Plan />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

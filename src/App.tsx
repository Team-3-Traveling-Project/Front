import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Main from './pages/Main';
import MapContainer from './utils/Map';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Slider from './components/Slider';


function App() {
  const texts = [
    '서울',
    '부산',
    '광주',
    '경상북도',
    '포항',
    '세종',
    '강원도',
    '충청남도',
  ];

  return (
    <>
      <GlobalStyle />
      <Slider texts={texts} onClick={()=>{}}></Slider>

      {/* <MapContainer/> */}
      {/* <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/singUp" element={<SignUp />} />
        </Routes>
      </Router> */}

    </>
  );
}

export default App;

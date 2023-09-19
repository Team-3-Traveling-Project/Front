import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Main from './pages/Main';
import MapContainer from './utils/Map';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import BookMark from './pages/BookMark';
import Plan from './pages/Plan';
import DatePick from './components/DatePick';
import PlanCheck from './pages/PlanCheck';
import MyPage from './pages/MyPage';

function App() {
  return (
    <>
      <GlobalStyle />

      {/* <MapContainer/> */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/singUp" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
          <Route path="/bookMark" element={<BookMark />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/planCheck" element={<PlanCheck />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

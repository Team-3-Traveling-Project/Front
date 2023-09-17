import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import PlaceBtn from './components/PlaceBtn';
import Select from './components/Select';

function App() {
  return (
    <>
      <GlobalStyle />
      <PlaceBtn title='명소' />
      <br/>
      <Select selectList='전라남도'/>
    </>
  );
}

export default App;

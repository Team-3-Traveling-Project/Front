import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header(profile: any) {
  const navigate = useNavigate();
  const defaultImg = 'https://ifh.cc/g/GkZmxw.png';
  const [img, setImg] = useState<string>(defaultImg);

  useEffect(() => {
    if (profile === null) {
      setImg(defaultImg);
    } else {
      setImg(profile);
    }
  }, [profile]);

  return (
    <>
      <Layout>
        <Logo onClick={() => navigate('/')} src="https://ifh.cc/g/Z2oWsN.png"></Logo>
        <HeaderList>
          <List onClick={() => navigate('/bookmark')}>북마크</List>
          <List onClick={() => navigate('/mylist')}>여행일정</List>
          <List onClick={() => navigate('/mypage')}>마이페이지</List>
          <List
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
          >
            로그아웃
          </List>
          <SmallProfile src={img} />
        </HeaderList>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  /* border: 1px solid red; */
`;

const Logo = styled.img`
  height: 35px;
  cursor: pointer;
  /* border: 1px solid red; */
`;

const HeaderList = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  gap: 24px;
  align-items: center;
`;

const SmallProfile = styled.img`
  border-radius: 50%;
  width: 36px;
  height: 36px;
`;

const List = styled.button`
  cursor: pointer;
  transition: color 0.1s ease;
  &:hover {
    color: #63bec6;
    /* text-decoration: underline;
    text-underline-offset : 3px; */
  }
`;

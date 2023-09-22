import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <Logo src="https://ifh.cc/g/Oy9wtr.png"></Logo>
        <HeaderList>
          <List onClick={() => navigate('/bookmark')}>북마크</List>
          <List onClick={() => navigate('/mypage')}>마이페이지</List>
          <List
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
          >
            로그아웃
          </List>
          <SmallProfile src="https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg" />
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
  /* border: 1px solid red; */
`;

const HeaderList = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  gap: 20px;
  align-items: center;
`;

const SmallProfile = styled.img`
  border-radius: 50%;
  width: 45px;
  height: 45px;
`;

const List = styled.button``;

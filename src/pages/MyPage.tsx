import styled from 'styled-components';
import React, { useState } from 'react';

export default function Mypage() {
  return (
    <>
      <Layout>
        <Header>
          <Logo></Logo>
          <HeaderList>
            <List>북마크</List>
            <List>마이페이지</List>
            <List>로그아웃</List>
            <SmallProfile src="https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg" />
          </HeaderList>
        </Header>

        <Background>
          <Img src="https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg"></Img>
        </Background>
        <TextArea>
          <NickName>닉네임이 들어가는 자리</NickName>
          <Profile>프로필 사진 변경</Profile>
        </TextArea>

        <ChangeArea>
          <InputLayout>
            <Label>닉네임 변경</Label>
            <br />
            <Input1 type="text" />
            <div className="validation-id">{}</div>

            {/* {idInput.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>} */}
          </InputLayout>

          <InputLayout>
            <Label>아이디 변경</Label>
            <br />
            <CheckLayout>
              <Input2 type="text" />
              <div className="validation-id"></div>

              {/* {idInput.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>} */}
              <CheckBtn>중복확인</CheckBtn>
            </CheckLayout>
          </InputLayout>

          <Button>회원탈퇴</Button>

          <ButtonLayout>
            <Btn>돌아가기</Btn>
            <Btn>저장</Btn>
          </ButtonLayout>
        </ChangeArea>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  /* border: 1px solid red; */
`;

const Logo = styled.div`
  width: 80px;
  height: 36px;
  border: 1px solid red;
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

const Background = styled.div`
  height: 168px;
  width: 100%;
  position: relative;
  background-color: #d6eff1;
`;

const Img = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  position: relative;
  top: 67px;
  left: 43%;
`;

const TextArea = styled.div`
  width: 212px;
  height: 58px;
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  flex-direction: column;
`;

const NickName = styled.div`
  font-size: 20px;
  text-align: center;
`;

const Profile = styled.button`
  font-size: 16px;
  text-align: center;
  color: #136bf0;
`;

const ChangeArea = styled.div`
  width: 480px;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-top: 16px;
  padding: 30px;
`;

const InputLayout = styled.div`
  margin-bottom: 24px;
`;

const Input1 = styled.input`
  width: 400px;
  height: 44px;
  background-color: #ededed;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 10px;
  padding-left: 10px;
`;

const Input2 = styled.input`
  width: 280px;
  height: 44px;
  background-color: #ededed;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 10px;
  padding-left: 10px;
`;

const Label = styled.label`
  font-size: 20px;
`;

const Button = styled.button`
  width: 400px;
  height: 44px;
  background-color: #eeeeee;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 10px;
  padding-left: 10px;
  text-align: center;
  color: #666666;
`;

const ButtonLayout = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const Btn = styled.button`
  width: 198px;
  height: 40px;
  background-color: #ededed;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: center;
  color: #666666;
  font-weight: bold;
`;

const CheckBtn = styled.button`
  width: 100px;
  height: 40px;
  background-color: #ededed;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: center;
  color: #000000;
  font-weight: bold;
  line-height: 40px;
`;

const CheckLayout = styled.div`
  display: flex;
  gap: 8px;
`;

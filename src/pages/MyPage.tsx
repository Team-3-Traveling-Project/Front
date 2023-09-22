import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { baseInstance } from '../apis/config';
import { type } from 'os';

export default function Mypage() {
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [changeNickName, setChangeNickName] = useState('');
  const [changeEmail, setChangeEmail] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const nickNameHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeNickName(e.target.value);
  };
  const emailHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeEmail(e.target.value);
  };

  const newProfile = {
    nickname: changeNickName,
    email: changeEmail,
  };

  const userDelete = async () => {
    try {
      const response = await baseInstance.delete('/user/userdel', {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.clear();
        alert(response.data.msg);
        navigate('/singUp');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userChange = async (data: any) => {
    try {
      const response = await baseInstance.put('user/updateprofile', data, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      console.log(response);
      if (response.data.statusCode === 200) {
        setChangeNickName('');
        setChangeEmail('');
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await baseInstance.get('/user/updateprofile', {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      // console.log(response);
      setNickName(response.data.nickname);
      setEmail(response.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Layout>
        <Header></Header>

        <Background>
          <Img src="https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg"></Img>
        </Background>
        <TextArea>
          <NickName>{nickName}</NickName>
          <Profile>
            프로필 사진 변경
            <ProfileInput type="file" />
          </Profile>
        </TextArea>

        <ChangeArea>
          <InputLayout>
            <Label>
              닉네임 변경
              <br />
              <span>기존 닉네임 : {nickName}</span>
            </Label>
            <br />

            <Input
              type="text"
              value={changeNickName}
              onChange={nickNameHandleChange}
              placeholder="새로운 닉네임을 입력해주세요"
            />
          </InputLayout>

          <InputLayout>
            <Label>
              이메일 변경
              <br />
              <span>기존 이메일 : {email}</span>
            </Label>
            <br />
            <CheckLayout>
              <Input
                type="text"
                value={changeEmail}
                onChange={emailHandleChange}
                placeholder="새로운 이메일을 입력해주세요"
              />
            </CheckLayout>
          </InputLayout>

          <Button onClick={() => userDelete()}>회원탈퇴</Button>

          <ButtonLayout>
            <Btn onClick={() => navigate('/')}>돌아가기</Btn>
            <Btn onClick={() => userChange(newProfile)}>저장</Btn>
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

const Profile = styled.label`
  font-size: 16px;
  text-align: center;
  color: #136bf0;
  cursor: pointer;
`;

const ProfileInput = styled.input`
  display: none;
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

const Input = styled.input`
  width: 400px;
  height: 44px;
  background-color: #ededed;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  margin-top: 8px;
  margin-bottom: 10px;
  padding-left: 10px;
`;

// const Input2 = styled.input`
//   width: 280px;
//   height: 44px;
//   background-color: #ededed;
//   border-radius: 10px;
//   border: none;
//   font-size: 20px;
//   margin-top: 5px;
//   margin-bottom: 10px;
//   padding-left: 10px;
// `;

const Label = styled.label`
  font-size: 20px;
  span {
    font-size: 16px;
    color: #c0c0c0;
  }
`;

const Button = styled.button`
  width: 390px;
  height: 44px;
  background-color: #eeeeee;
  border-radius: 10px;
  border: none;
  font-size: 18px;
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
  width: 195px;
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

import styled from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';
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

  const navigate = useNavigate();

  //이미지 업로드 input의 onChange
  // const saveImgFile = () => {
  //   const file = imgRef.current.files[0];
  //   console.log('file', file);

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     saveImg(reader.result as any);
  //   };
  // };

  //----이미지 파일 업로드
  const [imgFile, setImgFile] = useState<string | null>('https://ifh.cc/g/LLB0LN.png');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());

  const saveImgFile = () => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImgFile(reader.result as string);

          // 새로운 FormData 생성
          const newFormData = new FormData();
          newFormData.append('image', file);

          // FormData를 상태로 설정
          setFormData(newFormData);
        };
      }
    }
  };

  const imgHandler = async () => {
    try {
      const response = await baseInstance.post(`/user/updateImg`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `${localStorage.getItem('Authorization')}` },
      });
      console.log(response);
      if (response.data.status === 200) {
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log('내가 유저여', response);
      setNickName(response.data.nickname);
      setEmail(response.data.email);
      setImgFile(response.data.profile_img_url);
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
          <Img src={imgFile || 'https://ifh.cc/g/LLB0LN.png'} alt="profile"></Img>
        </Background>

        <TextArea>
          <NickName>{nickName}</NickName>

          <ProfileLayout>
            <Profile htmlFor="profileImg">
              프로필 사진 변경
              <ProfileInput
                name="profileImage"
                type="file"
                id="profileImg"
                accept="image/*"
                onChange={saveImgFile}
                ref={fileInputRef}
              />
            </Profile>
            <ProfileClick onClick={imgHandler}>저장</ProfileClick>
          </ProfileLayout>
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
  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  cursor: pointer;
`;

const ProfileClick = styled.button`
  font-size: 16px;
  text-align: center;
  border: 1px solid #136bf0;
  color: #136bf0;
  border-radius: 5px;
  width: 35px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 12px;
  &:hover {
    background-color: #136bf0;
    color: white;
  }
`;

const ProfileLayout = styled.div``;

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

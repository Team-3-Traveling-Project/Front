import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { baseInstance } from '../apis/config';

export default function Login() {
  // const [idInput, idHandleChange] = useInput('');
  // const [pwInput, pwHandleChange] = useInput('');
  // const [isId, setIsId] = useState(false);

  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const navigate = useNavigate();



  const login = async () => {
    const info = {
      userId: idInput,
      password: pwInput,
    };

    try {
      const response = await baseInstance.post('/user/login', info);
      if (response.data.statusCode === 200) {
        localStorage.setItem('Authorization', response.headers.authorization);
        // checkUser();
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Layout1>
        <WhiteBox>
          <H2>로그인</H2>

          <InputLayout>
            <Label>아이디</Label>
            <br />
            <Input
              type="text"
              placeholder="아이디를 입력해주세요!"
              value={idInput}
              onChange={(e) => {
                setIdInput(e.target.value);
              }}
            />
            {/* <div className="validation-id">{}</div>

            {idInput.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>} */}
          </InputLayout>

          <InputLayout>
            <Label>비밀번호</Label>
            <br />
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              value={pwInput}
              onChange={(e) => {
                setPwInput(e.target.value);
              }}
            />
          </InputLayout>

          <SignUpButton
            onClick={() => {
              navigate('/singUp');
            }}
          >
            회원가입하러 가기
          </SignUpButton>

          <form onSubmit={(e) => e.preventDefault()}>
            <Button onClick={login}>확인</Button>
          </form>
        </WhiteBox>
        <PictureLayout>
          <Title>Plan Planing</Title>
          <Title2>오늘 어디갈지 모르겠다면?!</Title2>
          <img
            style={{ marginLeft: '90px', width: '30rem', marginTop: '3rem' }}
            src="https://ifh.cc/g/gq6X3w.png"
            alt=""
          />
        </PictureLayout>
      </Layout1>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  background-color: #d6eff1;
`;

const Layout1 = styled.div`
  display: flex;
  height: 100%;
  margin-top: 100px;
`;

const WhiteBox = styled.div`
  width: 530px;
  height: 680px;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 14px;
  margin-top: 25px;
  overflow-y: auto;
`;

const H2 = styled.h2`
  font-style: bold;
  font-size: 24px;
  margin-bottom: 96px;
`;

const InputLayout = styled.div`
  margin-bottom: 32px;
`;

const Input = styled.input`
  width: 338px;
  height: 50px;
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
  width: 240px;
  height: 50px;
  text-align: center;
  border-radius: 47px;
  font-size: 20px;
  font-style: bold;
  color: white;
  background-color: #343434;
  border: none;
  cursor: pointer;
  outline: none;
  margin: 30px 0;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 5px 6px 4px rgba(0, 0, 0, 0.25);
  }
`;

const PictureLayout = styled.div`
  width: 632px;
  height: 864px;
  margin-top: 50px;
`;

const Title = styled.p`
  font-family: 'Cafe24Ohsquare';
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  padding: 20px;
  margin-top: 70px;
`;

const Title2 = styled.p`
  font-family: 'Cafe24Ohsquare';
  font-size: 28px;
  font-weight: 400;
  text-align: center;
  margin-top: 20px;
`;

const SignUpButton = styled.button`
  color: #ff6767;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-style: bold;
  margin-top: 20px;
  text-decoration-line: underline;
`;

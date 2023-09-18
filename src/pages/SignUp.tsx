import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';

export default function SignUp() {
  const navigate = useNavigate();
  const [idInput, idHandleChange] = useInput('');
  const [pwInput, pwHandleChange] = useInput('');
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [idMessage, setIdMessage] = useState('영어/숫자 포함 6자리 이상');
  const [pwMessage, setPwMessage] = useState('영어 대소문자/숫자/특수기호 포함 6자 이상');

  // const signUp = async (info: { id: string; password: string }) => {
  //   try {
  //     const response = await axios.post('http://3.38.191.164/register', info);

  //     if (response.status === 201) navigate('/');
  //   } catch (error) {
  //     alert(error.response.data.message);
  //   }
  // };

  // const validateId = (id: string) => {
  //   const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  //   setIsId(pattern.test(id));
  // };

  // const validatePw = (pw: string) => {
  //   const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  //   setIsPw(pattern.test(pw));
  // };

  // const data = {
  //   id: idInput,
  //   password: pwInput,
  // };

  return (
    <>
      <Layout>
        <Layout1>
          <WhiteBox>
            <H2>회원가입</H2>

            <InputLayout>
              <Label>닉네임</Label>
              <br />
              <Input
                type="text"
                placeholder="닉네임을 입력해주세요"
                // onChange={(e) => {
                //   idHandleChange(e);
                //   validateId(e.target.value);
                // }}
                value={idInput}
              />
              {idInput.length >= 0 && (
                <Validation>
                  <ValidationMessage className={`message ${isId ? 'success' : 'error'}`}>
                    <span className="material-symbols-outlined">check_circle</span>
                    {idMessage}
                  </ValidationMessage>
                </Validation>
              )}
            </InputLayout>

            <InputLayout>
              <Label>아이디</Label>
              <br />
              <Input
                type="text"
                placeholder="아이디를 입력해주세요"
                // onChange={(e) => {
                //   idHandleChange(e);
                //   validateId(e.target.value);
                // }}
                value={idInput}
              />
              {idInput.length >= 0 && (
                <Validation>
                  <ValidationMessage className={`message ${isId ? 'success' : 'error'}`}>
                    <span className="material-symbols-outlined">check_circle</span>
                    {idMessage}
                  </ValidationMessage>
                </Validation>
              )}
            </InputLayout>

            <InputLayout>
              <Label>비밀번호</Label>
              <br />
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={pwInput}
                // onChange={(e) => {
                //   pwHandleChange(e);
                //   validatePw(e.target.value);
                // }}
              />
              {pwInput.length >= 0 && (
                <Validation>
                  <ValidationMessage className={`message ${isPw ? 'success' : 'error'}`}>
                    <span className="material-symbols-outlined">check_circle</span>
                    {pwMessage}
                  </ValidationMessage>
                </Validation>
              )}
            </InputLayout>

            <InputLayout>
              <Label>비밀번호 확인</Label>
              <br />
              <Input
                type="password"
                placeholder="비밀번호를 한번 더 입력해주세요"
                value={pwInput}
                // onChange={(e) => {
                //   pwHandleChange(e);
                //   validatePw(e.target.value);
                // }}
              />
              {pwInput.length >= 0 && (
                <Validation>
                  <ValidationMessage className={`message ${isPw ? 'success' : 'error'}`}>
                    <span className="material-symbols-outlined">check_circle</span>
                    {pwMessage}
                  </ValidationMessage>
                </Validation>
              )}
            </InputLayout>

            <SignUpButton
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인하러 가기
            </SignUpButton>
            <form
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   if (data.id === '' || data.password === '') alert('아이디와 비밀번호를 모두 입력해주세요');
            //   else signUp(data);
            // }}
            >
              <Button>확인</Button>
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
    </>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
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
  height: 900px;
  display: flex;
  background-color: white;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  border-radius: 14px;
  overflow-y: auto;
  margin-bottom: 70px;
`;

const H2 = styled.div`
  font-weight: 800;
  font-size: 24px;
  margin: 40px 0;
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

const Validation = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: 2px;
`;

const ValidationMessage = styled.span`
  &.success {
    color: #1e982c;
  }

  &.error {
    color: #ff6767;
  }
`;

const Image = styled.img`
  width: 100%;
`;

// CSS
// (여기에 CSS 코드 추가)

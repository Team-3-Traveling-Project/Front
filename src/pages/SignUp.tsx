import React, { useState } from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { baseInstance } from '../apis/config';

export default function SignUp() {
  const navigate = useNavigate();

  const [nickNameInput, nameHandleChange] = useInput('');
  const [emailInput, emailHandleChange] = useInput('');
  const [idInput, idHandleChange] = useInput('');
  const [pwInput, pwHandleChange] = useInput('');
  const [pwCheckInput, pwCheckHandleChange] = useInput('');

  const [isNickName, setIsNickName] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(false);

  const [idMessage, setIdMessage] = useState('영어/숫자 포함 6자리 이상');
  const [pwMessage, setPwMessage] = useState('영어/숫자/특수문자 포함 8자 이상');
  const [pwCheckMessage, setPwCheckMessage] = useState('비밀번호가 일치하지 않습니다.');

  type infoPros = {
    userId: string;
    password: string;
    nickname: string;
    email: string;
  };

  const signUp = async (info: infoPros) => {
    try {
      const response = await baseInstance.post('user/signup', info);
      console.log(response);
      if (response.status === 200) {
        alert(response.data.msg);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      alert('중복된 id입니다. 다시 입력해주세요.');
    }
  };

  // 유효성 검사
  const validateNickName = (id: string) => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    setIsNickName(pattern.test(id));
  };
  const validateId = (id: string) => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    setIsId(pattern.test(id));
  };
  const validatePw = (pw: string) => {
    // const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const pattern = /^.{8,}$/;
    setIsPw(pattern.test(pw));
  };
  const validatepwCheck = (pwCheck: string) => {
    if (pwCheck === pwInput) {
      setIsPwCheck(true);
      setPwCheckMessage('비밀번호가 일치합니다');
    } else {
      setIsPwCheck(false);
      setPwCheckMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  const data = {
    userId: idInput,
    password: pwInput,
    nickname: nickNameInput,
    email: emailInput,
  };
  // console.log("data : ",data);

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
                onChange={(e) => {
                  nameHandleChange(e);
                  validateNickName(e.target.value);
                }}
                value={nickNameInput}
              />
              {nickNameInput.length >= 0 && (
                <Validation>
                  <ValidationMessage className={`message ${isNickName ? 'success' : 'error'}`}>
                    <span className="material-symbols-outlined">check_circle</span>
                    {idMessage}
                  </ValidationMessage>
                </Validation>
              )}
            </InputLayout>

            <InputLayout>
              <Label>이메일</Label>
              <br />
              <Input
                type="text"
                placeholder="이메일을 입력해주세요"
                value={emailInput}
                onChange={(e) => {
                  emailHandleChange(e);
                }}
              />
            </InputLayout>

            <InputLayout>
              <Label>아이디</Label>
              <br />
              <Input
                type="text"
                placeholder="아이디를 입력해주세요"
                onChange={(e) => {
                  idHandleChange(e);
                  validateId(e.target.value);
                }}
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
                onChange={(e) => {
                  pwHandleChange(e);
                  validatePw(e.target.value);
                }}
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
                value={pwCheckInput}
                onChange={(e) => {
                  pwCheckHandleChange(e);
                  validatepwCheck(e.target.value);
                }}
              />
              {pwCheckInput.length >= 0 && (
                <Validation>
                  <ValidationMessage className={`message ${isPwCheck ? 'success' : 'error'}`}>
                    <span className="material-symbols-outlined">check_circle</span>
                    {pwCheckMessage}
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
              onSubmit={(e) => {
                e.preventDefault();
                if (data.userId === '' || data.password === '') alert('아이디와 비밀번호를 모두 입력해주세요');
                else signUp(data);
              }}
            >
              <Button>확인</Button>
            </form>
          </WhiteBox>
          <PictureLayout>
            <Title>Day Trip</Title>
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
  height: 1020px;
  display: flex;
  background-color: white;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  border-radius: 14px;
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
  margin: 20px 0 30px 0;
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
  display: flex;
  align-items: center;
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

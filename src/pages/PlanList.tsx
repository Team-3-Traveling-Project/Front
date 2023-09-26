import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { baseInstance } from '../apis/config';
import PlanBox from '../components/PlanBox';
import { useNavigate } from 'react-router-dom';

export default function PlanList() {
  const [nickName, setNickName] = useState('');
  const [plans, setPlans] = useState<any[]>([]);
  const [imgFile, setImgFile] = useState<string | undefined>('https://ifh.cc/g/LLB0LN.png');

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await baseInstance.get('/user/updateprofile', {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      setNickName(response.data.nickname);
      setImgFile(response.data.profile_img_url);
      
    } catch (error) {
      console.log(error);
      alert('로그인 후 이용해주세요');
      navigate('/login');
    }
  };

  const getPlans = async () => {
    try {
      const response = await baseInstance.get('/mytravel', {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      console.log('이미지 넘어가는 지 ㅇ확인',response)
      console.log(response.data);
      setPlans(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const goDetails = async (planId: number) => {
    navigate(`/plancheck/${planId}`);
  };

  const deletePlan = async (plan_id: number) => {
    try {
      const response = await baseInstance.delete(`schedule/${plan_id}`, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      console.log('삭제가 잘 됐나벼', response);
      if (response.data.statusCode === 200) {
        getPlans();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getPlans();
  }, []);

  return (
    <>
      <Layout>
        <Header></Header>

        <Background>
          <Img src={imgFile || 'https://ifh.cc/g/LLB0LN.png'} alt="profile"></Img>
        </Background>
        <NickName>{nickName}</NickName>

        <List>
          {plans.map((item, index) => (
            <PlanBox
              key={index}
              date={item.date}
              city={item.city}
              details={() => goDetails(item.id)}
              onDelete={() => deletePlan(item.id)}
            />
          ))}
        </List>
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
  height: 140px;
  width: 100%;
  position: relative;
  background-color: #d6eff1;
`;

const Img = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  position: relative;
  top: 67px;
  left: 46%;
`;

const NickName = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 65px;
`;

const List = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;
  max-width: 1236px;
`;

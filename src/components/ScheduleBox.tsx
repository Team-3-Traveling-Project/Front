import { useState } from 'react';
import styled from 'styled-components';

type ScheduleBoxProps = {
  imgUrl: string;
  num: string;
  name: string;
  category: string;
  location: string;
  onClick: () => void;
};

export default function ScheduleBox({ imgUrl, num, name, category, location, onClick }: ScheduleBoxProps) {
  return (
    <>
      <Box onClick={onClick}>
        <Num>1</Num>
        <TextBox>
          <span style={{ color: '#63BEC6', marginRight: '4px' }}>명소</span>
          <Title>경복궁</Title>
        </TextBox>
        <img
          style={{
            width: '55px',
            height: '55px',
            borderRadius: '6px',
            marginLeft: '90px',
          }}
          src="https://cdn.myro.co.kr/prod/image/city/Tokyo.jpg"
          alt="Travel"
        />
      </Box>
    </>
  );
}

const Box = styled.button`
  margin: 20px;
  width: 238px;
  height: 56px;
  display: flex;
`;
const Num = styled.div`
  width: 20px;
  height: 20px;
  background: #e54a4b;
  color: white;
  border-radius: 50%;
  line-height: 18px;
  text-align: center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

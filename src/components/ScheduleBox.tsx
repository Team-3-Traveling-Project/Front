import { useState } from 'react';
import styled from 'styled-components';

type ScheduleBoxProps = {
  imgUrl: string;
  num: any;
  name: string;
  category: string;
  location: string;
  onClick: () => void;
  x?: string;
  y?: string;
};

export default function ScheduleBox({ imgUrl, num, name, category, location, onClick, x, y }: ScheduleBoxProps) {
  return (
    <>
      <Box onClick={onClick}>
        <Num>{num}</Num>
        <TextBox>
          <span style={{ color: '#63BEC6', marginRight: '4px' }}>명소</span>
          <Title>{name}</Title>
        </TextBox>
        <img
          style={{
            width: '55px',
            height: '55px',
            borderRadius: '6px',
            marginLeft:'10px'
          }}
          src="https://cdn.myro.co.kr/prod/image/city/Tokyo.jpg"
          alt="Travel"
        />
      </Box>
    </>
  );
}

const Box = styled.button`
  width: 330px;
  height: 62px;
  padding: 4px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.158);
  transition: all 0.3s ease-out;
  &:hover {
    box-shadow: 3px 4px 9px rgba(0, 0, 0, 0.247); /* 마우스 호버 시 그림자 증가 */
  }
`;
const Num = styled.div`
  width: 20px;
  height: 20px;
  background: #e54a4b;
  color: white;
  border-radius: 50%;
  line-height: 18px;
  text-align: center;
  margin-right: 8px;
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

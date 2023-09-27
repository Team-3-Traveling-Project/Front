import { useEffect } from 'react';
import styled from 'styled-components';
// import React, { useState } from 'react';

type PlaceBtnProps = {
  place: any;
  onClick?: () => void;
  remove: () => void;
  num: number;
  deleteBookMark?: any;
};

export default function NumberScheduleBox({ place, onClick, remove, num, deleteBookMark }: PlaceBtnProps) {
  const fallbackImageUrl = 'https://ifh.cc/v-On2Oyz)%EC%9D%B4';

  useEffect(() => {
    console.log('numberbox에 props 확인하세요', place);
  }, []);

  return (
    <Layout>
      {/* {num.map((item) => (
        <Number key={item}>{item}</Number>
      ))} */}
      <Number>{num}</Number>
      <Box onClick={onClick}>
        <div style={{ width: '48px' }}>
          <Img
            src={place.img_url}
            // onError={(e) => {
            //   const imgElement = e.target as HTMLImageElement;
            //   imgElement.src = fallbackImageUrl;
            // }}
            alt="img"
          />
        </div>
        <TextBox>
          <TitleLayout>
            <Title>{place.place_name}</Title>
            <AddLayout>
              <Delete onClick={deleteBookMark}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  close
                </span>
              </Delete>
            </AddLayout>
          </TitleLayout>
          <Loca>
            <span style={{ color: '#63BEC6', marginRight: '4px' }}>{place.group_name}</span>
            <Location>{place.address_name}</Location>
          </Loca>
        </TextBox>
      </Box>
    </Layout>
  );
}
const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Number = styled.div`
  width: 20px;
  height: 20px;
  background: #63bec6;
  color: white;
  border-radius: 50%;
  line-height: 18px;
  text-align: center;
`;

const Box = styled.button`
  width: 300px;
  height: 48px;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.16);
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.24);
  }
`;

const Img = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 5px;
`;

const TextBox = styled.div`
  width: 300px;
  height: 58px;
  margin-left: 12px;
`;

const TitleLayout = styled.div`
  /* display: flex; */
  width: 250px;
  position: relative;
  gap: 5px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const Loca = styled.div`
  display: flex;
  font-size: 14px;
`;

const Location = styled.div`
  width: 60%;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AddLayout = styled.div`
  display: flex;
  gap: 5px;
  margin-left: auto;
  align-items: center;
`;

const Delete = styled.button`
  color: #393939;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
`;

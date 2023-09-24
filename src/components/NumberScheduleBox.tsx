import styled from 'styled-components';
// import React, { useState } from 'react';

type PlaceBtnProps = {
  imgUrl?: string;
  name?: any;
  category?: string;
  location?: string;
  onClick?: () => void;
  remove: () => void;
  num: number;
  clicked:any;
  setClicked: any;
};

export default function NumberScheduleBox({ imgUrl, name, category, location, onClick, remove, num, clicked, setClicked }: PlaceBtnProps) {
  // const [num,setNum] = useState(1);

  return (
    <Layout>
      {/* {num.map((item) => (
        <Number key={item}>{item}</Number>
      ))} */}
      <Number>{num}</Number>
      <Box onClick={onClick}>
        <img src={imgUrl} alt="img" style={{ width: '48px', height: '48px', borderRadius: '5px' }} />
        <TextBox>
          <TitleLayout>
            <Title>{name}</Title>
            <AddLayout>
              <Delete onClick={remove}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', marginTop: '8px' }}>
                  close
                </span>
              </Delete>
            </AddLayout>
          </TitleLayout>
          <Loca>
            <span style={{ color: '#63BEC6', marginRight: '4px' }}>{category}</span>
            {location}
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

const TextBox = styled.div`
  width: 300px;
  height: 58px;
  margin-left: 12px;
`;

const TitleLayout = styled.div`
  display: flex;
  gap: 5px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const Loca = styled.div`
  font-size: 14px;
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
`;

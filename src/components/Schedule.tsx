import styled from 'styled-components';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { dailyPlanStore } from '../stores/dailyPlanStore';

type PlaceBtnProps = {
  addDailyPlan: () => void;
  removePlan?: () => void;
  addBookMark: () => void;
  // removeBookMark: () => void;
  // setCheckSelected: Dispatch<SetStateAction<number>>;
  place?: any;
};

export default function Schedule({ addDailyPlan, removePlan, addBookMark, place }: PlaceBtnProps) {
  const { dailyPlan, setDailyPlan, defaultList, setDefaultList } = dailyPlanStore();

  const plusOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.name);
    addDailyPlan();
    console.log('dailyPlan', dailyPlan);
  };

  // useEffect(() => {
  //   const updatedDailyPlan = dailyPlan.map((plan: any) => {
  //     if (plan.place_id === clickedId && dailyPlan.length > 0) {
  //       plan.isAdded = true;
  //     }
  //     return plan;
  //   });
  // }, [dailyPlan]);

  useEffect(() => {
    // console.log('props로 넘긴 place', place);
  }, [place]);

  return (
    <Box>
      <div style={{ width: '56px' }}>
        <img src={place.img_url} alt="img" style={{ width: '56px', height: '56px', borderRadius: '5px' }} />
      </div>

      <TextBox>
        <TitleLayout>
          <Title>{place.place_name}</Title>
          <AddLayout>
            {/* <Add onClick={() => {}} className={isPlusMinus ? 'isPlusMinus' : ''}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', lineHeight: '22px' }}>
                favorite
              </span>
            </Add> */}
            <Add onClick={addDailyPlan} className={place.checked ? 'mint' : ''}>
              +
            </Add>
          </AddLayout>
        </TitleLayout>
        <Loca>
          <span style={{ color: '#63BEC6', marginRight: '4px' }}>{place.group_name}</span>
          <Location>{place.address_name}</Location>
        </Loca>
      </TextBox>
    </Box>
  );
}

const Box = styled.button`
  width: 320px;
  height: cal(88-32) px;
  border-radius: 6px;
  padding: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.24);
  }
`;

const TextBox = styled.div`
  width: 330px;
  height: 100%;
  margin-left: 12px;
`;

const TitleLayout = styled.div`
  display: flex;
  gap: 5px;
`;
const Title = styled.div`
  width: 200px;
  font-size: 20px;
  font-weight: 600;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Loca = styled.div`
  font-size: 14px;
`;

const Location = styled.div`
  width: 250px;
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

const Add = styled.button<{ mintBtn?: boolean }>`
  width: 22px;
  height: 22px;
  background-color: #adadad;

  border-radius: 3px;
  text-align: center;
  line-height: 20px;
  color: white;
  cursor: pointer;

  &.isPlusMinus {
    background-color: #d52e2e;
  }
  &.mint {
    background-color: #63bec6;
  }
`;

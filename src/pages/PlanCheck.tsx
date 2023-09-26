import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import Button from '../components/Button';
import ScheduleBox from '../components/ScheduleBox';
import MapContainer from '../utils/Map';
import { baseInstance } from '../apis/config';

function PlanCheck() {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [places, setPlaces] = useState<any[]>([]);
  const navigate = useNavigate();
  const { plan_id } = useParams();

  const getPlans = async () => {
    try {
      const response = await baseInstance.get(`/mytravel/${plan_id}`, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      console.log('response', response.data[0]);
      console.log('placeList', response.data[0].placeList);
      setDate(response.data[0].date);
      setCity(response.data[0].city);
      setPlaces(response.data[0].placeList);

      // console.log('places', typeof places);
      console.log('places img', places[0].img_url);
      console.log('places group name', places[0].group_name);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  useEffect(() => {
    // console.log('plancheck', places);
  }, [places]);

  return (
    <Layout>
      <SideBar>
        <Logo
          src="https://ifh.cc/g/4fHXOp.png"
          onClick={() => {
            navigate('/');
          }}
        />
        <div>
          <EditBtn
            onClick={() => {
              navigate('/plan', { state: { plan_id: plan_id } });
            }}
          >
            편집
          </EditBtn>
          <Button
            title="Home"
            onClick={() => {
              navigate('/');
            }}
          />
        </div>
      </SideBar>

      <PlanCheckBar>
        <TitleBox>
          <p style={{ fontSize: '28px' }}>{city}</p>
          <p style={{ fontSize: '16px', marginTop: '12px' }}>{date}</p>
        </TitleBox>

        <Plan>
          {places.map((item, index) => {
            return (
              <ScheduleBox
                key={item.id}
                imgUrl={item.img_url} //
                num={index + 1}
                name={item.place_name}
                category={item.group_name} //
                location={item.road_address_name}
                onClick={() => {}}
                x={item.x}
                y={item.y}
              />
            );
          })}
        </Plan>
      </PlanCheckBar>

      <div style={{ width: '908px' }}>
        <MapContainer places={places} showLine={true} />
      </div>
    </Layout>
  );
}

export default PlanCheck;

const Layout = styled.div`
  display: flex;
  overflow: hidden;
`;
const Logo = styled.img`
  width: 70px;
  cursor: pointer;
`;

const SideBar = styled.aside`
  width: 100px;
  height: 100vh;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1);
`;
const EditBtn = styled.button`
  width: 68px;
  height: 34px;
  text-align: center;
  border: 2px solid black;
  border-radius: 6px;
  background-color: white;
  margin-bottom: 21px;
`;

const PlanCheckBar = styled.div`
  width: 432px;
  height: 100vh;
  padding-top: 50px;
`;
const TitleBox = styled.div`
  margin-left: 50px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Plan = styled.div`
  max-height: 540px;
  overflow-y: auto; /* 수직 스크롤 활성화 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

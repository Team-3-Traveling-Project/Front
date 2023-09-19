import React from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Button from '../components/Button';
import ScheduleBox from '../components/ScheduleBox';
import MapContainer from '../utils/Map';

function PlanCheck() {
  const plan: { imgUrl: string; num: string; name: string; category: string; location: string; onClick:()=>void }[] = [
    {
      imgUrl: 'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc',
      num: '1',
      name: '경복궁',
      category: '명소',
      location: '서울',
      onClick: (()=>{})
    },
    {
      imgUrl: 'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc',
      num: '2',
      name: '경복궁',
      category: '명소',
      location: '서울',
      onClick: (()=>{})
    },
    {
      imgUrl: 'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc',
      num: '3',
      name: '경복궁',
      category: '명소',
      location: '서울',
      onClick: (()=>{})
    },
    {
      imgUrl: 'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc',
      num: '4',
      name: '경복궁',
      category: '명소',
      location: '서울',
      onClick: (()=>{})
    },
    {
      imgUrl: 'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc',
      num: '5',
      name: '경복궁',
      category: '명소',
      location: '서울',
      onClick: (()=>{})
    },
  ]
  
  const navigate = useNavigate();

  return (
    <Layout>
      <SideBar>
        <Button title='로고' onClick={()=>{navigate('/main');}}/>
        <div>
          <EditBtn onClick={()=>{navigate('/plan');}}>편집</EditBtn>
          <Button title='Home' onClick={()=>{navigate('/main');}} />
        </div>
      </SideBar>

      <PlanCheckBar>
        <TitleBox>
          <p style={{fontSize:'28px'}}>서울</p>
          <p style={{fontSize:'16px', marginTop:'12px'}}>여행일자</p>
        </TitleBox>

        <Plan>
        {plan.map((item) => {
            return(
              <ScheduleBoxLayout>
                <ScheduleBox imgUrl='' num='1' name='경복궁' category='명소' location='서울' onClick={()=>{}}/>
              </ScheduleBoxLayout>
            )
          })}
        </Plan>
      </PlanCheckBar>

      <div style={{width:'908px'}}>
        <MapContainer/>
      </div>  
    </Layout>
  )
}

export default PlanCheck;

const Layout = styled.div`
  display: flex;
  overflow: hidden;
`

const SideBar = styled.aside`
  width: 100px;
  height: 100vh;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1);
`
const EditBtn = styled.button `
  width: 68px;
  height: 34px;
  text-align: center;
  border: 2px solid black;
  border-radius: 6px;
  background-color: white;
  margin-bottom: 21px;
`

const PlanCheckBar = styled.div`
  width: 432px;
  height: 100vh;
  padding-top:50px;
`
const TitleBox = styled.div`
  margin-left: 50px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const Plan = styled.div`
  max-height: 540px;
  overflow-y: auto; /* 수직 스크롤 활성화 */
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ScheduleBoxLayout = styled.div`
  margin-bottom: 30px;
`
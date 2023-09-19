import React, { useState } from 'react';
import PlaceBtn from '../components/PlaceBtn';
import BookMarkBox from '../components/BookMarkBox';
import styled from 'styled-components';
import Slider from '../components/Slider';
import Button from '../components/Button';
import Map from '../utils/Map'
import { useNavigate } from 'react-router-dom';

function BookMark() {
  const categories: string[] = ['명소', '식당', '카페'];
  const texts = [
    '서울',
    '경상남도',
    '부산',
    '경상북도',
    '경상북도',
    '세종',
    '강원도'
  ];
  const bookmark: { imgUrl: string; name: string; category: string; location: string }[] = [
    {
      imgUrl: 'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc',
      name: '경복궁',
      category: '명소',
      location: '서울',
    },
    {
      imgUrl: 'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc',
      name: '경복궁',
      category: '명소',
      location: '서울',
    },
    {
      imgUrl: 'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc',
      name: '경복궁',
      category: '명소',
      location: '서울',
    },
    {
      imgUrl: 'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc',
      name: '경복궁',
      category: '명소',
      location: '서울',
    },
    {
      imgUrl: 'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc',
      name: '경복궁',
      category: '명소',
      location: '서울',
    },
    {
      imgUrl: 'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc',
      name: '경복궁',
      category: '명소',
      location: '서울',
    },
  ];
  
  const [activeTab, setActiveTab] = useState<string>('명소'); // 선택된 탭을 관리하는 상태
  // PlaceBtn이 클릭될 때 실행될 함수
  const handlePlaceBtnClick = (title: any): any => {
    setActiveTab(title);
  };


  const navigate = useNavigate();

  return (
    <Container>

      <SideBar>
        <Button title='로고' onClick={()=>{navigate('/main');}}/>
        <Button title='이전' onClick={()=>{navigate('/main');}} />
      </SideBar>

      <BookMarkBar>
        <p style={{marginLeft:'5px'}}>북마크</p>
        <SliderArea>
          <Slider texts={texts} onClick={()=>{}}/>
        </SliderArea>
        <Category>
            {categories.map((item) => (
              <PlaceBtn
                key={item}
                title={item}
                active={item === activeTab} // 현재 탭이 활성화된 경우 true, 아닌 경우 false
                onClick={handlePlaceBtnClick} // PlaceBtn이 클릭되었을 때 실행되는 함수
              />
            ))}
          </Category>
        <List>
          {
            bookmark.map((item)=>{
              return <BookMarkBox 
              imgUrl={item.imgUrl} 
              name={item.name} 
              category={item.category} 
              location={item.location} 
              onClick={()=>{}} 
              onDelete={()=>{}}/>
            })
          }
        </List>
      </BookMarkBar>

      <div style={{width:'908px'}}>
        <Map/>
      </div>
    </Container>
  );
}

export default BookMark;

const Container = styled.div `
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
`

// BookMarkBar
const BookMarkBar = styled.div`
  background-color: #FAFAFA;
  width: 432px;
  height: 100vh;
  padding-left: 21px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    font-size: 20px;
    font-weight: bold;
    margin-top: 48px;
  }
`
const SliderArea = styled.div`
  margin-top: 33px;
  margin-left: 3px;
`

const Category = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 28px;
`;
const List = styled.div`
  gap: 16px;
  max-height: 680px;
  overflow-y: auto; /* 수직 스크롤 활성화 */
  margin-top: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* border: 1px solid black; */
`;
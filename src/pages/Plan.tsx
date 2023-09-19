import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Select from '../components/Select';
import PlaceBtn from '../components/PlaceBtn';
import Schedule from '../components/Schedule';
import NumberScheduleBox from '../components/NumberScheduleBox';
const categories = ['명소', '식당', '카페'];

export default function Plan() {
  const [activeTab, setActiveTab] = useState<string>('명소'); // 선택된 탭을 관리하는 상태
  const [isOpened, setIsOpened] = useState<boolean>(true);

  // PlaceBtn이 클릭될 때 실행될 함수
  const handlePlaceBtnClick = (title: any): any => {
    setActiveTab(title);
  };

  const toggleHandler = () => {
    setIsOpened(!isOpened);
  };

  return (
    <>
      <Layout>
        <LogoBar>
          <Button title="로고" />
          <Button title="다음" />
        </LogoBar>

        <AreaBar>
          <Area>
            <p>서울</p>
            <Select selectList="서울" />
          </Area>

          <Date></Date>

          <SearchLayout>
            <Search placeholder="장소명으로 검색해보세요"></Search>

            <span
              className="material-symbols-outlined"
              onClick={() => {}}
              style={{ color: '#BCBCBC', cursor: 'pointer' }}
            >
              search
            </span>
          </SearchLayout>

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
            <Schedule
              add={() => {}}
              name="경복궁"
              category="명소"
              location="서울특별시"
              imgUrl={'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc'}
            />
            <Schedule
              add={() => {}}
              name="경복궁"
              category="명소"
              location="서울특별시"
              imgUrl={'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc'}
            />
            <Schedule
              add={() => {}}
              name="경복궁"
              category="명소"
              location="서울특별시"
              imgUrl={'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc'}
            />
            <Schedule
              add={() => {}}
              name="경복궁"
              category="명소"
              location="서울특별시"
              imgUrl={'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc'}
            />
            <Schedule
              add={() => {}}
              name="경복궁"
              category="명소"
              location="서울특별시"
              imgUrl={'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc'}
            />
            <Schedule
              add={() => {}}
              name="경복궁"
              category="명소"
              location="서울특별시"
              imgUrl={'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc'}
            />
            <Schedule
              add={() => {}}
              name="경복궁"
              category="명소"
              location="서울특별시"
              imgUrl={'https://cdn.myro.co.kr/prod/image/place/Seoul/425_b2a005f2-6b6f-4885-94c9-0ff34ad799bc'}
            />
          </List>
        </AreaBar>

        <PlanBar className={isOpened ? 'isOpened' : 'close'}>
          <Toggle onClick={toggleHandler}>
            <span className="material-symbols-outlined" style={{ color: '#b1b1b1', fontSize: '20px' }}>
              keyboard_double_arrow_left
            </span>
          </Toggle>
          <ScheduleArea>
            <p>일정</p>
            <PlanList>
              <NumberScheduleBox
                add={() => {}}
                name="경복궁"
                category="명소"
                location="서울특별시"
                imgUrl={'https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg'}
              />
              <NumberScheduleBox
                add={() => {}}
                name="경복궁"
                category="명소"
                location="서울특별시"
                imgUrl={'https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg'}
              />
              <NumberScheduleBox
                add={() => {}}
                name="경복궁"
                category="명소"
                location="서울특별시"
                imgUrl={'https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg'}
              />
              <NumberScheduleBox
                add={() => {}}
                name="경복궁"
                category="명소"
                location="서울특별시"
                imgUrl={'https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg'}
              />
              <NumberScheduleBox
                add={() => {}}
                name="경복궁"
                category="명소"
                location="서울특별시"
                imgUrl={'https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg'}
              />
            </PlanList>
          </ScheduleArea>
          <BookMark>
            <p>북마크</p>
            <BookMarkList>
              <NumberScheduleBox
                add={() => {}}
                name="경복궁"
                category="명소"
                location="서울특별시"
                imgUrl={'https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg'}
              />
              <NumberScheduleBox
                add={() => {}}
                name="경복궁"
                category="명소"
                location="서울특별시"
                imgUrl={'https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg'}
              />
              <NumberScheduleBox
                add={() => {}}
                name="경복궁"
                category="명소"
                location="서울특별시"
                imgUrl={'https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg'}
              />
              <NumberScheduleBox
                add={() => {}}
                name="경복궁"
                category="명소"
                location="서울특별시"
                imgUrl={'https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg'}
              />
              <NumberScheduleBox
                add={() => {}}
                name="경복궁"
                category="명소"
                location="서울특별시"
                imgUrl={'https://news.samsungdisplay.com/wp-content/uploads/2018/08/14.jpg'}
              />
            </BookMarkList>
          </BookMark>
        </PlanBar>

        <MapArea className={isOpened ? 'isOpened' : ''}></MapArea>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  overflow: hidden;
`;

const LogoBar = styled.div`
  width: 100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  justify-content: space-between;
  align-items: center;
`;

const AreaBar = styled.div`
  width: 432px;
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Area = styled.div`
  display: flex;
  margin-top: 48px;
  gap: 20px;
  p {
    font-size: 20px;
    font-weight: bold;
  }
`;

const Date = styled.div`
  margin-top: 30px;
  border: 1px solid black;
  width: 322px;
  height: 54px;
`;

const SearchLayout = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.2);
`;
const Search = styled.input`
  width: 356px;
  height: 38px;
  border: none;
  padding: 9px;
  border-radius: 5px;
`;

const Category = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 28px;
`;

const List = styled.div`
  gap: 16px;
  max-height: 680px;
  overflow-y: auto; /* 수직 스크롤 활성화 */
  margin-top: 30px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* border: 1px solid black; */
`;
const PlanList = styled.div`
  gap: 16px;
  max-height: 350px;
  overflow-y: auto; /* 수직 스크롤 활성화 */
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: hidden;
`;
const PlanBar = styled.div`
  width: 380px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* &.isOpened {
    transform: translateX(-355px);
    transition: transform 0.3s ease-in-out;
  }
  &.close {
    transition: transform 0.3s ease-in-out;
  } */
`;
const Toggle = styled.button`
  width: 20px;
  height: 20px;
  margin-left: 355px;
  margin-top: 5px;
  cursor: pointer;
`;

const ScheduleArea = styled.div`
  height: 400px;
  /* border: 1px solid black; */
  margin-bottom: 50px;
  p {
    font-size: 18px;
    font-weight: bold;
    padding: 5px;
  }
`;
const BookMark = styled.div`
  /* border: 1px solid black; */
  height: 350px;
  margin-bottom: 50px;
  p {
    font-size: 18px;
    font-weight: bold;
    padding: 5px;
  }
`;
const MapArea = styled.div`
  /* width: 908px; */
  flex: 1;
  height: 100vh;
  background-color: #b7d6ff;

  /* transform: translateX(-355px);
  transition: transform 0.3s ease-in-out; */
`;
const BookMarkList = styled.div`
  gap: 16px;
  max-height: 280px;
  overflow-y: auto; /* 수직 스크롤 활성화 */
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: hidden;
`;

import React, { useEffect, useState } from 'react';
import BookMarkBox from '../components/BookMarkBox';
import styled from 'styled-components';
import Slider from '../components/Slider';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { baseInstance } from '../apis/config';
import MapContainer from '../utils/Map';

function BookMark() {
  type BookMarkDataProps = {
    address_name: string;
    road_address_namen: string;
    place_name: string;
    id: number;
    img_url: string;
    location: string;
    group_name: string;
  };
  // 북마크 목록 관리
  const [bookmarkData, setBookmarkData] = useState<BookMarkDataProps[]>([]);
  // 첫 랜더링 됐을 때 slider에 표시되는 cities 목록
  const [cities, setCities] = useState([]);
  // slider에서 클릭한 city 관리
  const [city, setCity] = useState('');

  // 북마크 데이터 가져오기
  const getBookMark = async () => {
    try {
      const response = await baseInstance.get('bookmark', {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      // console.log('BookMark response', response);
      // API 응답 데이터를 배열에 저장
      setBookmarkData(response.data.bookmarkList);
      setCities(response.data.cityList);
      getCityBookMark(); // 비동기 막기 위해 순서를 정해줌 -> getBookMark가 실행된 후 getCityBookMark가 실행됨
    } catch (error) {
      console.log(error);
    }
  };

  // 지역별 북마크 데이터 가져오기
  const getCityBookMark = async () => {
    try {
      const response = await baseInstance.get(`bookmark/${city}`, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      // console.log('city response', response);

      // API 응답 데이터를 배열에 저장
      setBookmarkData(response.data.bookmarkList);
    } catch (error) {
      console.log(error);
    }
  };

  // 북마크 데이터 삭제하기
  const deleteBookMark = async (id: number) => {
    try {
      await baseInstance.delete(`bookmark/${id}`, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });

      // 삭제한 북마크를 제외하고 업데이트된 북마크 목록을 설정
      setBookmarkData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  // category별 북마크 get 요청

  useEffect(() => {
    getBookMark();
    console.log('렌더링 됨');
  }, [city]);

  // 카테고리...
  // const [activeTab, setActiveTab] = useState<string>('명소'); // 선택된 탭을 관리하는 상태
  // // PlaceBtn이 클릭될 때 실행될 함수
  // const handlePlaceBtnClick = (title: string) => {
  //   setActiveTab(title);
  // };

  const navigate = useNavigate();

  return (
    <Container>
      <SideBar>
        <Logo
          src="https://ifh.cc/g/4fHXOp.png"
          onClick={() => {
            navigate('/');
          }}
        />
        <Button
          title="이전"
          onClick={() => {
            navigate('/');
          }}
        />
      </SideBar>

      <BookMarkBar>
        <p style={{ marginLeft: '20px' }}>북마크</p>
        <SliderArea>
          <Slider texts={cities} setCity={setCity} getCityBookMark={getCityBookMark} />
        </SliderArea>

        <List>
          {bookmarkData.map((item) => {
            return (
              <BookMarkBox
                key={item.id}
                imgUrl={item.img_url}
                name={item.place_name}
                category={item.group_name}
                location={item.address_name}
                onClick={() => {}}
                onDelete={() => deleteBookMark(item.id)}
              />
            );
          })}
        </List>
      </BookMarkBar>

      <MapArea>
        <MapContainer places={bookmarkData} />
      </MapArea>
    </Container>
  );
}

export default BookMark;

const Container = styled.div`
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
`;

// BookMarkBar
const BookMarkBar = styled.div`
  background-color: #fafafa;
  width: 432px;
  height: 100vh;
  padding-left: 21px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  p {
    font-size: 20px;
    font-weight: bold;
    margin-top: 48px;
  }
`;
const SliderArea = styled.div`
  margin-top: 33px;
  margin-left: 3px;
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 28px;
`;
const List = styled.div`
  gap: 16px;
  max-height: 680px;
  overflow-y: auto; /* 수직 스크롤 활성화 */
  overflow-x: hidden;
  margin-top: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* border: 1px solid black; */
`;

const MapArea = styled.div`
  flex: 1;
  height: 100vh;
  background-color: #b7d6ff;
`;

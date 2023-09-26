import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Select from '../components/Select';
import PlaceBtn from '../components/PlaceBtn';
import Schedule from '../components/Schedule';
import NumberScheduleBox from '../components/NumberScheduleBox';
import MapContainer from '../utils/Map';
import { useNavigate } from 'react-router';
import { baseInstance } from '../apis/config';
import DatePick from '../components/DatePick';
import { useLocation } from 'react-router-dom';
const categories = ['관광명소', '음식점', '카페'];
const categoriesCode = ['AT4', 'FD6', 'CE7'];

export default function Plan() {
  const location = useLocation();
  const plan_id = location.state?.plan_id;
  console.log('제발 되라', plan_id);

  //----plan id 있을 때 일정 가져오기----------------
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');

  const getPlans = async () => {
    try {
      const response = await baseInstance.get(`/mytravel/${plan_id}`, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      console.log('id있을 때 값 가져온거얌 히히히ㅣ히히힣', response.data[0]);
      console.log('placeList', response.data[0].placeList);
      setDate(response.data[0].date);
      setCity(response.data[0].city);
      setAddedPlan(response.data[0].placeList);

      // console.log('places', typeof places);
      // console.log('places img', places[0].img_url);
      // console.log('places group name', places[0].group_name);
    } catch (error) {
      console.log('error', error);
    }
  };

  //-------------------------------------------

  const navigate = useNavigate();
  // -------- button, toggle ----------
  const [activeTab, setActiveTab] = useState<any>(0); // 선택한 카테고리 인덱스
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [mapLocation, setMapLocation] = useState<[number, number] | null>(null);

  const toggleHandler = () => {
    setIsOpened(!isOpened);
  };

  // 검색
  const onchangeSearchHandler = (e: any) => {
    setSearch(e.target.value);
  };

  // ---------- 렌더링 될 때마다 바뀌는 장소 데이터 목록 -----------
  type PlaceDataProps = {
    place_name: string;
    address_name: string;
    road_address_name: string;
    x: string;
    y: string;
    group_name: string;
    img_url: string;
  };

  // local storage에서 chosed place 가져오기
  const query = localStorage.getItem('chosed place');

  // get으로 받아온 장소 데이터 관리
  const [placeData, SetPlaceData] = useState<PlaceDataProps[]>([]);

  // ------- 처음 렌더링 될 때 관광명소(dafault) 데이터 가져오기 --------
  const GetDefaultPlace = async () => {
    try {
      const response = await baseInstance.get(`findplace/${query}`, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      SetPlaceData(response.data);
      // console.log('처음 렌더링 될 때',response);
      console.log('여기 좌표있나봐봐', response.data[0]);
      setMapLocation([parseFloat(response.data[0].x), parseFloat(response.data[0].y)]);
      console.log('좌표 잘가고 있는거 마즘?', mapLocation);
    } catch (error) {
      console.log(error);
    }
  };

  // -------------- 도시별 구 조회 -----------------
  const [area, setArea] = useState<[]>([]);
  const GetRegion = async () => {
    try {
      const response = await baseInstance.get(`findregion/${query}`, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      setArea(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------- 검색 -----------
  // 선택한 구의 category place list 가져오기
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const GetSearchPlace = async () => {
    try {
      const response = await baseInstance.get(
        `findplace/keyword?query=${query}&region=${selectedRegion}&keyword=${search}`,
        {
          headers: { Authorization: `${localStorage.getItem('Authorization')}` },
        },
      );
      SetPlaceData(response.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // -------- categry별 장소 데이터 가져오기 ----------
  // AT4(관광명소), CE7(카페), FD6(식당)
  const [placeDataTourism, setPlaceDataTourism] = useState<PlaceDataProps[]>([]);
  const [placeDataRestaurant, setPlaceDataRestaurant] = useState<PlaceDataProps[]>([]);
  const [placeDataCafe, setPlaceDataCafe] = useState<PlaceDataProps[]>([]);
  const GetRegionPlace = async (groupCode: string) => {
    try {
      const response = await baseInstance.get(
        `findplace/group?query=${query}&region=${selectedRegion}&group=${groupCode}`,
        {
          headers: { Authorization: `${localStorage.getItem('Authorization')}` },
        },
      );
      // 카테고리에 따라서 데이터를 분기하여 저장
      if (groupCode === 'AT4') {
        setPlaceDataTourism(response.data);
        SetPlaceData(response.data);
      } else if (groupCode === 'FD6') {
        setPlaceDataRestaurant(response.data);
        SetPlaceData(response.data);
      } else if (groupCode === 'CE7') {
        setPlaceDataCafe(response.data);
        SetPlaceData(response.data);
      }
      // SetPlaceData(response.data);
      console.log(response);
      // console.log('activeTab',activeTab);
      // console.log('selectedRegion',selectedRegion);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 초기 렌더링 시에는 groupCode를 설정하지 않고 호출하므로 오류가 발생
    // 따라서 초기 렌더링 시에는 GetRegionPlace를 호출하지 않도록 처리
    if (activeTab !== null && selectedRegion !== '') {
      const groupCode = categoriesCode[activeTab];
      GetRegionPlace(groupCode);
    }
  }, [activeTab, selectedRegion]);

  useEffect(() => {
    GetDefaultPlace();
    GetRegion();
    GetBookmark();
  }, []);

  useEffect(() => {
    if (plan_id) {
      getPlans();
    }
  }, [plan_id]);

  // ----------- 일정 추가 및 삭제 -------------
  const [addedPlan, setAddedPlan] = useState<PlaceDataProps[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);

  // (+) button 눌렀을 때 일정에 추가
  const addPlan = (place: PlaceDataProps) => {
    // 이미 추가되어 있는지 확인
    const isAlreadyAdded = addedPlan.some((plan) => plan.place_name === place.place_name);

    if (!isAlreadyAdded) {
      // 추가되어 있지 않은 경우에만 추가
      setAddedPlan([...addedPlan, place]);
      setClicked(true);
      // console.log("addedPlan",addedPlan)
      // console.log("clicked", clicked);
      // console.log("일정 추가됨");
    } else {
      // 이미 추가된 경우에는 제거
      removePlan(place.place_name);
      // console.log('일정 제거됨');
    }
  };

  // 일정 삭제
  const removePlan = (placeName: string) => {
    const newPlan = addedPlan.filter((plan) => plan.place_name !== placeName);
    setAddedPlan(newPlan);
    // console.log('placeData', placeData);
  };

  // ------------ 북마크 --------------
  type BookMarkProps = {
    id: number;
    place_name: string;
    address_name: string;
    road_address_name: string;
    x: string;
    y: string;
    group_name: string;
    image_url: string;
    city: string;
    userId: string;
  };

  const [bookMark, setBookMark] = useState<BookMarkProps[]>([]);
  // 처음 렌더링 됐을 때 북마크 get
  const GetBookmark = async () => {
    try {
      const response = await baseInstance.get(`bookmark/${query}`, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      setBookMark(response.data.bookmarkList);
      console.log('bookMark', response.data.bookmarkList);
    } catch (error) {
      console.log(error);
    }
  };

  // ♥️ 눌렀을 때 리스트에 추가 (브라우저)
  // const [addedBookMark, setAddedBookMark] = useState<BookMarkProps[]>([]);

  // const addBookMark = (place: BookMarkProps) => {
  //   const isAlreadyAdded = addedPlan.some((plan) => plan.place_name === place.place_name);

  //   if (!isAlreadyAdded) {
  //     setBookMark([...bookMark, place]);
  //     postBookMark(place);
  //     console.log("북마크 추가됨");
  //   } else {
  //     removeBookMark(place);

  //     console.log("북마크 제거됨");
  //   }
  // };
  // // 북마크 삭제
  // const removeBookMark = (place: PlaceDataProps) => {
  //   const newBookMark =  bookMark.filter((plan)=> plan.place_name !== place.place_name);
  //   setBookMark(newBookMark);

  // };

  // ♥️ 누를 때 마다 북마크 post 요청 (서버에 저장)
  const postBookMark = async (place: PlaceDataProps) => {
    const newPlace = { ...place, city: query };
    console.log('newPlace', newPlace);
    try {
      const response = await baseInstance.post('bookmark', newPlace, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      console.log(response);
      if (response.data.statusCode === 200) {
        GetBookmark();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 북마크 delete
  const deleteBookMark = async (id: number) => {
    try {
      const data = await baseInstance.delete(`bookmark/${id}`, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      console.log(data);
      if (data.data.statusCode === 200) {
        GetBookmark();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ------------ 다음 버튼 눌렀을 때 여행일정 저장(post) ------------
  // 선택한 날짜를 관리하는 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const formattedDate = selectedDate ? selectedDate.toISOString().slice(0, 10) : '';
  // console.log(formattedDate);

  const postSchedule = async () => {
    const plan = {
      date: formattedDate,
      city: query,
      placeList: addedPlan,
    };

    try {
      const response = await baseInstance.post('schedule', plan, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      console.log(response);

      if (response.data.statusCode === 200) {
        navigate(`/planCheck/${response.data.planId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <LogoBar>
          <Logo
            src="https://ifh.cc/g/4fHXOp.png"
            onClick={() => {
              navigate('/');
            }}
          />

          <Button
            title="다음"
            onClick={() => {
              postSchedule();
            }}
          />
        </LogoBar>

        <AreaBar>
          <Area>
            <p>{query}</p>
            <Select
              area={area}
              setSelectedRegion={setSelectedRegion}
              GetRegionPlace={GetRegionPlace}
              categoriesCode={categoriesCode}
              activeTab={activeTab}
            />
          </Area>

          <DateSection>
            <p style={{ marginRight: '20px' }}>날짜</p>
            <DatePick selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </DateSection>

          <SearchLayout>
            <Search placeholder="장소명으로 검색해보세요" value={search} onChange={onchangeSearchHandler} />
            <span
              className="material-symbols-outlined"
              onClick={() => {
                GetSearchPlace();
                setSearch('');
              }}
              style={{ color: '#BCBCBC', cursor: 'pointer' }}
            >
              search
            </span>
          </SearchLayout>

          <Category>
            {categories.map((item, index) => (
              <PlaceBtn
                key={index}
                title={item}
                onClick={() => {
                  setActiveTab(index);
                  const groupCode = categoriesCode[index];
                  GetRegionPlace(groupCode); // 선택한 카테고리에 해당하는 데이터를 가져오도록 수정
                }}
                active={activeTab === index} // 현재 탭이 활성화된 경우 true, 아닌 경우 false
              />
            ))}
          </Category>

          <List>
            {placeData.map((item, index) => (
              <Schedule
                key={index}
                name={item.place_name}
                category={item.group_name}
                location={item.address_name}
                imgUrl={item.img_url}
                addPlan={() => {
                  addPlan(item);
                }}
                removePlan={() => removePlan(item.place_name)}
                clicked={clicked}
                setClicked={setClicked}
                addBookMark={() => postBookMark(item)}
                // removeBookMark={() => deleteBookMark(item)}
              />
            ))}
          </List>
        </AreaBar>

        <PlanBar className={isOpened ? 'isOpened' : 'close'}>
          <Toggle onClick={toggleHandler}>
            {/* <span className="material-symbols-outlined" style={{ color: '#b1b1b1', fontSize: '20px' }}>
              keyboard_double_arrow_left
            </span> */}
          </Toggle>
          <ScheduleArea>
            <p>일정</p>
            <PlanList>
              {addedPlan.map((item, index) => (
                <NumberScheduleBox
                  key={item.place_name}
                  name={item.place_name}
                  category={item.group_name}
                  location={item.address_name}
                  imgUrl={item.img_url}
                  remove={() => removePlan(item.place_name)}
                  num={index + 1}
                  clicked={clicked}
                  setClicked={setClicked}
                />
              ))}
            </PlanList>
          </ScheduleArea>
          <BookMark>
            <p>북마크</p>
            <BookMarkList>
              {bookMark.map((item, index) => (
                <NumberScheduleBox
                  key={item.id}
                  name={item.place_name}
                  category={item.group_name}
                  location={item.address_name}
                  imgUrl={item.image_url}
                  remove={() => deleteBookMark(item.id)}
                  num={index + 1}
                  clicked={clicked}
                  setClicked={setClicked}
                />
              ))}
              {/* {addedBookMark.map((item, index) => (
                    <NumberScheduleBox
                      key={item.place_name}
                      name={item.place_name}
                      category="명소"
                      location={item.address_name}
                      imgUrl={item.img_url}
                      remove={() => removeBookMark(item)}
                      num={index+1}

                      clicked={clicked}
                      setClicked={setClicked}
                    />
                  ))} */}
            </BookMarkList>
          </BookMark>
        </PlanBar>

        <MapArea className={isOpened ? 'isOpened' : ''}>
          <MapContainer places={bookMark} plans={addedPlan} mapLocation={mapLocation} />
        </MapArea>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  overflow: hidden;
`;

const Logo = styled.img`
  width: 70px;
  cursor: pointer;
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
  z-index: 2;
  p {
    font-size: 20px;
    font-weight: bold;
  }
`;

const DateSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  /* border: 1px solid black; */
  width: 316px;
  height: 54px;
  z-index: 1;
  p {
    font-size: 20px;
    font-weight: bold;
    margin-right: 24px;
  }
`;

const SearchLayout = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(102, 102, 102, 0.2);
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
  /* cursor: pointer; */
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
  max-height: 300px;
  overflow-y: auto; /* 수직 스크롤 활성화 */
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: hidden;
  margin-top: 10px;
`;

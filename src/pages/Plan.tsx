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
const categories = ['관광명소', '음식점', '카페'];
const categoriesCode = [ 'AT4', 'FD6', 'CE7'];

// address_name: "경기 양주시 장흥면 교현리 산 25-1"
// img_url: "http://t1.daumcdn.net/cfile/tistory/999F5F435DC4C35B33"
// place_name: "북한산둘레길 21구간우이령길"
// road_address_name: ""
// x: "126.9950525295552"
// y: "37.685112988816826"
export default function Plan() {
  const navigate = useNavigate();
   // -------- button, toggle ----------
   const [ activeTab, setActiveTab] = useState<any>(0); // 선택된 탭을 관리하는 상태
   const [isOpened, setIsOpened] = useState<boolean>(true);
   const [search, setSearch] = useState<string>('');
   
   const toggleHandler = () => {
     setIsOpened(!isOpened);
   };

   // 검색
   const onchangeSearchHandler = (e:any) => {
      setSearch(e.target.value);
   }

   // ---------- 렌더링 될 때마다 바뀌는 장소 데이터 목록 -----------
   type PlaceDataProps = {
    address_name: string;
    img_url: string;
    place_name: string;
    group_name: string;
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
    } catch (error) {
      console.log(error)
    }
  };

  // -------------- 도시별 구 조회 -----------------
  const [area,setArea] = useState<[]>([]);

  const GetRegion = async () => {
    try {
      const response = await baseInstance.get(`findregion/${query}`, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      });
      setArea(response.data);
      // console.log(response);
    } catch (error) {
      console.log(error)
    }
  }

  // ---------- 검색 -----------
  // 선택한 구 데이터저장하여 해당 구의 category place list 가져오기
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const GetSearchPlace = async () => {
    try {
      const response = await baseInstance.get(`findplace/keyword?query=${query}&region=${selectedRegion}&keyword=${search}`, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      }); 
      SetPlaceData(response.data);
      // console.log(response);
    } catch (error) {
      console.log(error)
    }
  }

  // -------- categry별 장소 데이터 가져오기 ----------
  // AT4(관광명소), CE7(카페), FD6(식당)
  const GetRegionPlace = async () => {
    try {
      const response = await baseInstance.get(`findplace/group?query=${query}&region=${selectedRegion}&group=${categoriesCode[activeTab]}`, {
        headers: { Authorization: `${localStorage.getItem('Authorization')}` },
      }); 
      SetPlaceData(response.data);
      // console.log(response);
      // console.log('activeTab',activeTab);
      // console.log('selectedRegion',selectedRegion);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{GetRegionPlace();},[activeTab, selectedRegion]);
  useEffect(() =>{GetDefaultPlace(); GetRegion(); },[]);

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

      console.log("clicked", clicked);
      // console.log("일정 추가됨");
    } else {
      // 이미 추가된 경우에는 제거
      removePlan(place.place_name);
      console.log("일정 제거됨");
    }
  };


  // 일정 삭제
  const removePlan = (placeName:string) => {
    const newPlan =  addedPlan.filter((plan)=> plan.place_name !== placeName);
    setAddedPlan(newPlan);
    const changeBtn = placeData.map((item) => item.place_name === placeName? setNo(false):setNo(true))
    console.log('삭제',changeBtn);
    console.log('placeData',placeData);
    console.log('no in removePlan',no);
  
  };
  console.log('no in out',no);

  // ------------ 북마크 --------------
  // 처음 렌더링 됐을 때 북마크 get 


  // ♥️ 눌렀을 때 리스트에 추가 (브라우저)
  const [addedBookMark, setAddedBookMark] = useState<PlaceDataProps[]>([]);

  const addBookMark = (place: PlaceDataProps) => {
    const isAlreadyAdded = addedPlan.some((plan) => plan.place_name === place.place_name);

    if (!isAlreadyAdded) {
      setAddedBookMark([...addedBookMark, place]);
      postBookMark(place);
      console.log("북마크 추가됨");
    } else {
      removeBookMark(place);

      console.log("북마크 제거됨");
    }
  };
  // 북마크 삭제
  const removeBookMark = (place: PlaceDataProps) => {
    const newBookMark =  addedBookMark.filter((plan)=> plan.place_name !== place.place_name);
    setAddedBookMark(newBookMark);
    
  };

  // {
  //   ”place_name”:”장소이름”,
  //   ”address_name”:”서울 강남구 삼성동 159”, 
  //   ”road_address_name”:”서울 강남구 영동대로 513”,
  //   ”x”:”127.05902969025047”,
  //   ”y”:”37.51207412593136”
  //   ”city”:”서울”,
  //   ”group_name”:”카페”,
  //   ”img_url”:”사진”
  //   }


  // ♥️ 누를 때 마다 북마크 post 요청 (서버에 저장)
  const postBookMark =async (place: PlaceDataProps) => {
    try {
      const response = await baseInstance.post('bookmark',place);
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }
  // 북마크 delete
  // const deleteBookMark =async (params:type) => {
  //   try {
  //     const data = await baseInstance.delete(`bookmark/{id}`);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
      <Layout>
        <LogoBar>
          <Button title="로고" onClick={()=>{navigate('/main');}} />
          <Button title="다음" onClick={()=>{navigate('/planCheck');}}/>
        </LogoBar>

        <AreaBar>
          <Area>
            <p>{query}</p>
            <Select area={area} setSelectedRegion={setSelectedRegion} GetRegionPlace={GetRegionPlace}/>
          </Area>

          <Date>
            <p>날짜</p>
            <DatePick />
          </Date>

          <SearchLayout>
            <Search placeholder="장소명으로 검색해보세요" 
            value={search}
            onChange={onchangeSearchHandler} />
            <span
              className="material-symbols-outlined"
              onClick={() => { GetSearchPlace(); setSearch('')}}
              style={{ color: '#BCBCBC', cursor: 'pointer' }}>
              search
            </span>
          </SearchLayout>

          <Category>
            {categories.map((item, index) => (
              <PlaceBtn
                key={index}
                title={item}
                onClick={()=>{setActiveTab(index); GetRegionPlace();}}
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
                  addPlan={() => {addPlan(item)}}

                  clicked={clicked}
                  setClicked={setClicked}

                  addBookMark={() => addBookMark(item)}
                  removePlan={() => removePlan(item.place_name)}
                  removeBookMark={() => removeBookMark(item)}
                />
                ))}
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
              {addedPlan.map((item, index) => (
                <NumberScheduleBox
                  key={item.place_name}
                  name={item.place_name}
                  category={item.group_name}
                  location={item.address_name}
                  imgUrl={item.img_url}
                  remove={() => removePlan(item.place_name)}
                  num={index+1}

                  clicked={clicked}
                  setClicked={setClicked}

                />
              ))}
            </PlanList>

          </ScheduleArea>
          <BookMark>
            <p>북마크</p>
            <BookMarkList>
            {addedBookMark.map((item, index) => (
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
              ))}
            </BookMarkList>
          </BookMark>
        </PlanBar>

        <MapArea className={isOpened ? 'isOpened' : ''}>
          <MapContainer />
        </MapArea>
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
const Date = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  /* border: 1px solid black; */
  width: 322px;
  height: 54px;
  p {
    font-size: 20px;
    font-weight: bold; 
    margin-right: 24px;
  }
`;
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

type TextSliderProps = {
  texts: string[];
  setCity: Dispatch<SetStateAction<string>>;
  getCityBookMark: ()=>{}
}

const Slider: React.FC<TextSliderProps> = ({ texts, setCity, getCityBookMark }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(texts.length);

  // useEffect(() => {
  //   console.log('렌더링');
  //   setLength(texts.length);
  // }, [texts]); >> data가 바뀌지 않는다면 없어도 됨 -> 북마크 지역 자체를 삭제하게 된다면 필요할 것 같아서 일단 넣어 놨어요...

  // 슬라이드 하나의 너비를 계산
  // 각 슬라이드의 너비를 퍼센트 단위로 지정
  // ex) 슬라이드가 4개이고 slideWidth가 25로 계산되면, 각 슬라이드는 화면의 25% 너비를 차지하게 됨
  const slideWidth = 100 / texts.length; 

//   const next = () => {
//     if (currentIndex < length - 1) {
//       setCurrentIndex(prevState => Math.min(prevState + 3, length - 1));
//       // console.log(currentIndex + 3)
//     }
//   };

//   const prev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(prevState => Math.max(prevState - 3, 0));
//       // console.log(currentIndex - 3);
      
//     }
//   };

//   return (
//     <SliderBox>
//       <LeftButton
//         onClick={prev}
//         className="left-arrow"
//         curindex={currentIndex}
//       >
//         <span className="material-symbols-outlined">navigate_before</span>
//       </LeftButton>
//       <Wrapper>
//         <ContentBox style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}>
//         {texts.map((text, index) => (
//           <TextStyle
//             key={index}
//             onClick={()=>{setCity(text); getCityBookMark();}}
//             islongtext={text.length > 2} // 3글자 이상인 텍스트에만 max-width 적용
//           >
//             {text}
//           </TextStyle>
//         ))}
//         </ContentBox>
//       </Wrapper>
//       <RightButton
//         onClick={next}
//         className="right-arrow"
//         curindex={currentIndex}
//         totallength={length}
//       >
//         <span className="material-symbols-outlined">navigate_next</span>
//       </RightButton>
//     </SliderBox>
//   );
// };

const next = () => {
  if (currentIndex < texts.length - 1) {
    setCurrentIndex(currentIndex + 3); // 한 번에 한 슬라이드씩 이동
  }
};

const prev = () => {
  if (currentIndex > 0) {
    setCurrentIndex(currentIndex - 3); // 한 번에 한 슬라이드씩 이동
  }
};

return (
  <SliderBox>
    <LeftButton onClick={prev} className="left-arrow" curindex={currentIndex}>
      <span className="material-symbols-outlined">navigate_before</span>
    </LeftButton>
    <Wrapper>
      <ContentBox style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}>
        {texts.map((text, index) => (
          <TextStyle
            key={index}
            onClick={() => {
              setCity(text);
              getCityBookMark();
            }}
            islongtext={text.length > 2}
          >
            {text}
          </TextStyle>
        ))}
      </ContentBox>
    </Wrapper>
    <RightButton onClick={next} className="right-arrow" curindex={currentIndex} totallength={length}>
      <span className="material-symbols-outlined">navigate_next</span>
    </RightButton>
  </SliderBox>
);
};


export default Slider;

const SliderBox = styled.div`
  width: 370px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Wrapper = styled.div`
  max-width: 300px; /* 최대 너비를 ContentBox의 너비와 일치시킴 */
  /* background-color: yellow; */
  overflow: hidden;
  position: relative;
`;

const ContentBox = styled.div`
  display: flex;
  transition: all 0.3s ease-out;
`;

const TextStyle = styled.div<{ islongtext: any }>`
  cursor: pointer;
  padding: 2px 4px;
  font-size: 16px;
  color: white;
  border: 1px solid black;
  border-radius: 5px;
  background-color: black;
  margin: 9px;
  white-space: nowrap; /* 줄 바꿈 비활성화 */
  max-width: ${props => props.islongtext ? '93px' : '100%'}; /* 긴 텍스트에만 max-width 적용 */
`

const LeftButton = styled.button<{ curindex: number }>`
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  border: 0;
  background-color: transparent;
`;

const RightButton = styled.button<{ curindex: number; totallength: number }>`
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  border: 0;
  background-color: transparent;
`;

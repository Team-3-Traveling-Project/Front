import { useState } from 'react';
import styled from 'styled-components';

type TextSliderProps = {
  texts: string[];
  onClick: () => void;
}

const SliderBox = styled.div`
  width: 370px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

const ContentBox = styled.div`
  display: flex;
  transition: all 0.3s ease-out;
`;

const TextStyle = styled.div`
  cursor: pointer;
  padding: 4px;
  font-size: 20px;
  color: white;
  border:1px solid black;
  border-radius: 5px;
  background-color: black;
  margin: 9px;
  white-space: nowrap; /* 줄 바꿈 비활성화 */
`

const LeftButton = styled.button<{ curIndex: number }>`
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  margin-right: 3px;
  border: 0;
  background-color: transparent;
`;

const RightButton = styled.button<{ curIndex: number; totalLength: number }>`
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  margin-left:3px;
  border: 0;
  background-color: transparent;
`;

const Slider: React.FC<TextSliderProps> = ({ texts, onClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(texts.length);


  // useEffect(() => {
  //   console.log('렌더링');
  //   setLength(data.length);
  // }, [data]); >> data가 바뀌지 않는다면 없어도 됨

  const next = () => {
    if (currentIndex < length) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  return (
    <SliderBox>
      <LeftButton
              onClick={prev}
              className="left-arrow"
              curIndex={currentIndex}
            >
              <span className="material-symbols-outlined">arrow_left</span>
            </LeftButton>
      <Wrapper>
        
        <ContentBox style={{ transform: `translateX(-${currentIndex * 50}%)` }}>
          {texts.map((text) => {
            return <TextStyle onClick={onClick}>{text}</TextStyle>;
          })}
        </ContentBox>
      </Wrapper>
      <RightButton
              onClick={next}
              className="right-arrow"
              curIndex={currentIndex}
              totalLength={length}
            >
               <span className="material-symbols-outlined">arrow_right</span>
            </RightButton>
    </SliderBox>
  );
};

export default Slider;
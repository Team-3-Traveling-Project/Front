import { useState } from 'react';
import styled from 'styled-components';

// PlaceBtn 컴포넌트의 props 타입 정의
type PlaceBtnProps = {
  title: string;
}

// PlaceBtn 컴포넌트 정의
export default function PlaceBtn({ title }: PlaceBtnProps) {
  const [btnShadow, setBtnShadow] = useState(false);

  return (
    <ButtonLayout>
      <Btn 
      onClick={()=> setBtnShadow(!btnShadow)}
      className={btnShadow ? 'active':''}
      >
        {title}
      </Btn>
    </ButtonLayout>
  );
}

// ButtonLayout 스타일드 컴포넌트 정의
const ButtonLayout = styled.div``;

// Btn 스타일드 컴포넌트 정의
const Btn = styled.button`
  /* 글자 */
  color: #000000;
  text-align: center;
  font-size: 16px;

  /* 네모 박스 */
  width: 84.6px;
  height: 27px;
  border-radius: 17px;
  background: #fff;
  /* display: inline-block; */

  transition: box-shadow 0.2s ease-in-out; /* 그림자 변화를 부드럽게 만듦 */

  &.active {
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

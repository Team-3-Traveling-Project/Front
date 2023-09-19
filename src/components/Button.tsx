import { type } from 'os';
import styled from 'styled-components';

type ButtonProps = {
  title: string;
};

export default function Button({ title }: ButtonProps) {
  return (
    <ButtonLayout>
      <Btn>{title}</Btn>
    </ButtonLayout>
  );
}

const ButtonLayout = styled.div`
`;

const Btn = styled.button`
  /* 글자 */
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: bold;

  /* 네모 박스 */
  width: 70px;
  height: 45px;
  border-radius: 5px;
  background: #222;
  transition: box-shadow 0.3s ease-in-out; /* 그림자 변화를 부드럽게 만듦 */

  &:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.247); /* 마우스 호버 시 그림자 증가 */
  }
`;

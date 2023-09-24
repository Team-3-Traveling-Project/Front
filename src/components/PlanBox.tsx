import styled from 'styled-components';

type PlanBoxProps = {
  date?: string;
  city?: string;
  details?: any;
  onDelete?: any;
};

export default function PlanBox({ date, city, details, onDelete }: PlanBoxProps) {
  const handleDeleteClick = (event: any) => {
    event.stopPropagation(); // 클릭 이벤트 버블링 방지
    onDelete(); // 삭제 함수 호출
  };
  return (
    <>
      <Plans onClick={details}>
        <Image src="https://cdn.myro.co.kr/prod/image/city/Seoul.jpg" />
        <BoxLayout>
          <Date>{date}</Date>
          <City>{city}</City>
          <Btn onClick={handleDeleteClick}>삭제</Btn>
        </BoxLayout>
      </Plans>
    </>
  );
}
const Plans = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 3px;
  width: 400px;
  height: 120px;
  border-radius: 10px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.158);
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    box-shadow: 3px 4px 9px rgba(0, 0, 0, 0.247); /* 마우스 호버 시 그림자 증가 */
  }
  /* border: 1px solid black; */
`;

const Image = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 8px;
`;

const BoxLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const Date = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const City = styled.div`
  font-size: 20px;
`;

const Btn = styled.button`
  width: 70px;
  height: 24px;
  color: white;
  font-size: 16px;
  text-align: center;
  border-radius: 5px;
  line-height: 24px;
  cursor: pointer;
  margin-left: 200px;
  background-color: #1b1b1b;
  &:active {
    background-color: #4e4e4e;
  }
`;

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import styled from 'styled-components';

export default function DatePick() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <Layout>
      <StyledDatePicker
        dateFormat="yyyy.MM.dd" // 날짜 형태
        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
        minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
        maxDate={new Date('2100-01-01')} // maxDate 이후 날짜 선택 불가
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      <span className="material-symbols-outlined" style={{ marginRight: '60px' }}>
        calendar_today
      </span>
    </Layout>
  );
}

const Layout = styled.div`
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  p {
    font-size: 20px;
    font-weight: bold;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  padding-left: 10px;
  font-size: 16px;
  text-align: center;
  border: none;
`;

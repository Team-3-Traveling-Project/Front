import React, { useState } from 'react';
import { styled } from 'styled-components';
import area from '../utils/Area';

interface SelectProps {
  selectList: string;
}

const Select: React.FC<SelectProps> = ({ selectList }) => {
  const [selectedArea, setSelectedArea] = useState<string>('지역을 선택해 주세요');
  // option을 클릭했을 때 selectedArea의 색깔을 바꾸기 위한 state
  const [textColor, setTextColor] = useState<string>('#BCBCBC');

  // drop down 동작
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <div>
        <SelectBtn
          onClick={() => {
            setOpen(!open);
          }}
          onBlur={() => {
            setOpen(false);
          }}
          value={selectedArea}
        >
          <div style={{ color: textColor }}>{selectedArea}</div>
          <div style={{ color: '#BCBCBC' }}>▼</div>

          <Ul open={open}>
            {area.map((areaItem) => {
              if (areaItem.name === selectList) {
                return areaItem.regions.map((item) => (
                  <Option
                    key={item}
                    onClick={() => {
                      setSelectedArea(item);
                      setTextColor('black');
                      setOpen(false);
                    }}
                  >
                    {item}
                  </Option>
                ));
              }
              return null;
            })}
          </Ul>
        </SelectBtn>
      </div>
    </div>
  );
};

const SelectBtn = styled.button`
  height: 32px;
  width: 240px;
  border: 0;
  border-radius: 12px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: relative;
  font-size: 16px;
  color: #bcbcbc;
`;

const Ul = styled.div<{ open: boolean }>`
  height: 150px;
  width: 260px;
  background-color: white;
  list-style-type: none;
  padding-left: 10px;
  border: 0;
  border-radius: 8px;
  padding-top: 10px;
  margin: 0;
  display: ${(props) => (props.open ? 'block' : 'none')};
  /* block - 보임 , none - 안보임 */
  position: absolute;
  top: 35px;
  left: 0;
  /* 스크롤바 */
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 10px;
    height: 50px;
  }
  &::-webkit-scrollbar-thumb {
    background: #bcbcbc; /* 스크롤바의 색상 */
    border-radius: 12px;
    height: 30%;
  }
  &::-webkit-scrollbar-track {
    border-radius: 12px;
  }
`;

const Option = styled.div`
  height: 30px;
  width: 300px;
  font-size: 16px;
  white-space: nowrap;
  text-align: start;
`;

export default Select;

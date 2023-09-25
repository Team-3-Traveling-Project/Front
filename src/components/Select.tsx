import React, { Dispatch, SetStateAction, useState } from 'react';
import { styled } from 'styled-components';

type SelectProps = {
  area: [];
  setSelectedRegion: Dispatch<SetStateAction<string>>;
  GetRegionPlace:(groupCode: string) => Promise<void>;
  categoriesCode: string[];
  activeTab: number;
}

const Select: React.FC<SelectProps> = ({area, setSelectedRegion, GetRegionPlace, categoriesCode, activeTab}) => {
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
              return <Option key={areaItem}
                      onClick={() => {
                        const groupCode = categoriesCode[activeTab]; // 여기에서 groupCode 값을 가져옴
                        setSelectedRegion(areaItem);
                        GetRegionPlace(groupCode); // groupCode를 전달하여 호출
                        setSelectedArea(areaItem);
                        setTextColor('black');
                        setOpen(false);
                      }}
                     >
                      {areaItem}
                    </Option>
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

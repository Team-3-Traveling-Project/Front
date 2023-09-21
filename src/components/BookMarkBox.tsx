import styled from 'styled-components';

type BookMarkProps = {
  imgUrl: string;
  name: string;
  category: string;
  location: string;
  onClick: () => void;
  onDelete : any;
};

export default function BookMarkBox({ imgUrl, name, category, location, onClick, onDelete }: BookMarkProps) {

  return (
    <Box onClick={onClick}>
      <img src={imgUrl} alt="img" style={{ width: '56px', height: '56px', borderRadius: '5px' }} />
      <TextBox>
        <TitleLayout>
          <Title>{name}</Title>
          <DeleteLayout>
            <Delete onClick={onDelete}>
              -
            </Delete>
          </DeleteLayout>
        </TitleLayout>
        <Loca>
          <span style={{ color: '#63BEC6', marginRight: '4px' }}>{category}</span>
          {location}
        </Loca>
      </TextBox>
    </Box>
  );
}

const Box = styled.button`
  width: 320px;
  height: cal(88-32) px;
  border-radius: 6px;
  padding: 18px;
  display: flex;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.24);
  }
`;

const TextBox = styled.div`
  width: 330px;
  height: 54px;
  margin-left: 12px;
`;

const TitleLayout = styled.div`
  display: flex;
  gap: 5px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Loca = styled.div`
  font-size: 14px;
`;

const DeleteLayout = styled.div`
  display: flex;
  gap: 5px;
  margin-left: auto;
  align-items: center;
`;

const Delete = styled.button`
  width: 22px;
  height: 22px;
  background-color: #adadad;
  border-radius: 3px;
  text-align: center;
  line-height: 20px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #63bec6;
  }
`;

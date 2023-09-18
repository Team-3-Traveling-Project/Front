import styled from 'styled-components';

type PictureBoxProps = {
  imageURL: string;
  onClick: () => void;
  text: string;
  koText: string;
};

export default function PictureBox({ imageURL, onClick, text, koText }: PictureBoxProps) {
  return (
    <Box>
      <img
        style={{ width: '300px', height: '320px', borderRadius: '11px' }}
        src={imageURL}
        alt="Travel"
        onClick={onClick}
      />
      <Text>
        {text}

        <span
          style={{
            fontSize: '16px',
            fontWeight: '100',
            fontFamily: 'Noto Sans KR',
            padding: '0 2px',
          }}
        >
          {koText}
        </span>
      </Text>
    </Box>
  );
}

const Box = styled.div`
  margin: 20px;
  width: 300px;
  height: 428px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
  /* border: 5px solid red; */
`;

const Text = styled.div`
  width: 300px;
  height: 87px;
  padding: 16px 12px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  font-family: 'Cafe24Ohsquare';
`;

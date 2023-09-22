import React from 'react'
import PictureBox from '../components/PictureBox'
import styled from 'styled-components';
import Header from '../components/Header';

type Area = {
  KoreanName: string;
  EnglishName: string;
  img: string;
}

function Main() {

  const AreaCard: Area[] = [
    {
      KoreanName: '서울',
      EnglishName: 'Seoul',
      img: 'https://cdn.myro.co.kr/prod/image/city/Seoul.jpg',
    },
    {
      KoreanName: '경기도',
      EnglishName: 'Gyeonggi',
      img: 'https://cdn.myro.co.kr/prod/image/city/Gapyeong.jpg' // 가평
    },
    {
      KoreanName: '제주도',
      EnglishName: 'Jeju',
      img: 'https://cdn.myro.co.kr/prod/image/city/Jeju.jpg'
    },
    {
      KoreanName: '부산',
      EnglishName: 'Busan',
      img: 'https://cdn.myro.co.kr/prod/image/city/Busan.jpg'
    },
    {
      KoreanName: '강원도',
      EnglishName: 'Gangwon',
      img:'https://cdn.myro.co.kr/prod/image/city/Chuncheon.jpg' // 춘천
    },
    {
      KoreanName: '대구',
      EnglishName: 'Daegu',
      img:'https://a.cdn-hotels.com/gdcs/production16/d1777/d35d743e-9d7b-482a-a6b4-c6037dec11b7.jpg?impolicy=fcrop&w=800&h=533&q=medium'
    },
    {
      KoreanName: '경상북도',
      EnglishName: 'North Gyeongsang',
      img:'https://cdn.myro.co.kr/prod/image/city/Pohang.jpg' // 포항
    },
    {
      KoreanName: '충청남도',
      EnglishName: 'South Chungcheong',
      img:'https://mediaim.expedia.com/destination/1/7195f6ddcb7df7b93454ae2f2da08480.jpg'
    },
    {
      KoreanName: '대전',
      EnglishName: 'Daejeon',
      img:'https://cdn.myro.co.kr/prod/image/city/Daejeon.jpg'
    },
    {
      KoreanName: '경상남도',
      EnglishName: 'South Gyeongsang',
      img:'https://cdn.myro.co.kr/prod/image/city/Geojetongyeong.jpg' // 거제통영
    },
    {
      KoreanName: '인천',
      EnglishName: 'Incheon',
      img: 'https://cdn.myro.co.kr/prod/image/city/Incheon.jpg'
    },
    {
      KoreanName: '전라남도',
      EnglishName: 'South Jeolla',
      img:'https://cdn.myro.co.kr/prod/image/city/Mokpo.jpg' // 목포
    },
    {
      KoreanName: '광주',
      EnglishName: 'Gwangju',
      img:'https://mblogthumb-phinf.pstatic.net/MjAxNzA4MDdfMzcg/MDAxNTAyMTA0NjIwNjgx.LVVz996AnGBFA1vmhehrlMLN-felnGm9uXBmLg1rRCQg.TUp-mfl6nwIX6JcehR0zInnIgpIfmsmqAYzv6_sdMLAg.JPEG.overroad89/main.JPG?type=w800'
    },
    {
      KoreanName: '충청북도',
      EnglishName: 'North Chungcheong',
      img:'https://cdn.myro.co.kr/prod/image/city/Jecheon.jpg' // 제천
    },
    {
      KoreanName: '전라북도',
      EnglishName: 'North Jeolla',
      img:'https://cdn.myro.co.kr/prod/image/city/Namwon.jpg' // 남원
    },
    {
      KoreanName: '울산',
      EnglishName: 'Ulsan',
      img:'https://blog.kakaocdn.net/dn/buHs0g/btrD5RX38Vz/QSTCK3zqw0KWUn0nn3kjPk/img.jpg'
    },
    {
      KoreanName: '세종',
      EnglishName: 'Sejong City',
      img:'https://mblogthumb-phinf.pstatic.net/MjAxNjEwMzFfMjAw/MDAxNDc3ODQ0MjY4Nzc5.Wnf16iCMXYbG0mUMx2fdv-Twvl9HD6zZBbVmnKUw_csg.s6KJAzCSxQ3lzv0oWY_14Z3DGniLGxJzEXpRyRSMiewg.JPEG.bluepoto3/%EC%84%B8%EC%A2%85%EC%8B%9C%EC%97%AC%ED%96%89%28%EB%B9%84%EC%95%94%EC%82%AC%29_%281%29.jpg?type=w800'
    }
  ];
  

  return (
    <>
      <Header></Header>
      <CenterAligned>
        <H1>어디로 여행을 떠나시나요?</H1>
        <AreaCardBox>
          {AreaCard.map((item) => (
            <PictureBox 
              imageURL={item.img}
              onClick={()=>{}}
              text={item.EnglishName}
              koText={item.KoreanName}
            />
          ))}
        </AreaCardBox>
      </CenterAligned>
    </>
  )
}

export default Main;

const CenterAligned = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const H1 = styled.h1`
  font-size: 28px;
  text-align: center;
  margin-top: 85px;
  margin-bottom: 65px;
`

const AreaCardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 340px);
`

const Nav = styled.nav`
  height: 72px;
`
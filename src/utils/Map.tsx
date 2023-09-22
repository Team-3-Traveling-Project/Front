import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapContainer = ({ places }:any) => {
  useEffect(() => {
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(37.56680618429329, 126.97866075325555), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    console.log('map', places);

    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    var markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);

    // var bookMarks = [
    //   {
    //     title: '카카오',
    //     latlng: new window.kakao.maps.LatLng(33.450705, 126.570677),
    //   },
    //   {
    //     title: '더미',
    //     latlng: new window.kakao.maps.LatLng(37.51207412593136, 127.05902969025047),
    //   },
    //   {
    //     title: '텃밭',
    //     latlng: new window.kakao.maps.LatLng(33.450879, 126.56994),
    //   },
    //   {
    //     title: '근린공원',
    //     latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
    //   },
    // ];

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    for (var i = 0; i < places.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new window.kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: places[i].latlng, // 마커를 표시할 위치
        title: places[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
  }, []);

  return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
};

export default MapContainer;

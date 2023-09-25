import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapContainer = ({ places, showLine = false }: any) => {
  useEffect(() => {
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(37.56680618429329, 126.97866075325555), //지도의 중심좌표.
      level: 10, //지도의 레벨(확대, 축소 정도)
    };
    // console.log('map', places);

    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    var markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    // var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
    //   imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
    //   imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    var linePath = [];

    for (var i = 0; i < places.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new window.kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      // var latlng = new window.kakao.maps.LatLng(places[i].x, places[i].y);
      var latlng = new window.kakao.maps.LatLng(parseFloat(places[i].y), parseFloat(places[i].x));

      console.log('이게 좌표값입니더', latlng);

      linePath.push(latlng);

      if (showLine) {
        // 지도에 표시할 선을 생성합니다
        var polyline = new window.kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 5, // 선의 두께 입니다
          strokeColor: '#FFAE00', // 선의 색깔입니다
          strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid', // 선의 스타일입니다
        });

        // 지도에 선을 표시합니다
        polyline.setMap(map);
      }
      // // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      // var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
      //   markerPosition = new window.kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

      // 마커를 생성합니다
      var marker = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: latlng, // 마커를 표시할 위치
        title: places[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
    // console.log('linePath', linePath);
    console.log('places', places);

    // // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    // var content =
    //   '<div class="customoverlay">' +
    //   '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
    //   '    <span class="title">구의야구공원</span>' +
    //   '  </a>' +
    //   '</div>';

    // // 커스텀 오버레이가 표시될 위치입니다
    // var position = new window.kakao.maps.LatLng(37.54699, 127.09598);

    // // 커스텀 오버레이를 생성합니다
    // var customOverlay = new window.kakao.maps.CustomOverlay({
    //   map: map,
    //   position: position,
    //   content: content,
    //   yAnchor: 1,
    // });
  }, [places]);

  return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
};

export default MapContainer;

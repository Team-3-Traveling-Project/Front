import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

type MapProps = {
  places: any;
  showLine?: boolean;
  plans?: any;
  mapLocation?: any;
};

const MapContainer = ({ places, showLine = false, plans, mapLocation }: MapProps) => {
  useEffect(() => {
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    // var defaultLocation = new window.kakao.maps.LatLng(parseFloat(places[0]), parseFloat(places[1]));
    // console.log('이게 좌표여', mapLocation);

    const centerLat = mapLocation ? mapLocation[1] : 37.56680618429329;
    const centerLng = mapLocation ? mapLocation[0] : 126.97866075325555;

    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(centerLat, centerLng), //지도의 중심좌표.
      level: 10, //지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    var linePath = [];

    for (var i = 0; i < places.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new window.kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      var latlng = new window.kakao.maps.LatLng(parseFloat(places[i].y), parseFloat(places[i].x));

      // console.log('이게 좌표값입니더', latlng);

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

      // 마커를 생성합니다
      var marker = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: latlng, // 마커를 표시할 위치
        title: places[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }

    // console.log('linePath', linePath);
    // console.log('places', places);

    // 다음은 plans의 마커를 추가하는 부분입니다.
    var planImageSrc = 'https://ifh.cc/g/2qQf8L.png'; // plans에 사용할 마커 이미지 URL을 설정하세요

    for (var i = 0; i < (plans || []).length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var planImageSize = new window.kakao.maps.Size(35, 35);

      // 마커 이미지를 생성합니다
      var planMarkerImage = new window.kakao.maps.MarkerImage(planImageSrc, planImageSize);

      // LatLng 생성
      var planLatLng = new window.kakao.maps.LatLng(parseFloat(plans[i].y), parseFloat(plans[i].x));

      // plans 마커를 생성합니다
      var planMarker = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: planLatLng, // 마커를 표시할 위치
        title: plans[i].title, // 마커의 타이틀
        image: planMarkerImage, // plans 마커 이미지
      });
    }
  }, [places, plans, showLine, mapLocation]);

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default MapContainer;

import { FC } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';

interface Props {
  detail: PerformanceDetail;
}
const KakaoMap: FC<Props> = ({ detail }) => {
  // const mapRef = useRef<kakao.maps.Map>(null);

  // useEffect(() => {
  //   if (window.kakao && window.kakao.maps) {
  //     if (mapRef.current) {
  //       const map = mapRef.current;

  //       map.relayout();
  //       map.setCenter(new kakao.maps.LatLng(37.52112, 127.1283636));
  //     }
  //   }
  // }, []);

  return (
    <Map
      center={{
        lat: 37.52112,
        lng: 127.1283636,
      }}
      style={{ width: '100%', height: 'inherit' }}
      level={3}
    >
      <MapMarker position={{ lat: 37.52112, lng: 127.1283636 }}>
        <div style={{ padding: '5px', color: '#000' }}>{detail.fcltynm}</div>
      </MapMarker>
    </Map>
  );
};

export default KakaoMap;

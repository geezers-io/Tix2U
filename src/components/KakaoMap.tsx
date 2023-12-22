import Script from 'next/script';
import { FC } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';

interface Props {
  detail: PerformanceDetail;
}
const KakaoMap: FC<Props> = ({ detail }) => {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{
          lat: 37.52112,
          lng: 127.1283636,
        }}
        style={{ width: '100%', height: 'inherit' }}
        level={3}
      >
        <MapMarker position={{ lat: 37.52112, lng: 127.1283636 }}>
          <div style={{ color: '#000' }}>{detail.fcltynm}</div>
        </MapMarker>
      </Map>
    </>
  );
};

export default KakaoMap;

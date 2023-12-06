import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Box } from '@chakra-ui/react';
import useKakaoLoader from '@/hooks/useKakaoLoader';

const KakaoMap = ({ detail }) => {
  useKakaoLoader();

  return (
    <Box h="800px" m="0 auto">
      <Map
        center={{
          lat: 37.4,
          lng: 127.13,
        }}
        style={{ width: '30em', height: 'inherit' }}
        level={3}
      >
        <MapMarker position={{ lat: 37.52112, lng: 127.1283636 }}>
          <div style={{ padding: '5px', color: '#000' }}>{detail.fcltynm}</div>
        </MapMarker>
      </Map>
    </Box>
  );
};

export default KakaoMap;

import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: '	ae9227eb31d38084c5fb2021b9ebbcd6',
    libraries: ['clusterer', 'drawing', 'services'],
  });
}

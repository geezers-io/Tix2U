export interface GetPerformanceListRequest {
  stdate: string; // 공연시작일자	20160101
  eddate: string; // 공연종료일자	20160630
  cpage: string; // 현재페이지	1
  rows: string; // 페이지당 목록 수	10
  shprfnm?: string; // 공연명	사랑(URLEncoding)
  shprfnmfct?: string; // 공연시설명	예술의전당(URLEncoding)
  shcate?: string; // 장르코드	AAAA
  prfplccd?: string; // 공연장코드	FC000001-01
  signgucode?: string; // 지역(시도)코드	11
  signgucodesub?: string; // 지역(구군)코드	1111
  kidstate?: string; // 아동공연여부	Y(지정안하면 기본은 전체공연)
  prfstate?: string; // 공연상태코드	01
  openrun?: string; // 오픈런	Y
}

export interface PerformanceSummary {
  mt20id: string; // 공연ID	PF132236
  prfnm: string; // 공연명	우리연애할까
  prfpdfrom: string; // 공연시작일	2016.05.12
  prfpdto: string; // 공연종료일	2016.07.31
  fcltynm: string; // 공연시설명(공연장명)	피가로아트홀(구 훈아트홀)
  poster?: string; // 포스터이미지경로	http://www.kopis.or.kr/upload/pfmPoster/PF_PF132236_160704_142630.gif
  genrenm: string; // 공연 장르명	연극
  prfstate: string; // 공연상태	공연중
  openrun: string; // 오픈런	Y
}

interface GetPerformanceDetailRequest {
  mt20id: string; // 공연목록 조회 후 나오는 공연ID 참조  PF132236
}

export interface PerformanceDetail {
  mt20id: string; // 공연ID	PF132236
  mt10id: string; // 공연시설ID	FC001431
  prfnm: string; // 공연명	우리연애할까
  prfpdfrom: string; // 공연시작일	2016.05.12
  prfpdto: string; // 공연종료일	2016.07.31
  fcltynm: string; // 공연시설명(공연장명)	피가로아트홀(구 훈아트홀) (피가로아트홀)
  prfcast: string; // 공연출연진	김부연, 임정균, 최수영
  prfcrew: string; // 공연제작진	천정민
  prfruntime: string; // 공연 런타임	1시간 30분
  prfage: string; // 공연 관람 연령	만 12세 이상
  entrpsnm: string; // 제작사	극단 피에로
  pcseguidance: string; // 티켓가격	전석 30,000원
  poster?: string; // 포스터이미지경로	http://www.kopis.or.kr/upload/pfmPoster/PF_PF132236_160704_142630.gif
  sty?: string; // 줄거리
  genrenm: string; // 장르	연극
  prfstate: string; // 공연상태	공연중
  openrun: string; // 오픈런	Y
  styurls?: string; // 소개이미지 url 목록
  dtguidance: string; // 공연시간	화요일 ~ 금요일(20:00), 토요일(16:00,19:00), 일요일(15:00,18:00)
}

interface GetPerformanceLocationRequest {
  mt10id: string; // 공연목록 조회 후 나오는 공연ID 참조  PF132236
}

interface PerformanceLocation {
  fcltynm: string; //올림픽공원</fcltynm>
  mt10id: string; //FC001247</mt10id>
  mt13cnt: string; //9</mt13cnt>
  fcltychartr: string; //기타(공공)</fcltychartr>
  opende: string; //1986</opende>
  seatscale: string; //32349</seatscale>
  telno: string; //02-410-1114</telno>
  relateurl: string; //http://www.olympicpark.co.kr/</relateurl>
  adres: string; //서울특별시 송파구 방이동</adres>
  la: string; //37.52112</la>
  lo: string; //127.12836360000005</lo>
}

export interface PerformanceClient {
  getList(request: GetPerformanceListRequest): Promise<PerformanceSummary[]>;
  getDetail(request: GetPerformanceDetailRequest): Promise<PerformanceDetail>;
  getLocation(request: GetPerformanceLocationRequest): Promise<PerformanceLocation>;
}

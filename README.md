<div align="center">

<!-- logo -->

![name_logo](./public/name_logo.png)

### Tix2U (Tix To You!)

[<img src="https://img.shields.io/badge/프로젝트 기간-2023.11.17~2023.12.22-0090f6?style=flat&logoColor=white" />]()
<br />
[💻 사이트 바로가기](https://tix2u.vercel.app/) <br>
[📣 최종 발표 자료](https://drive.google.com/file/d/11Lnr75HFAsSP_Gw5yOD769uYybLfxhI2/view?usp=sharing)

<b>프론트엔드에서의 최대한의 기능을 구현하는 것을 목표로 프로젝트를 진행하였습니다 🙇🏻‍♀️ </b>

</div>


## 프로젝트 팀원

<div align="center">

|                   Frontend                   |                     Frontend                     |
| :------------------------------------------: | :----------------------------------------------: |
| ![](https://github.com/Ellsy23.png?size=120) | ![](https://github.com/heejung0413.png?size=120) |
|     [이준현](https://github.com/Ellsy23)     |     [임희정](https://github.com/heejung0413)     |

</div>


## 소개

- 저희는 음악회, 뮤지컬 등 다양한 티켓을 구매 할 수 있는 서비스를 구현합니다.<br />

<br />

### 1. 📌 목표

1. 메인페이지와 상세페이지에서 상품 정보 확인
2. 회원가입, 구매, 등의 필수 기능 구현

<br />

### 2. 👧🏻 페르소나

- 다양한 문화생활을 즐기고 싶은 20~30대
- 예술의 알고리즘을 탐구하는 사람들

<br />

## 📝 기능 정리

### 사용자 - 필수기능

- 회원가입 및 로그인(카카오)을 통해 회원 전용 서비스 이용
- 카테고리별 티켓 전체 조회 및 상세페이지 조회
- 특정 티켓에 대한 찜하기(WishList) 및 삭제하기
- 사용자 정보 조회, 정보 변경
- 결제하기 전) 1. 주문상품 확인 2. 주문자 정보 확인 3. 결제방법 선택
- 실시간 검색 기능

### 추가기능

- 모바일 사용자를 위한 반응형 페이지 제공
- 공용 헤더와 공용 푸터
- 로딩 스피너, 무한 스크롤, 스켈레톤UI, 페이지네이션 등 UI/UX
- 이미지 슬라이더(캐러셀)
- 티켓 포스터 이미지 확대/축소
- 사용자 프로필 이미지 업로더
- 에러처리 ErrorBoundary
  <br />

## ⚙ 기술 스택

### Front-end

<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/HTMLCSS.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/JavaScript.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/TypeScript.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/React.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/ReactQuery.png?raw=true" width="80">

</div>

### Tools

<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Github.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Figma.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/GatherTown.png?raw=true" width="80">

<br />

<br />


## 상세페이지 설명
### [메인 페이지 및 레이아웃]

- 이미지 캐러셀 형식으로 공공 데이터를 카드형식으로 보여집니다.
- 다크/라이트 모드가 가능합니다.
- 레이아웃은 헤더와 하단바가 있습니다.
- 반응형디자인입니다.
- 이미지 호버 시 tooltip UI 디자인이 보여집니다.  

| 메인페이지 |
| ---------- |



<br>


### [전체 페이지]

- 로딩 시 스패너 UI가 보여집니다.
- 최신/오래된 순으로 정렬이 가능합니다.
- 인피니티스크롤 기능이 적용되었습니다.
- 포스터에 마우스를 갖다대면 확대된 이미지로 보여집니다.

| 전체 페이지 |
| ---------- |
![tix - entire](https://github.com/geezers-io/Tix2U/assets/138123134/906a6e10-a657-4b3f-a1c1-5451e89aabae)



<br>


### [검색 페이지]

- useDeferredValue를 사용하여 사용자의 UX에 맞춰 실시간 검색이 가능합니다.

| 검색 페이지 |
| ---------- |
![tix-search](https://github.com/geezers-io/Tix2U/assets/138123134/7b7f28c3-fa16-4fb5-be3e-f8dd98a1233f)


<br>



### [로그인 및 회원가입 페이지]

- 카카오로그인이 가능합니다.
- 사용자가 아이디, 비밀번호를 입력하여야 '로그인'버튼이 활성화 됩니다.
- 아이디/비밀번호 찾기 페이지가 있습니다.
- 회원가입 페이지가 있습니다. 
  - formik 컴포넌트로 사용자의 입력을 제한할 수 있습니다.



| 로그인 및 회원가입 페이지 |
| ---------- |
![tix-login](https://github.com/geezers-io/Tix2U/assets/138123134/c625f45b-b8f1-4fb9-b847-c0cc3f8b828a)

<br>


### [마이 페이지]

- 프로필 이미지 변경이 가능합니다.
- 로그아웃 버튼을 누를 시 로그아웃 후 메인페이지로 이동합니다.
- "위시리스트 목록"을 누르면 사용자가 위시리스트에 등록한 티켓 정보들을 볼 수 있습니다.
- 사용자의 정보를 수정할 수 있는 모달창이 있습니다.


| 마이 페이지 |
| ---------- |
![tix-my](https://github.com/geezers-io/Tix2U/assets/138123134/1c82c817-ea72-4dc5-8156-fac7a285c4e5)


<br>


### [위시리스트 페이지]

- 하트 아이콘을 누르면 위시리스트에서 목록이 삭제 됩니다.
- 위시리스트에 정보가 없다면, 없다는 문구가 보여집니다.


| 위시리스트 페이지 |
| ---------- |
![tix-wish](https://github.com/geezers-io/Tix2U/assets/138123134/a0b37421-4203-4f90-925c-5c94bfc6f198)


<br>


### [상세 페이지]

- 상세 이미지가 보여집니다.
- 댓글 작성이 가능합니다.
  - 로그인이 되어있지 않거나 사용자 이름 정보가 없다면, 댓글작성이 불가합니다.
- '예매하기' ,'찜하기' 버튼이 있습니다.
  - 로그인이 되어있지 않다면, 접근 권한이 없습니다.
- 카카오맵 API를 연결해 지도 정보를 볼 수 있습니다.



| 상세 페이지 |
| ---------- |
![tix-detail](https://github.com/geezers-io/Tix2U/assets/138123134/958c8dc0-3004-434b-98c1-397ae85eb689)

<br>


### [주문 결제 페이지]

- 주문자의 성명, 전화번호, 이메일 주소 중 하나라도 정보를 입력하지 않다면 '결제라기'버튼이 비활성화됩니다.
- '결제하기'버튼을 누르면 모달창이 띄어져 사용자의 의사를 한번 더 물은 후, 결제 QR 페이지로 연결됩니다.



| 주문 결제 페이지 |
| ---------- |
![tix-detail](https://github.com/geezers-io/Tix2U/assets/138123134/958c8dc0-3004-434b-98c1-397ae85eb689)

<br>









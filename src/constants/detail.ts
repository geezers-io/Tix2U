type saleList = { title: string; content: { subtitle: string; subcontent: string } }[];
type payMethod = { title: string }[];
type simplePayMethod = { image: string; name: string; value: string }[];

export const ticketSale: saleList = [
  {
    title: '일반 할인',
    content: {
      subtitle: '청소년할인',
      subcontent: '청소년할인 15%',
    },
  },
  {
    title: '카드 할인',
    content: {
      subtitle: '비씨카드',
      subcontent: '문화생활 할인 20%',
    },
  },
];

export const payMethod: payMethod = [{ title: '카드결제' }, { title: '무통장 입금' }, { title: '휴대폰 결제' }];

export const simplePayMethod: simplePayMethod = [
  {
    image: '/public/pay/tosspay.png',
    name: '토스페이',
    value: 'toss',
  },

  {
    image: '/public/pay/kakaopay.png',
    name: '카카오페이',
    value: 'kakao',
  },

  {
    image: '/public/pay/naverpay.png',
    name: '네이버페이',
    value: 'naver',
  },
];

type saleList = { title: string; content: { subtitle: string; subcontent: string } }[];
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

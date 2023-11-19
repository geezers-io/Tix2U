const API_key = 'd63abe1d2f6a4a3690dc1b175020f06c';

export const ShowInfo = () => {
  fetch(
    `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${API_key}&stdate=20230601&eddate=20230630&cpage=1&rows=5`,
  )
    .then(data => data.json())
    .catch(err => console.error(err));
};

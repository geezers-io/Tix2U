import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { route, ...queryParams } = req.query as { route: string[] } & Record<string, string>;
  const destinationUrl = `http://kopis.or.kr/openApi/restful/${route.join('/')}`;

  try {
    const response = await axios({
      method: req.method,
      url: destinationUrl,
      headers: {
        ...req.headers,
        host: new URL(destinationUrl).host, // 'host' 헤더 설정
      },
      params: queryParams,
      data: req.method === 'GET' ? undefined : req.body,
    });

    console.log(destinationUrl);
    console.log(response.data);

    // 'abc.com'으로부터의 응답을 클라이언트에 전달합니다.
    res.status(response.status).send(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios 에러 처리
      const errResponse = error.response;
      res.status(errResponse?.status || 500).json(errResponse?.data || { error: 'Internal Server Error' });
    } else {
      // 그 외의 에러인 경우, 일반적인 서버 에러로 처리
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

import { AxiosError, AxiosResponse } from 'axios';
import converter from 'xml-js';
import { getErrorMessage } from '@/api/helper';
import { printErrorLog, printResponseLog } from '@/utils/log';
import { isPureObject } from '@/utils/object';

/*
  xml2js result example [RES BODY] {
    ...
    "dbs": {
      "db": [
        {
          "mt20id": "PF212930",
          "prfnm": {
            "_text": "최고의 사랑"
          },
          "prfpdfrom": {
            "_text": "2014.07.02"
          },
          "poster": {},
        },
        ...
      ]
    }
  }
*/
function extractXMLFieldValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(extractXMLFieldValue);
  if (!isPureObject(value)) return;
  if ('_text' in value) return value['_text'];
  if (Object.values(value)[0]) return extractXMLFieldValue(Object.values(value)[0]);
}
function processXMLData(data: unknown): Record<string, any> | Record<string, any>[] {
  if (Array.isArray(data)) {
    return data.map(processXMLData);
  }
  if (!isPureObject(data)) {
    console.warn('[processXMLData] data is not pure object:', data);
    return {};
  }
  return Object.entries(data).reduce(
    (acc, [key, rawValue]) => {
      const value = extractXMLFieldValue(rawValue);
      if (value) acc[key] = value;
      return acc;
    },
    {} as Record<string, any>,
  );
}
export function parseXMLResponse(response: AxiosResponse) {
  const xml = response.data;
  const obj = converter.xml2js(xml, { compact: true }) as Record<string, any>;
  response.data = processXMLData(obj.dbs.db);
  return response;
}

export function logResponse(response: AxiosResponse) {
  const { config, data } = response;

  printResponseLog({
    method: config?.method,
    endPoint: config?.url,
    responseObj: data?.data ?? data,
  });

  return response;
}

export function unwrapResponse(response: AxiosResponse) {
  return response.data;
}

export function logError(e: AxiosError) {
  const url = e.config?.url;
  const method = e.config?.method;

  const errorMessage = getErrorMessage(e);

  printErrorLog({
    method,
    endPoint: url,
    errorMessage,
    errorObj: e,
  });

  return Promise.reject(e);
}

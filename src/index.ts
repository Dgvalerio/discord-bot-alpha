// POST  HTTP/1.1
// Host:
// Connection: keep-alive
// Content-Length: 15
// Accept: application/json, text/javascript, */*; q=0.01
// X-Requested-With: XMLHttpRequest
// User-Agent: Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36
// Content-Type: application/x-www-form-urlencoded; charset=UTF-8
// Sec-GPC: 1
// Origin: https://luby-timesheet.azurewebsites.net
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty
// Referer: https://luby-timesheet.azurewebsites.net/Worksheet/Read
// Accept-Encoding: gzip, deflate, br
// Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7
// Cookie: ASP.NET_SessionId=pvx0vo5ud3n1s4103r1iuojz; __RequestVerificationToken=3Fpy0SdcOVR3qZAMTz0dcWYeHHAiqgX81R7issODGHNHHPIoGy8nt-WJNce9R7oe80weZC4uuCtZ_82aEDpqBTb2dOAEzQUxwLfItqtmimI1; ARRAffinity=7adbf14d8e75f98367e830cf2e4b1f04857993258b74780366c7f67db243f6f5; ec=388E06CBD6E29780017D72B0EAC75AB9FF227247C8DAE51F3022B46F4C251A75BD73BAB1CC13AA7B142081DD49C10B1A67CEAB76FC2A8D7BFFCA72FD1DB75D5285E985E4A769BC7F85B9CEEF7FEB110141B774853C7428E3F17FBC69B75E22C6FC2BF552C53FE15CCCA750785C5ED07A163671A10931543B31934F4E129F29624710A403FD7514F8D09D43215E1D412A6A64B25828D46EDA5756B5F37BA145EF

import axios from 'axios';

/**
 * @module Timesheet
 * */
class Timesheet {
  /**
   * ReadProject
   * */
  async readProject() {
    const response = await axios(
      'https://luby-timesheet.azurewebsites.net/Worksheet/ReadProject',
      {
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sec-gpc': '1',
          'x-requested-with': 'XMLHttpRequest',
          cookie:
            'ASP.NET_SessionId=pvx0vo5ud3n1s4103r1iuojz; __RequestVerificationToken=3Fpy0SdcOVR3qZAMTz0dcWYeHHAiqgX81R7issODGHNHHPIoGy8nt-WJNce9R7oe80weZC4uuCtZ_82aEDpqBTb2dOAEzQUxwLfItqtmimI1; ARRAffinity=7adbf14d8e75f98367e830cf2e4b1f04857993258b74780366c7f67db243f6f5; ec=388E06CBD6E29780017D72B0EAC75AB9FF227247C8DAE51F3022B46F4C251A75BD73BAB1CC13AA7B142081DD49C10B1A67CEAB76FC2A8D7BFFCA72FD1DB75D5285E985E4A769BC7F85B9CEEF7FEB110141B774853C7428E3F17FBC69B75E22C6FC2BF552C53FE15CCCA750785C5ED07A163671A10931543B31934F4E129F29624710A403FD7514F8D09D43215E1D412A6A64B25828D46EDA5756B5F37BA145EF',
          Referer: 'https://luby-timesheet.azurewebsites.net/Worksheet/Read',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        data: 'idcustomer=6151',
        method: 'POST',
      }
    );

    return response.data;
  }

  /**
   * ReadCategory
   * */
  async readCategory() {
    const response = await axios(
      'https://luby-timesheet.azurewebsites.net/Worksheet/ReadCategory',
      {
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sec-gpc': '1',
          'x-requested-with': 'XMLHttpRequest',
          cookie:
            'ASP.NET_SessionId=pvx0vo5ud3n1s4103r1iuojz; __RequestVerificationToken=3Fpy0SdcOVR3qZAMTz0dcWYeHHAiqgX81R7issODGHNHHPIoGy8nt-WJNce9R7oe80weZC4uuCtZ_82aEDpqBTb2dOAEzQUxwLfItqtmimI1; ARRAffinity=7adbf14d8e75f98367e830cf2e4b1f04857993258b74780366c7f67db243f6f5; ec=388E06CBD6E29780017D72B0EAC75AB9FF227247C8DAE51F3022B46F4C251A75BD73BAB1CC13AA7B142081DD49C10B1A67CEAB76FC2A8D7BFFCA72FD1DB75D5285E985E4A769BC7F85B9CEEF7FEB110141B774853C7428E3F17FBC69B75E22C6FC2BF552C53FE15CCCA750785C5ED07A163671A10931543B31934F4E129F29624710A403FD7514F8D09D43215E1D412A6A64B25828D46EDA5756B5F37BA145EF',
          Referer: 'https://luby-timesheet.azurewebsites.net/Worksheet/Read',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        data: 'idproject=15338',
        method: 'POST',
      }
    );

    return response.data;
  }

  /**
   * ReadProjectProgress
   * */
  async readProjectProgress() {
    const response = await axios(
      'https://luby-timesheet.azurewebsites.net/Worksheet/ReadProjectProgress',
      {
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sec-gpc': '1',
          'x-requested-with': 'XMLHttpRequest',
          cookie:
            'ASP.NET_SessionId=pvx0vo5ud3n1s4103r1iuojz; __RequestVerificationToken=3Fpy0SdcOVR3qZAMTz0dcWYeHHAiqgX81R7issODGHNHHPIoGy8nt-WJNce9R7oe80weZC4uuCtZ_82aEDpqBTb2dOAEzQUxwLfItqtmimI1; ARRAffinity=7adbf14d8e75f98367e830cf2e4b1f04857993258b74780366c7f67db243f6f5; ec=388E06CBD6E29780017D72B0EAC75AB9FF227247C8DAE51F3022B46F4C251A75BD73BAB1CC13AA7B142081DD49C10B1A67CEAB76FC2A8D7BFFCA72FD1DB75D5285E985E4A769BC7F85B9CEEF7FEB110141B774853C7428E3F17FBC69B75E22C6FC2BF552C53FE15CCCA750785C5ED07A163671A10931543B31934F4E129F29624710A403FD7514F8D09D43215E1D412A6A64B25828D46EDA5756B5F37BA145EF',
          Referer: 'https://luby-timesheet.azurewebsites.net/Worksheet/Read',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        data: 'idproject=15338',
        method: 'POST',
      }
    );

    return response.data;
  }
}

(async () => {
  const sheet = new Timesheet();

  const project = await sheet.readProject();
  const category = await sheet.readCategory();
  const projectProgress = await sheet.readProjectProgress();

  console.table(project);
  console.table(category);
  console.table(projectProgress);
})();

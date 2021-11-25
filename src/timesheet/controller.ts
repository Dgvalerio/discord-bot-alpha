import axios from 'axios';

/**
 * @module Timesheet
 * */
export class Timesheet {
  private axios = axios.create({
    baseURL: 'https://luby-timesheet.azurewebsites.net',
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
  });

  /**
   * Read
   * */
  async listClients() {
    const response = await this.axios.get('/Worksheet/Read');

    const html: string = response.data;

    const regex = /(name="IdCustomer">)([\w\W]+?)(<\/select>)/gm;

    const search: string = (html.match(regex) || [''])[0];

    const cleanedSearch = search.split(/\r\n/gm).join('');

    const values = cleanedSearch.match(/value="([\S\s]+?)??">([\S\s]+?)</g);

    return values!.map((o) => {
      const [value, content] = o
        .replace(/value="([\S\s]+?)??">([\S\s]+?)</g, '$1|$2')
        .split('|');

      return { value, content };
    });
  }

  /**
   * ReadProject
   * */
  async listProjects() {
    const response = await this.axios.post(
      '/Worksheet/ReadProject',
      'idcustomer=6151'
    );

    return response.data;
  }

  /**
   * ReadCategory
   * */
  async listCategories() {
    const response = await this.axios.post(
      '/Worksheet/ReadCategory',
      'idproject=15338'
    );

    return response.data;
  }

  /**
   * ReadProjectProgress
   * */
  async showProjectProgress() {
    const response = await this.axios.post(
      '/Worksheet/ReadProjectProgress',
      'idproject=15338'
    );

    return response.data;
  }
}

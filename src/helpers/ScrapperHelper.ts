import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import rp from 'request-promise'
import util from 'util'

export interface IProxyItem {
  ip: string;
  port: string;
}

export class ScrapperHelper {
  public static loadLocalHtml = async (location: string) => {
    const readFile = util.promisify(fs.readFile);
    return await readFile(path.join(__dirname, location), 'utf8');
  };

  public static crawlHtml = async (
    url: string,
    proxyItem?: IProxyItem | null,
    showProxyWarnings?: boolean
  ) => {
    let options = {};
    let proxiedRequest;

    try {
      if (proxyItem) {
        console.log(`Using proxy IP ${proxyItem.ip} - PORT ${proxyItem.port}`);
        proxiedRequest = rp.defaults({
          proxy: `http://${proxyItem.ip}:${proxyItem.port}`,
          strictSSL: false
        });

        // Check if proxy is really working
        // console.log('TEST RESULTS');
        // const test = await proxiedRequest('https://api.ipify.org?format=json');
        // console.log(test);

        const req = await proxiedRequest(url);

        return req;
      } else {
        if (showProxyWarnings) {
          console.log("🔥 WARNING - YOU'RE NOT USING A PROXY! 🔥");
        }

        const req = await rp(url);
        return req;
      }
    } catch (error) {
      console.error(error);
    }
  };

  public static fetchProxylist = async () => {
    console.log('Fetching proxy list...');

    const html = await ScrapperHelper.crawlHtml(
      'https://sslproxies.org/',
      null,
      false
    );

    const $ = cheerio.load(html);

    const proxyTableRows = $('#proxylisttable tbody tr');

    let proxyList: IProxyItem[] = [];

    proxyTableRows.each((i, el) => {
      const ip = $(el.children[0]).text();
      const port = $(el.children[1]).text();

      proxyList = [...proxyList, { ip, port }];
    });

    return proxyList;
  };

  public static rotateProxy = (proxyList: IProxyItem[]) => {
    return proxyList[Math.floor(Math.random() * proxyList.length)];
  };
}

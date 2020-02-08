import fs from 'fs'
import path from 'path'
import rp from 'request-promise'
import util from 'util'

export class ScrapperHelper {
  public static loadLocalHtml = async (location: string) => {
    const readFile = util.promisify(fs.readFile);
    return await readFile(path.join(__dirname, location), 'utf8');
  };

  public static crawlHtml = async (url: string) => {
    try {
      const req = await rp(url);
      return req;
    } catch (error) {
      console.error(error);
    }
  };
}

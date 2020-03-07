import cheerio from 'cheerio';

import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { IProxyItem, ScrapperHelper } from '../helpers/ScrapperHelper';


export class ScrapperESOlx {

  private static _name = "ScrapperESOlx"

  public static init = async (proxyItem: IProxyItem) => {

    console.log(`🤖 Initializing ${ScrapperESOlx._name} 🤖`);

    console.log('🤖: Fetching crawling links...');

    // const links = await ScrapperESOlx.crawlLinks(proxyItem);

    const link = 'https://es.olx.com.br/norte-do-espirito-santo/vagas-de-emprego/administrativo-725532180' //TODO: loop through all links

    console.log(`🤖: Scrapping data from ...${link}`);

    const post = await ScrapperESOlx.crawlPageData(proxyItem, link)

    console.log(post);






  };

  public static crawlLinks = async (proxyItem: IProxyItem): Promise<string[]> => {


    const html = await ScrapperHelper.crawlHtml(
      'https://es.olx.com.br/vagas-de-emprego',
      proxyItem
    );

    const $ = cheerio.load(html);

    const postList = $('.OLXad-list-link ')

    let links: string[] = []

    postList.each(function (i, el) {
      const link = $(el).attr('href')
      if (link) {
        links = [...links, link]
      }
    })

    return links;


  }

  public static crawlPageData = async (proxyItem: IProxyItem, link: string) => {

    const html = await ScrapperHelper.loadLocalHtml('../data/olx_auxiliar_servicos_gerais.html'); //TODO: change to fetch dynamic link


    const $ = cheerio.load(html);

    const title = $('[class="h3us20-5 heHIon"] h1').text()



    const zipCode = $('[class="h3us20-2 fMOiyI"] [data-testid="ad-properties"] div:first-child div dd').text()

    const neighborhood = $('[class="h3us20-2 fMOiyI"] [data-testid="ad-properties"] div:last-child div dd').text()

    const city = $('[class="h3us20-2 fMOiyI"] [data-testid="ad-properties"] div:nth-child(2) div dd').text()

    //TODO: use our database categories to infer the sector based in our rawArea!
    const rawArea = $('[class="h3us20-4 eowFbc"] + [data-testid="ad-properties"] div:nth-child(2) dd[class="sc-bZQynM sc-1f2ug0x-1 dPJyDS"]').text()


    let rawContent = $('[class="sc-bZQynM eEEnMS"]').text()

    // Remove garbage content
    rawContent = rawContent.replace('Fique atento com excessos de facilidades e desconfie de ofertas milagrosas.Cuidado com ofertas de emprego que solicitam o pagamento de uma taxa.Faça uma pesquisa sobre a empresa que está oferecendo a vaga.Fique atento com excessos de facilidades e desconfie de ofertas milagrosas.Cuidado com ofertas de emprego que solicitam o pagamento de uma taxa.', '')

    const complementaryData = DataExtractorHelper.extractJobData(rawContent)

    return {
      ...complementaryData,
      title,
      content: rawContent,
      externalUrl: link,
      zipCode,
      country: "Brazil",
      stateCode: "ES",
      city, //TODO: should be matched with database,
      neighborhood,
      sector: rawArea, //TODO: should be matched with database
      jobRoles: [], //TODO: fill based on title and content matches

    }




  }






}
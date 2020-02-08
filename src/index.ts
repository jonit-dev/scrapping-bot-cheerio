import express from 'express'

import { ScrapperEmpregosSaoPauloRegioes } from './helpers/ScrapperEmpregosSaoPauloRegioes'

const app = express();
const port = 3000;

// Scrapper ========================================

const initCrawlers = async () => {
  // const html = await ScrapeHelper.crawlHtml('../index.html');
  // let flags: Object[] = [];
  // $('#Languages a').each((i, element) => {
  //   const item = $(element).text();
  //   const href = $(element).attr('href');
  //   flags = [...flags, { [item]: href }];
  // });
  // console.log(flags);
  await ScrapperEmpregosSaoPauloRegioes.init();
};
initCrawlers();

// Express Routes ========================================

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

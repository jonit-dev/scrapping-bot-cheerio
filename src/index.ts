import express from 'express'

import { ScrapperHelper } from './helpers/ScrapperHelper'

const app = express();
const port = 3000;

// Scrapper ========================================

const initCrawlers = async () => {
  const proxyList = await ScrapperHelper.fetchProxylist();
  const chosenProxy = ScrapperHelper.rotateProxy(proxyList);
  console.log(chosenProxy);
  // await ScrapperEmpregosSaoPauloRegioes.init();
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

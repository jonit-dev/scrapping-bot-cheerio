import express from 'express'

import { ScrapperEmpregosSaoPauloRegioes } from './helpers/ScrapperEmpregosSaoPauloRegioes'
import { ScrapperHelper } from './helpers/ScrapperHelper'

const app = express();
const port = 3000;

// Scrapper ========================================

const initCrawlers = async () => {
  const proxyList = await ScrapperHelper.fetchProxylist();
  const chosenProxy = ScrapperHelper.rotateProxy(proxyList);

  await ScrapperEmpregosSaoPauloRegioes.init(chosenProxy);
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

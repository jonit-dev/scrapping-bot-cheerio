import express from 'express';

import { ScrapperHelper } from './helpers/ScrapperHelper';
import { ScrapperESOlx } from './scrappers/ScrapperESOlx';

const app = express();
const port = 3000;

// Scrapper ========================================

(async () => {
  const proxyList = await ScrapperHelper.fetchProxylist();
  const chosenProxy = ScrapperHelper.rotateProxy(proxyList);

  // await ScrapperEmpregosSaoPauloRegioes.init(chosenProxy);

  await ScrapperESOlx.init(chosenProxy)
})();
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

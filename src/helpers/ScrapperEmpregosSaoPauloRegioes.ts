import cheerio from 'cheerio'

import { ScrapperHelper } from './ScrapperHelper'

interface IPost {
  title: string;
  date: string;
  description: string;
  email: string;
}

export class ScrapperEmpregosSaoPauloRegioes extends ScrapperHelper {
  public static init = async () => {
    console.log('Initializing ScrapperEmpregosSaoPauloRegioes');

    const html = await ScrapperHelper.crawlHtml(
      'http://empregossaopauloeregioes.blogspot.com/'
    );

    const $ = cheerio.load(html);

    const posts = $('.post');

    const postsData: IPost[] = [];
    posts.each((i, el) => {
      const postTitle = $(el).find('.post-title');

      console.log(postTitle.text());

      const post: IPost = {
        title: postTitle.text(),
        date: 'date',
        description: 'some description',
        email: 'email@email.com'
      };
    });
  };
}

import cheerio from 'cheerio'

import { ScrapperHelper } from './ScrapperHelper'

interface IPost {
  title: string;
  date: string;
  description: string;
  email: string;
}

export class ScrapperEmpregosSaoPauloRegioes extends ScrapperHelper {
  private static _name = 'ScrapperEmpregosSaoPauloRegioes';

  public static init = async () => {
    console.log(`🤖 Initializing ${ScrapperEmpregosSaoPauloRegioes._name} 🤖`);

    const html = await ScrapperHelper.crawlHtml(
      'http://empregossaopauloeregioes.blogspot.com/'
    );

    const $ = cheerio.load(html);

    const posts = $('.post');

    let postsData: IPost[] = [];

    posts.each((i, el) => {
      const postTitle = $(el).find('.post-title');

      const post: IPost = {
        title: postTitle.text(),
        date: 'date',
        description: 'some description',
        email: 'email@email.com'
      };

      postsData = [...postsData, post];
    });

    console.log(postsData);
  };
}

import { GistBox } from 'gist-box';
import { getDoubanUserInfo, TitleMap, KeywordMap } from './douban';

const { GIST_ID, GITHUB_TOKEN, DOUBAN_ID } = process.env;

(async () => {
  try {
    if (!GITHUB_TOKEN || !GIST_ID || !DOUBAN_ID) throw Error('params error');

    const box = new GistBox({
      id: GIST_ID,
      token: GITHUB_TOKEN,
    });
    const detail = await getDoubanUserInfo(DOUBAN_ID);
    const lines = Object.keys(detail).map((type) => {
      const info = detail[type];
      const tile = TitleMap[type];
      const data = Object.keys(info).map((key) => `${info[key]} ${KeywordMap[type][key].slice(1)}`);
      return `${tile}：${data.join(' · ')}`;
    });
    await box.update({
      filename: 'douban.md',
      content: lines.join('  \n'),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();
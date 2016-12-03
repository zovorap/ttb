import { TtbPage } from './app.po';

describe('ttb App', function() {
  let page: TtbPage;

  beforeEach(() => {
    page = new TtbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

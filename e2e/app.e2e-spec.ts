import { WandererPage } from './app.po';

describe('wanderer App', function() {
  let page: WandererPage;

  beforeEach(() => {
    page = new WandererPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

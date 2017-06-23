import { FashionCloudTestPage } from './app.po';

describe('fashion-cloud-test App', function() {
  let page: FashionCloudTestPage;

  beforeEach(() => {
    page = new FashionCloudTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

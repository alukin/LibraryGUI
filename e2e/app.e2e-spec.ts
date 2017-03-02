import { LibraryGUIPage } from './app.po';

describe('library-gui App', () => {
  let page: LibraryGUIPage;

  beforeEach(() => {
    page = new LibraryGUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

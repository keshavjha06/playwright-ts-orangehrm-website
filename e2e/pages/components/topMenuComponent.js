class TopMenuComponent {
  page;
  constructor(page) {
    this.page = page;
  }
  topMenu = (menuName) => this.page.getByRole("link", { name: menuName });
  async selectTopMenuItem(menuItem) {
    await this.topMenu(menuItem).click();
  }
}
export default TopMenuComponent;

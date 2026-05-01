class LeftMenuComponent {
  page;
  constructor(page) {
    this.page = page;
  }
  menu = (menuName) => this.page.getByRole("link", { name: menuName });
  async selectLeftMenuItem(menuItem) {
    await this.menu(menuItem).click();
  }
}
export default LeftMenuComponent;

import LeftMenuComponent from "./components/leftMenuComponent";
import TopMenuComponent from "./components/topMenuComponent";
class HomePage {
  page;
  //left menu component and top menu component
  leftMenuComponent;
  topMenuComponent;
  constructor(page) {
    this.page = page;
    this.leftMenuComponent = new LeftMenuComponent(page);
    this.topMenuComponent = new TopMenuComponent(page);
  }
  getLeftMenuComponent() {
    return this.leftMenuComponent;
  }
  getTopMenuComponent() {
    return this.topMenuComponent;
  }
}
export default HomePage;

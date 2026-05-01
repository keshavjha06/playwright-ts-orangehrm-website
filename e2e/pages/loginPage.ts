import { Page } from "@playwright/test";
import HomePage from "./homePage";
import { Env } from "../frameworkConfig/env";

class LoginPage {
  constructor(private readonly page: Page) { }

  private declare userNameTextBox: ReturnType<Page["getByPlaceholder"]>;
  private declare passwordTextBox: ReturnType<Page["getByPlaceholder"]>;
  private declare loginButton: ReturnType<Page["getByRole"]>;

  async initialize() {
    this.userNameTextBox = this.page.getByPlaceholder("Username");
    this.passwordTextBox = this.page.getByPlaceholder("Password");
    this.loginButton = this.page.getByRole("button", {
      name: "Login",
    });
  }

  async visit() {
    await this.page.goto(Env.BASE_URL);
  }

  async login(username: string, password: string) {
    await this.initialize();
    await this.userNameTextBox.fill(username);
    await this.passwordTextBox.fill(password);
    await this.loginButton.click();
    return new HomePage(this.page);
  }
}

export default LoginPage;

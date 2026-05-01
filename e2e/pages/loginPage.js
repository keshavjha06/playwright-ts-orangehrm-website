import HomePage from "./homePage";
import { Env } from "../frameworkConfig/env";
class LoginPage {
    page;
    constructor(page) {
        this.page = page;
    }
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
    async login(username, password) {
        await this.initialize();
        await this.userNameTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
        return new HomePage(this.page);
    }
}
export default LoginPage;

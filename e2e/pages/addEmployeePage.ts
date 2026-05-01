import { Page } from "@playwright/test";
import { EmployeeDetails } from "../testdata/orangeHrmInterfaces";

class AddEmployeePage {
  constructor(private readonly page: Page) {}

  private firstNameTextBox!: ReturnType<Page["getByRole"]>;
  private lastNameTextBox!: ReturnType<Page["getByRole"]>;
  private middleNameTextBox!: ReturnType<Page["getByRole"]>;
  private idTextBox!: ReturnType<Page["locator"]>;
  private saveButton!: ReturnType<Page["getByRole"]>;
  public successMessage!: ReturnType<Page["getByText"]>;

  async initialize() {
    this.firstNameTextBox = this.page.getByRole("textbox", {
      name: "First Name",
    });
    this.lastNameTextBox = this.page.getByRole("textbox", {
      name: "Last Name",
    });
    this.middleNameTextBox = this.page.getByRole("textbox", {
      name: "Middle Name",
    });
    this.idTextBox = this.page.locator("form").getByRole("textbox").nth(4);
    this.saveButton = this.page.getByRole("button", { name: "Save" });
    this.successMessage = this.page.getByText(/Successfully Saved/i);
  }

  async addEmployee(employeeDetails: EmployeeDetails) {
    await this.initialize();
    await this.firstNameTextBox.fill(employeeDetails.firstName);
    await this.lastNameTextBox.fill(employeeDetails.lastName);
    await this.middleNameTextBox.fill(employeeDetails.middleName);
    await this.idTextBox.fill(employeeDetails.employeeId);
    await this.saveButton.click();
  }
}

export default AddEmployeePage;

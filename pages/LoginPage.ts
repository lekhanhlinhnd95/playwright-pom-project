import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator; // 1. Phải khai báo biến này ở đây

  constructor(page: Page) {
    super(page);
    
    // Sử dụng User-facing locators thay vì ID
    this.usernameInput = page.getByLabel('Username'); // Hoặc page.getByPlaceholder('Enter username')
    this.passwordInput = page.getByLabel('Password'); 
    this.loginButton = page.getByRole('button', { name: 'Login' }); 
    this.errorMessage = page.locator('#flash');// Tìm nút có tên hiển thị là "Login"
  }

  async login(username: string, pass: string) {
    await this.fillElement(this.usernameInput, username);
    await this.fillElement(this.passwordInput, pass);
    await this.clickElement(this.loginButton);
  }
  // Thêm hàm này để lấy text lỗi một cách an toàn
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }
}
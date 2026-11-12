import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SecurePage extends BasePage {
  readonly successMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    // Khởi tạo các locator trên trang Secure Area
    this.successMessage = page.locator('#flash');
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
  }

  // Hàm lấy nội dung thông báo thành công
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessage);
  }

  // Hàm thực hiện đăng xuất
  async logout() {
    await this.clickElement(this.logoutButton);
  }
}
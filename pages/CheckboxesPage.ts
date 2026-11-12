import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckboxesPage extends BasePage {
  // Khai báo các locator cho các checkbox trên trang
  readonly checkbox1: Locator;
  readonly checkbox2: Locator;

  constructor(page: Page) {
    super(page);
    // Trang này có 2 checkbox, ta dùng .nth(0) và .nth(1) để phân biệt
    this.checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    this.checkbox2 = page.locator('input[type="checkbox"]').nth(1);
  }

  // Hành động tích chọn checkbox 1
  async checkFirst() {
    await this.checkbox1.check();
  }

  // Hành động bỏ chọn checkbox 2
  async uncheckSecond() {
    await this.checkbox2.uncheck();
  }

  // Kiểm tra trạng thái checkbox 1 (trả về true nếu đã chọn, false nếu chưa)
  async isFirstChecked(): Promise<boolean> {
    return await this.checkbox1.isChecked();
  }

  // Kiểm tra trạng thái checkbox 2
  async isSecondChecked(): Promise<boolean> {
    return await this.checkbox2.isChecked();
  }
}
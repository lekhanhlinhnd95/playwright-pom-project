import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DropdownPage extends BasePage {
  readonly dropdownSelect: Locator;

  constructor(page: Page) {
    super(page);
    // Locator trỏ đến thẻ select trên trang
    this.dropdownSelect = page.locator('#dropdown');
  }

  // Chọn option dựa theo nhãn hiển thị (Visible Text) - ví dụ: 'Option 1', 'Option 2'
  async selectByOptionLabel(label: string) {
    await this.dropdownSelect.selectOption({ label: label });
  }

  // Chọn option dựa theo giá trị (Value attribute) - ví dụ: '1', '2'
  async selectByOptionValue(value: string) {
    await this.dropdownSelect.selectOption({ value: value });
  }

  // Lấy giá trị đang được chọn hiện tại trên dropdown
  async getSelectedOptionValue(): Promise<string> {
    return await this.dropdownSelect.inputValue();
  }
}
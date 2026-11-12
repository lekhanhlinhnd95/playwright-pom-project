import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TablesPage extends BasePage {
  readonly tableRows: Locator;

  constructor(page: Page) {
    super(page);
    this.tableRows = page.locator('#table1 tbody tr');
  }

  async getRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  async getEmailByRowIndex(index: number): Promise<string> {
    const row = this.tableRows.nth(index);
    const emailCell = row.locator('td').nth(2);
    return await emailCell.textContent() || '';
  }

  // Tìm số tiền (Due) dựa vào chính xác Cả Tên (First Name) và Họ (Last Name)
  async getDueByName(firstName: string, lastName: string): Promise<string> {
    const rowCount = await this.tableRows.count();
    
    for (let i = 0; i < rowCount; i++) {
      const row = this.tableRows.nth(i);
      const actualLastName = await row.locator('td').nth(0).textContent(); // Cột Last Name (cột 0)
      const actualFirstName = await row.locator('td').nth(1).textContent(); // Cột First Name (cột 1)
      
      // Kiểm tra khớp cả họ và tên
      if (actualLastName?.trim() === lastName && actualFirstName?.trim() === firstName) {
        return await row.locator('td').nth(3).textContent() || ''; // Cột Due (cột 3)
      }
    }
    return '';
  }
}
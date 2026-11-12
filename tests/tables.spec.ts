import { test, expect } from '@playwright/test';
import { TablesPage } from '../pages/TablesPage';

test.describe('Kiểm tra xử lý Bảng dữ liệu (Tables)', () => {

  test('Kiểm tra đọc dữ liệu từng dòng và tìm kiếm theo điều kiện', async ({ page }) => {
    const tablesPage = new TablesPage(page);
    await tablesPage.navigateTo('https://the-internet.herokuapp.com/tables');

    // 1. Kiểm tra tổng số dòng trong bảng phải bằng 4
    const rowCount = await tablesPage.getRowCount();
    expect(rowCount).toBe(4);

    // 2. Kiểm tra email của dòng đầu tiên (index 0)
    const firstEmail = await tablesPage.getEmailByRowIndex(0);
    expect(firstEmail).toBe('jsmith@gmail.com');

    // 3. Tìm số tiền (Due) của "Jason Doe" (Chính xác cả tên lẫn họ)
    const dueAmount = await tablesPage.getDueByName('Jason', 'Doe');
    expect(dueAmount).toBe('$100.00'); // Hoặc đổi tên thành 'John', 'Doe' nếu muốn kiểm tra người $50.00
  });

});
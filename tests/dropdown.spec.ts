import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/DropdownPage';

test('Kiểm tra tính năng chọn giá trị trong Dropdown', async ({ page }) => {
  const dropdownPage = new DropdownPage(page);

  // 1. Điều hướng đến trang Dropdown
  await dropdownPage.navigateTo('https://the-internet.herokuapp.com/dropdown');

  // 2. Chọn "Option 1" bằng cách truyền nhãn hiển thị
  await dropdownPage.selectByOptionLabel('Option 1');
  
  // 3. Kiểm tra xem giá trị thực tế đã đổi thành '1' chưa
  expect(await dropdownPage.getSelectedOptionValue()).toBe('1');

  // 4. Chọn "Option 2" bằng cách truyền giá trị '2'
  await dropdownPage.selectByOptionValue('2');

  // 5. Kiểm tra xem giá trị thực tế đã đổi thành '2' chưa
  expect(await dropdownPage.getSelectedOptionValue()).toBe('2');
});
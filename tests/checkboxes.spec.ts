import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../pages/CheckboxesPage';

test('Kiểm tra tính năng chọn và bỏ chọn Checkboxes', async ({ page }) => {
  const checkboxesPage = new CheckboxesPage(page);

  // 1. Điều hướng đến trang Checkboxes
  await checkboxesPage.navigateTo('https://the-internet.herokuapp.com/checkboxes');

  // 2. Kiểm tra trạng thái mặc định theo thiết kế của trang:
  // - Checkbox 1 mặc định chưa chọn (false)
  // - Checkbox 2 mặc định đã được chọn sẵn (true)
  expect(await checkboxesPage.isFirstChecked()).toBeFalsy();
  expect(await checkboxesPage.isSecondChecked()).toBeTruthy();

  // 3. Thực hiện thao tác: Tích chọn ô 1 và bỏ chọn ô 2
  await checkboxesPage.checkFirst();
  await checkboxesPage.uncheckSecond();

  // 4. Xác thực lại trạng thái sau khi thay đổi:
  // - Checkbox 1 bây giờ phải là đã chọn (true)
  // - Checkbox 2 bây giờ phải là chưa chọn (false)
  expect(await checkboxesPage.isFirstChecked()).toBeTruthy();
  expect(await checkboxesPage.isSecondChecked()).toBeFalsy();
});
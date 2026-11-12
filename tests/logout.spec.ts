import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SecurePage } from '../pages/SecurePage';

test('Kiểm tra tính năng đăng nhập thành công và đăng xuất (Logout)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const securePage = new SecurePage(page);

  // 1. Điều hướng đến trang Login
  await loginPage.navigateTo('https://the-internet.herokuapp.com/login');

  // 2. Thực hiện đăng nhập với tài khoản chuẩn
  await loginPage.login('tomsmith', 'SuperSecretPassword!');

  // 3. Xác thực đã vào được trang Secure Area thành công
  const successText = await securePage.getSuccessMessage();
  expect(successText).toContain('You logged into a secure area!');

  // 4. Thực hiện bấm nút Logout
  await securePage.logout();

  // 5. Xác thực đã quay trở lại trang Login và hiển thị thông báo logout thành công
  const logoutMessage = await loginPage.getErrorMessage();
  expect(logoutMessage).toContain('You logged out of the secure area!');
});
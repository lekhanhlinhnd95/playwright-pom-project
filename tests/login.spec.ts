import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// 1. Test case thành công (Happy Path)
test('Kiểm tra tính năng đăng nhập thành công', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('https://the-internet.herokuapp.com/login');
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});

// 2. Danh sách các bộ dữ liệu đăng nhập thất bại (Negative Test Scenarios)
const invalidLoginScenarios = [
  { username: 'sai_username', password: 'SuperSecretPassword!', desc: 'Sai tài khoản, đúng mật khẩu' },
  { username: 'tomsmith', password: 'sai_password', desc: 'Đúng tài khoản, sai mật khẩu' },
  { username: '', password: '', desc: 'Bỏ trống cả hai ô thông tin' }
];

// 3. Vòng lặp chạy các test case đăng nhập sai (ĐÃ ĐÓNG NGOẶC ĐÚNG CHỖ)
for (const scenario of invalidLoginScenarios) {
  test(`Kiểm tra đăng nhập thất bại khi: ${scenario.desc}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo('https://the-internet.herokuapp.com/login');
    await loginPage.login(scenario.username, scenario.password);

    const errorText = await loginPage.getErrorMessage();
    expect(errorText.length).toBeGreaterThan(0);
  });
} // <--- Đóng ngoặc vòng lặp for ở đây là chuẩn xác!

// 4. Test case cố tình đặt sai kỳ vọng để kiểm chứng kết quả Fail (Nằm ĐỘC LẬP bên ngoài vòng lặp)
test('Kiểm thử case giả lập Fail (cố tình mong đợi sai kết quả)', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo('https://the-internet.herokuapp.com/login');
  await loginPage.login('sai_tai_khoan', 'sai_mat_khau');

  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('You logged into a secure area!');
});
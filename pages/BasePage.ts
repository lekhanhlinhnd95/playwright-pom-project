import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page; // Tạo một biến nội bộ tên là page mang kiểu dữ liệu Page. Từ khóa readonly có nghĩa là "chỉ đọc" – giúp đảm bảo biến này không bị gán nhầm giá trị khác trong quá trình chạy code.
  constructor(page: Page) {
    this.page = page;//Đây là cánh cổng nhận thông tin. Khi bạn mở một trang web lên, Playwright sẽ tạo ra một đối tượng trình duyệt (page). Hàm này nhận đối tượng đó vào và lưu vào biến chung this.page để các hàm bên dưới có thể dùng chung mà không cần khai báo lại từ đầu.
  }

  // Hàm điều hướng URL chung
  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  // Hàm click an toàn
  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });//Cực kỳ quan trọng! Lệnh này bắt máy tính phải đứng lại chờ cho đến khi nút đó thực sự hiện lên trên màn hình rồi mới được bấm. Giúp tránh lỗi "bấm hụt" do mạng lag hoặc trang web chưa load kịp.
    await locator.click();
  }

  // Hàm điền input an toàn
  async fillElement(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }
  // Hàm lấy text an toàn
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent()) || '';
  }
}
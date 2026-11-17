import { test, expect } from '../../src/fixtures';
import { uniqueEmail } from '../../src/utils/userData';

  test('UI_009 contact us form', { tag: ['@regression'] }, async ({ contactPage }) => {
    await contactPage.open();
    await contactPage.fillForm({
      name: 'Test User',
      email: uniqueEmail(),
      subject: 'Automation framework smoke message',
      message: 'Sent by a Playwright test.'
    });
    await contactPage.submit();

    await expect(contactPage.successMessage).toContainText(/submitted successfully/i);
  });


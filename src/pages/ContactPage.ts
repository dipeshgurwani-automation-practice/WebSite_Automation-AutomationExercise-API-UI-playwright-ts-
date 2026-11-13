import { Locator, Page } from '@playwright/test';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactPage {
  readonly successMessage: Locator;
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly subjectInput: Locator;
  private readonly messageInput: Locator;
  private readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.successMessage = page.locator('.status.alert-success');
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageInput = page.locator('[data-qa="message"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');
  }

  async open(): Promise<void> {
    await this.page.goto('/contact_us');
  }

  async fillForm(data: ContactMessage): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
  }

  async submit(): Promise<void> {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.submitButton.click();
  }
}

import { Page, expect } from '@playwright/test'

export function createCheckoutActions(page: Page) {

  const terms = page.getByTestId('checkout-terms')

  const alerts = {
    name: page.getByText('Nome deve ter pelo menos 2 caracteres'),
    lastname: page.getByText('Sobrenome deve ter pelo menos 2 caracteres'),
    email: page.getByText('Email inválido'),
    phone: page.getByText('Telefone inválido'),
    document: page.getByText('CPF inválido'),
    store: page.getByRole('paragraph').filter({ hasText: 'Selecione uma loja' }),
    terms: page.getByText('Aceite os termos'),
  }

  return {

    elements: {
      terms,
      alerts
    },

    async expectLoaded() {
      await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
    },

    async expectSummaryTotal(price: string) {
      await expect(page.getByTestId('summary-total-price')).toHaveText(price)
    },

    async fillCustomerData(data: {
      name: string
      lastname?: string
      surname?: string
      email: string
      phone: string
      document?: string
      cpf?: string
    }) {
      const surname = data.lastname || data.surname || ''
      const cpf = data.document || data.cpf || ''

      await page.getByTestId('checkout-name').fill(data.name)
      
      const surnameField = page.getByTestId('checkout-surname')
      if (await surnameField.count() > 0) {
        await surnameField.fill(surname)
      } else {
        await page.getByTestId('checkout-lastname').fill(surname)
      }

      await page.getByTestId('checkout-email').fill(data.email)
      await page.getByTestId('checkout-phone').fill(data.phone)

      const cpfField = page.getByTestId('checkout-cpf')
      if (await cpfField.count() > 0) {
        await cpfField.fill(cpf)
      } else {
        await page.getByTestId('checkout-document').fill(cpf)
      }
    },

    async fillCustomerlData(data: any) {
      await this.fillCustomerData(data)
    },

    async selectStore(storeName: string) {
      await page.getByTestId('checkout-store').click()
      await page.getByRole('option', { name: storeName }).click()
    },

    async selectPaymentMethod(method: string) {
      await page.getByRole('button', { name: new RegExp(method, 'i') }).click()
    },

    async fillDownPayment(value: string) {
      await page.getByTestId('input-entry-value').fill(value)
    },

    async acceptTerms() {
      await page.getByTestId('checkout-terms').check()
    },

    async submit() {
      await page.getByRole('button', { name: 'Confirmar Pedido' }).click()
    },

    async expectResult(status: string) {
      await expect(page).toHaveURL(/\/success/)
      await expect(page.getByRole('heading', { name: status })).toBeVisible()
    }

  }
}

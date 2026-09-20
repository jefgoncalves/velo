import { test, expect } from '@playwright/test'

test.describe('Checkout - validações', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/order')
        await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
    })

    test('deve validar obrigatoriedade de todos os campos em branco', async ({ page }) => {
        const submit = page.getByRole('button', { name: 'Confirmar Pedido' })

        await submit.click()

        await expect(page.getByText('Nome deve ter pelo menos 2 caracteres', { exact: true })).toBeVisible()
        await expect(page.getByText('Sobrenome deve ter pelo menos 2 caracteres', { exact: true })).toBeVisible()
        await expect(page.getByText('Email inválido', { exact: true })).toBeVisible()
        await expect(page.getByText('Telefone inválido', { exact: true })).toBeVisible()
        await expect(page.getByText('CPF inválido', { exact: true })).toBeVisible()
        await expect(page.getByRole('paragraph').filter({ hasText: 'Selecione uma loja' })).toBeVisible()
        await expect(page.getByText('Aceite os termos', { exact: true })).toBeVisible()
    })

    test('deve validar limite mínimo de caracteres para Nome e Sobrenome', async ({ page }) => {
        const nome = page.getByTestId('checkout-name')
        const sobrenome = page.getByTestId('checkout-surname')
        const submit = page.getByRole('button', { name: 'Confirmar Pedido' })

        await nome.fill('A')
        await sobrenome.fill('B')
        await submit.click()

        await expect(page.getByText('Nome deve ter pelo menos 2 caracteres', { exact: true })).toBeVisible()
        await expect(page.getByText('Sobrenome deve ter pelo menos 2 caracteres', { exact: true })).toBeVisible()
    })

    test('deve exibir erro para e-mail com formato inválido', async ({ page }) => {
        const nome = page.getByTestId('checkout-name')
        const sobrenome = page.getByTestId('checkout-surname')
        const email = page.getByTestId('checkout-email')
        const submit = page.getByRole('button', { name: 'Confirmar Pedido' })

        await nome.fill('João')
        await sobrenome.fill('Silva')
        await email.fill('cliente@com')
        await submit.click()

        await expect(page.getByText('Email inválido', { exact: true })).toBeVisible()
    })

    test('deve exibir erro para CPF inválido', async ({ page }) => {
        const nome = page.getByTestId('checkout-name')
        const sobrenome = page.getByTestId('checkout-surname')
        const email = page.getByTestId('checkout-email')
        const telefone = page.getByTestId('checkout-phone')
        const submit = page.getByRole('button', { name: 'Confirmar Pedido' })

        await nome.fill('João')
        await sobrenome.fill('Silva')
        await email.fill('joao.silva@email.com')
        await telefone.fill('(11) 99999-9999')
        await submit.click()

        await expect(page.getByText('CPF inválido', { exact: true })).toBeVisible()
    })

    test('deve exigir o aceite dos termos ao finalizar com dados válidos', async ({ page }) => {
        const email = page.getByTestId('checkout-email')
        const telefone = page.getByTestId('checkout-phone')
        const cpf = page.getByTestId('checkout-cpf')
        const loja = page.getByTestId('checkout-store')
        const termos = page.getByTestId('checkout-terms')
        const submit = page.getByRole('button', { name: 'Confirmar Pedido' })

        const termsAlert = page.locator('//label[@for="terms"]/following-sibling::p')

        // Arrange
        await email.fill('joao.silva@email.com')
        await telefone.fill('(11) 99999-9999')
        await cpf.fill('529.982.247-25')
        await loja.click()
        await page.getByRole('option', { name: /Velô Paulista/ }).click()

        await expect(termos).not.toBeChecked() // Premissa inicial

        // Act
        await submit.click()

        // Assert
        await expect(termsAlert).toHaveText('Aceite os termos')
    })
})

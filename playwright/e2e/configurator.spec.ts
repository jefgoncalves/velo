import { test, expect } from '../support/fixtures'

test.describe('Configuração do Veículo', () => {
    test.beforeEach(async ({ app }) => {
        await app.configurator.open()
    })

    test('deve atualizar a imagem externa do veículo ao selecionar diferentes cores', async ({ app }) => {
        // Estado inicial padrão (Glacier Blue)
        await app.configurator.validateExteriorImage('glacier-blue', 'aero')

        await app.configurator.selectColor('midnight-black')
        await app.configurator.validateExteriorImage('midnight-black', 'aero')

        await app.configurator.selectColor('lunar-white')
        await app.configurator.validateExteriorImage('lunar-white', 'aero')

        await app.configurator.selectColor('glacier-blue')
        await app.configurator.validateExteriorImage('glacier-blue', 'aero')
    })

    test('deve recalcular o preço total e atualizar a imagem do veículo ao alternar as rodas', async ({ app }) => {
        // Estado inicial (Aero Wheels inclusas no valor base de R$ 40.000,00)
        await app.configurator.validateExteriorImage('glacier-blue', 'aero')
        await app.configurator.validateTotalPrice(/40\.000/)

        await app.configurator.selectWheel('sport')
        await app.configurator.validateExteriorImage('glacier-blue', 'sport')
        await app.configurator.validateTotalPrice(/42\.000/)

        await app.configurator.selectWheel('aero')
        await app.configurator.validateExteriorImage('glacier-blue', 'aero')
        await app.configurator.validateTotalPrice(/40\.000/)
    })

    test('deve atualizar o preço dinamicamente ao adicionar e remover opcionais e persistir no checkout (CT03)', async ({ app, page }) => {
        // Estado inicial sem opcionais (Preço base: R$ 40.000,00)
        await app.configurator.validateTotalPrice(/40\.000/)

        // 1. Marcar "Precision Park" (+ R$ 5.500 -> R$ 45.500,00)
        await app.configurator.toggleOptional('precision-park')
        await app.configurator.validateTotalPrice(/45\.500/)

        // 2. Marcar "Flux Capacitor" (+ R$ 5.000 -> R$ 50.500,00)
        await app.configurator.toggleOptional('flux-capacitor')
        await app.configurator.validateTotalPrice(/50\.500/)

        // 3. Desmarcar os opcionais e verificar retorno ao preço base
        await app.configurator.toggleOptional('precision-park')
        await app.configurator.validateTotalPrice(/45\.000/)

        await app.configurator.toggleOptional('flux-capacitor')
        await app.configurator.validateTotalPrice(/40\.000/)

        // 4. Selecionar opcionais e clicar em "Monte o Seu" (Checkout)
        await app.configurator.toggleOptional('precision-park')
        await app.configurator.toggleOptional('flux-capacitor')
        await app.configurator.validateTotalPrice(/50\.500/)

        await app.configurator.goToCheckout()
        await expect(page).toHaveURL(/\/order/)
        await expect(page.getByTestId('summary-total-price')).toHaveText(/50\.500/)
    })
})

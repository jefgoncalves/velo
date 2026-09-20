import { test } from '../support/fixtures'

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
})

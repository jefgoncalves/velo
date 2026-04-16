import { test, expect } from '@playwright/test';
import { generateOrderNumber } from '../support/helpers'
import { exec } from 'child_process';
import { OrderLookupPage } from '../support/pages/OrderLookupPage';

// AAA - Arrange - Act - Assert
// Arrange - Preparar o teste
// Act - Executar o teste
// Assert - Verificar o resultado


test.describe('Consulta Pedido', () => {

    test.beforeEach(async ({ page }) => {
        // Arrange - Preparar o teste
        //Checkpoints verificar se esta passado pela pagin principal
        await page.goto('http://localhost:5173/');
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

        //checkpoints verificar se esta na pagina de consulta de pedido
        await page.getByRole('link', { name: 'Consultar Pedido' }).click();
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    })

    test('deve consultar um pedido aprovado', async ({ page }) => {

        // Test data
        // const orderNumber = 'VLO-IPBA1D';

        const orderNumber = {
            number: 'VLO-IPBA1D',
            status: 'APROVADO',
            color: 'Midnight Black',
            whells: 'sport Wheels',
            customer: {
                name: 'Jef Goncalves',
                email: 'jefgoncalvs@velo.dev'
            },
            payment: 'À Vista'
        }

        // Act - Executar o teste


        const orderLookupPage = new OrderLookupPage(page);
        await orderLookupPage.searchOrder(orderNumber.number);

        const containerPedido = page
            .getByTestId(`order-result-${orderNumber.number}`)
            .locator('p')
            .filter({ hasText: /^Pedido$/ })
            .locator('..');

        // Assert - Verificar o resultado
        // await expect(containerPedido).toContainText(numeroPedido, { timeout: 10_000 });
        // await expect(page.getByText('APROVADO')).toBeVisible();
        // await expect(page.getByText('APROVADO')).toContainText('APROVADO');

        await expect(page.getByTestId(`order-result-${orderNumber.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${orderNumber.number}
            - status:
                - img
                - text: ${orderNumber.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${orderNumber.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${orderNumber.whells}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${orderNumber.customer.name}
            - paragraph: Email
            - paragraph: ${orderNumber.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${orderNumber.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByRole('status').filter({ hasText: orderNumber.status });
        await expect(statusBadge).toHaveClass(/bg-green-100/);
        await expect(statusBadge).toHaveClass(/text-green-700/);

        await expect(statusBadge.getByTestId('status-icon-aprovado')).toBeVisible();

    });

    test('deve consultar um pedido reprovado', async ({ page }) => {

        // Test data
        // const orderNumber = 'VLO-GXP8JD';

        const orderNumber = {
            number: 'VLO-GXP8JD',
            status: 'REPROVADO',
            color: 'Midnight Black',
            whells: 'sport Wheels',
            customer: {
                name: 'Joao Silva',
                email: 'joaosilva@mailinator.com'
            },
            payment: 'À Vista'
        }

        // Act - Executar o teste
        const orderLookupPage = new OrderLookupPage(page);
        await orderLookupPage.searchOrder(orderNumber.number);

        const containerPedido = page
            .getByTestId(`order-result-${orderNumber.number}`)
            .locator('p')
            .filter({ hasText: /^Pedido$/ })
            .locator('..');

        // Assert - Verificar o resultado
        // await expect(containerPedido).toContainText(numeroPedido, { timeout: 10_000 });
        // await expect(page.getByText('APROVADO')).toBeVisible();
        // await expect(page.getByText('APROVADO')).toContainText('APROVADO');

        await expect(page.getByTestId(`order-result-${orderNumber.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${orderNumber.number}
            - status:
                - img
                - text: ${orderNumber.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${orderNumber.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${orderNumber.whells}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${orderNumber.customer.name}
            - paragraph: Email
            - paragraph: ${orderNumber.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${orderNumber.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByRole('status').filter({ hasText: orderNumber.status });
        await expect(statusBadge).toHaveClass(/bg-red-100/);
        await expect(statusBadge).toHaveClass(/text-red-700/);

        await expect(statusBadge.getByTestId('status-icon-reprovado')).toBeVisible();

    });

    test('deve consultar um pedido em analise', async ({ page }) => {

        // Test data
        // const orderNumber = 'VLO-WFGVT4';

        const orderNumber = {
            number: 'VLO-WFGVT4',
            status: 'EM_ANALISE',
            color: 'Glacier Blue',
            whells: 'aero Wheels',
            customer: {
                name: 'jose Joao',
                email: 'josesilva@velo.dev'
            },
            payment: 'À Vista'
        }

        // Act - Executar o teste
        const orderLookupPage = new OrderLookupPage(page);
        await orderLookupPage.searchOrder(orderNumber.number);

        const containerPedido = page
            .getByTestId(`order-result-${orderNumber.number}`)
            .locator('p')
            .filter({ hasText: /^Pedido$/ })
            .locator('..');

        // Assert - Verificar o resultado
        // await expect(containerPedido).toContainText(numeroPedido, { timeout: 10_000 });
        // await expect(page.getByText('APROVADO')).toBeVisible();
        // await expect(page.getByText('APROVADO')).toContainText('APROVADO');

        await expect(page.getByTestId(`order-result-${orderNumber.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${orderNumber.number}
            - status:
                - img
                - text: ${orderNumber.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${orderNumber.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${orderNumber.whells}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${orderNumber.customer.name}
            - paragraph: Email
            - paragraph: ${orderNumber.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${orderNumber.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByRole('status').filter({ hasText: orderNumber.status });
        await expect(statusBadge).toHaveClass(/bg-amber-100/);
        await expect(statusBadge).toHaveClass(/text-amber-700/);

        await expect(statusBadge.getByTestId('status-icon-em-analise')).toBeVisible();

    });

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
        // Test data
        const orderNumber = generateOrderNumber();

        // Act - Executar o teste
        const orderLookupPage = new OrderLookupPage(page);
        await orderLookupPage.searchOrder(orderNumber);

        const containerPedido = page
            .getByTestId(`order-result-${orderNumber}`)
            .locator('p')
            .filter({ hasText: /^Pedido$/ })
            .locator('..');

        await expect(page.locator('#root')).toMatchAriaSnapshot(`
            - img
            - heading "Pedido não encontrado" [level=3]
            - paragraph: Verifique o número do pedido e tente novamente`);

    });

});


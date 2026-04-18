import { test } from '@playwright/test';
import { generateOrderCode } from '../support/helpers';
import { Navbar } from '../support/components/navbar';
import { LandingPage } from '../support/pages/LandingPage';
import { OrderLockupPage, OrderDetails } from  '../support/pages/OrderLookupPage';

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

    let orderLockupPage: OrderLockupPage;

    test.beforeEach(async ({ page }) => {

        await new LandingPage(page).goto();
        await new Navbar(page).orderLockupLink();
        orderLockupPage = new OrderLockupPage(page);
        await new OrderLockupPage(page).validatePageLoaded();
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {

        // Test Data
        const order: OrderDetails = {
            number: 'VLO-IPBA1D',
            status: 'APROVADO',
            color: 'Midnight Black',
            wheels: 'sport Wheels', 
            customer: {
                name: 'Jef Goncalves',
                email: 'jefgoncalvs@velo.dev'
            },
            payment: 'À Vista'
        };

        await orderLockupPage.searchOrder(order.number);
        await orderLockupPage.validadeOrderDetails(order);
        await orderLockupPage.validateStatusBadge(order.status);
    })

    test('deve consultar um pedido reprovado', async ({ page }) => {

        // Test Data
        const order: OrderDetails = {
            number: 'VLO-GXP8JD',
            status: 'REPROVADO',
            color: 'Midnight Black',
            wheels: 'sport Wheels',
            customer: {
                name: 'Joao Silva',
                email: 'joaosilva@mailinator.com'
            },
            payment: 'À Vista'
        };

        await orderLockupPage.searchOrder(order.number);
        await orderLockupPage.validadeOrderDetails(order);
        await orderLockupPage.validateStatusBadge(order.status);
    })

    test('deve consultar um pedido em analise', async ({ page }) => {

        // Test Data
        const order: OrderDetails = {
            number: 'VLO-WFGVT4',
            status: 'EM_ANALISE',
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'jose Joao',
                email: 'josesilva@velo.dev'
            },
            payment: 'À Vista'
        }

        // Act  
        const orderLockupPage = new OrderLockupPage(page)
        await orderLockupPage.searchOrder(order.number)

        // Assert
        await orderLockupPage.validadeOrderDetails(order)
        await orderLockupPage.validateStatusBadge(order.status)
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
        const order = generateOrderCode();
        await orderLockupPage.searchOrder(order);
        await orderLockupPage.validadeOrderNotFound();
    })

    test('deve exibir mensagem quando o pedido em qualquer formato não é encontrado' , async ({ page }) => {
        await orderLockupPage.searchOrder("abc123");
        await orderLockupPage.validadeOrderNotFound();
    })
})
import { test, expect } from '@playwright/test';

// AAA - Arrange - Act - Assert
// Arrange - Preparar o teste
// Act - Executar o teste
// Assert - Verificar o resultado

test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Arrange - Preparar o teste
  //Checkpoints verificar se esta passado pela pagin principal
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();

  //checkpoints verificar se esta na pagina de consulta de pedido
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act - Executar o teste
  await page.getByTestId('search-order-id').click();
  await page.getByTestId('search-order-id').fill('VLO-IPBA1D');
  await page.getByTestId('search-order-button').click();

  // Assert - Verificar o resultado
  await expect(page.getByTestId('order-result-id')).toBeVisible;
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-IPBA1D');
  await expect(page.getByTestId('order-result-status')).toBeVisible;
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});
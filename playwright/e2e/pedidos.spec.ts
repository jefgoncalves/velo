import { test, expect } from '@playwright/test';

// AAA - Arrange - Act - Assert
// Arrange - Preparar o teste
// Act - Executar o teste
// Assert - Verificar o resultado

test('deve consultar um pedido aprovado', async ({ page }) => {
  
  // Arrange - Preparar o teste
  //Checkpoints verificar se esta passado pela pagin principal
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  //checkpoints verificar se esta na pagina de consulta de pedido
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act - Executar o teste
  const campoNumeroPedido = page.getByRole('textbox', { name: 'Número do Pedido' });
  await campoNumeroPedido.fill('VLO-IPBA1D');
  const numeroPedido = await campoNumeroPedido.inputValue();
  await page.getByRole('button', { name: 'Buscar Pedido' }).dblclick();


  await expect(page.getByText('Pedido', { exact: true })).toBeVisible();
  await expect(page.getByText(numeroPedido)).toBeVisible();
  
// Assert - Verificar o resultado

    await expect(page.getByText('APROVADO')).toBeVisible();
    await expect(page.getByText('APROVADO')).toContainText('APROVADO');
});
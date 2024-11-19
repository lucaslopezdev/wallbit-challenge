import { test, expect } from '@playwright/test'

test('Add Product to Cart', async ({ page }) => {
  // Navegar a la página principal
  await page.goto('http://localhost:5173/')

  // Agregar un producto al carrito
  await page.getByPlaceholder('Cantidad').fill('1')
  await page.getByPlaceholder('ID del Producto').fill('1')
  await page.getByRole('button', { name: 'Agregar', exact: true }).click()

  // Verificar que el producto fue agregado al carrito
  await page
    .getByRole('row', { name: '1 Fjallraven - Foldsack No. 1' })
    .getByRole('button')
    .nth(1)
    .click()

  // Verificar encabezado del carrito
  const header = await page.getByRole('heading', { name: 'Carrito de compra' })
  expect(header).toContainText('Iniciado')

  // Verificar botón de limpiar carrito
  const clearCartButton = await page.getByRole('button', {
    name: 'Limpiar Carrito',
  })
  expect(clearCartButton).toBeVisible()

  // Limpiar el carrito
  await clearCartButton.click()

  // Verificar carrito vacío
  const emptyCart = await page.getByText('No hay productos en el carro')
  expect(emptyCart).toBeDefined()
})

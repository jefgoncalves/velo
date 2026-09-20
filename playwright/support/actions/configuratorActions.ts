import { Page, expect } from '@playwright/test'

export type ExteriorColorId = 'glacier-blue' | 'midnight-black' | 'lunar-white'
export type WheelTypeId = 'aero' | 'sport'
export type OptionalId = 'precision-park' | 'flux-capacitor'

export function createConfiguratorActions(page: Page) {
  const carImage = page.getByTestId('car-exterior-image')
  const totalPrice = page.getByTestId('total-price')
  const checkoutButton = page.getByRole('button', { name: 'Monte o Seu' })

  return {
    elements: {
      carImage,
      totalPrice,
      checkoutButton,
    },

    async open() {
      await page.goto('/configure')
      await expect(page.getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
    },

    async selectColor(colorId: ExteriorColorId) {
      await page.getByTestId(`color-option-${colorId}`).click()
    },

    async selectWheel(wheelType: WheelTypeId) {
      await page.getByTestId(`wheel-option-${wheelType}`).click()
    },

    async toggleOptional(optionalId: OptionalId) {
      await page.getByTestId(`opt-${optionalId}`).click()
    },

    async goToCheckout() {
      await checkoutButton.click()
    },

    async validateExteriorImage(colorId: ExteriorColorId, wheelType: WheelTypeId) {
      await expect(carImage).toHaveAttribute(
        'alt',
        `Velô Sprint - ${colorId} with ${wheelType} wheels`,
      )
    },

    async validateTotalPrice(pattern: RegExp) {
      await expect(totalPrice).toHaveText(pattern)
    },
  }
}

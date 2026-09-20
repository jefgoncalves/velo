import { test as base } from '@playwright/test'

import { createConfiguratorActions } from './actions/configuratorActions'
import { createOrderLookupActions } from './actions/orderLookupActions'

type App = {
  configurator: ReturnType<typeof createConfiguratorActions>
  orderLookup: ReturnType<typeof createOrderLookupActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      configurator: createConfiguratorActions(page),
      orderLookup: createOrderLookupActions(page),
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(app) 
  },
})

export { expect } from '@playwright/test'
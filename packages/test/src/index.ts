import { logger } from '@4lch4/logger'
import Configstore from 'configstore'
import {cosmiconfig} from 'cosmiconfig'

const moduleName = 'test-package'

const cfgStore = new Configstore(moduleName)
const cosmic = cosmiconfig(moduleName)

const cfgStoreTest = async () => {
  try {
    // Display all config options
    const all = cfgStore.all

    cfgStore.clear()
    cfgStore.delete('tmp')
    cfgStore.get('tmp')
    cfgStore.has('tmp')

    const cfgPath = cfgStore.path

    cfgStore.set('tmp', 'value')

    const cfgItemCount = cfgStore.size

    logger.debug(`all: ${JSON.stringify(all, null, 2)}`)
    logger.debug(`cfgPath: ${cfgPath}`)
    logger.debug(`cfgItemCount: ${cfgItemCount}`)

    logger.debug(`Finished cfgStoreTest()...`)
  } catch (error) {
    logger.error('Error in cfgStoreTest():')
    logger.error(error)
  }
}

const cosmicTest = async () => {
  try {
    // Lets you load a specific config file.
    const loadRes = await cosmic.load('test.json')

    logger.debug(`loadRes?.isEmpty = ${loadRes?.isEmpty}`)
    logger.debug(`loadRes?.filepath = ${loadRes?.filepath}`)
    logger.debug(
      `loadRes?.config = ${JSON.stringify(loadRes?.config, null, 2)}`
    )

    // Starts a search for the config file, you can provide a path for the starting point.
    const searchRes = await cosmic.search()

    logger.debug(`searchRes?.isEmpty = ${searchRes?.isEmpty}`)
    logger.debug(`searchRes?.filepath = ${searchRes?.filepath}`)
    logger.debug(
      `searchRes?.config = ${JSON.stringify(searchRes?.config, null, 2)}`
    )

    logger.debug(`Finished cosmicTest()...`)
  } catch (error) {
    logger.error('Error in cfgStoreTest():')
    logger.error(error)
  }
}

cfgStoreTest()
  .then(cosmicTest)
  .then(() => {
    logger.debug('Finished test-package.ts')
  })
  .catch(err => {
    logger.error('Error in test-package.ts:')
    logger.error(err)
  })

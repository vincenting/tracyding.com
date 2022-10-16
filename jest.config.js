// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

const config = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer']
}

module.exports = createJestConfig(config)

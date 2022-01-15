module.exports = {
  setupFiles: ['<rootDir>/__test__/setupTests.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: { '^.+\\.(css|less)$': '<rootDir>/__test__/CSSconfig.js' },
  rootDir: './',
}

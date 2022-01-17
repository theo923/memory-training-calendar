module.exports = {
  setupFiles: ['<rootDir>/__test__/setupTests.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/__test__/CSSconfig.js',
    'public-ip': '<rootDir>/__test__/PublicIPconfig.js',
  },
  rootDir: './',
}

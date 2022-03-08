module.exports = {
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.(js)?$': 'babel-jest',
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@Components/(.*)$': '<rootDir>/src/javascript/components/$1',
    '^@Global/(.*)$': '<rootDir>/src/javascript/global/$1',
    '^@Test/(.*)$': '<rootDir>/test/$1',
  },
  testMatch: ['<rootDir>/**/*.test.(js)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

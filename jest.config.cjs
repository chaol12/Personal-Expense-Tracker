module.exports = {
    collectCoverage: true,
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.ts', '.jsx'],
    collectCoverageFrom: [
        '**src/**/*.{js,ts,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
    moduleNameMapper: {
      ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
    },
    setupFiles: ["jest-canvas-mock", '<rootDir>/src/setupTests']
  };
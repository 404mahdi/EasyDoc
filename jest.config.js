module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  // Exclude React app tests to avoid JSX parsing issues
  testPathIgnorePatterns: ["/node_modules/", "/client/"],
};

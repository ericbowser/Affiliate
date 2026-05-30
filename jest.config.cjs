/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setupTests.js"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@react-google-maps|react-markdown|remark-gfm|remark-parse|remark-rehype|rehype-react|unified|bail|is-plain-obj|trough|vfile|unist-util|mdast-util|micromark|decode-named-character-reference|character-entities|property-information|hast-util|hastscript|comma-separated-tokens|space-separated-tokens|trim-lines|devlop)/)",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__mocks__/",
    "/setupTests.js",
  ],
  moduleNameMapper: {
    "\\.md\\?raw$": "<rootDir>/src/__tests__/__mocks__/rawMock.js",
    "\\.(css|less|scss|sass)$": "<rootDir>/src/__tests__/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/src/__tests__/__mocks__/fileMock.js",
  },
};

module.exports = config;

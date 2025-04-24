/** @type {import('jest').Config} */
module.exports = {
    collectCoverageFrom: ["js/*"],
    modulePathIgnorePatterns: ["jest.config.js", "webpack.config.js", "tango.main.js"]
};

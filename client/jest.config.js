module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-native-vector-icons|@react-navigation|@react-native|@unimodules|expo|react-native-safe-area-context)',
  ],
};

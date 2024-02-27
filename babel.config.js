module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
        },
      ],
      [
        "rewrite-require",
        {
          aliases: {
            crypto: "crypto-browserify",
            stream: "stream-browserify",
          },
        },
      ],
      [
        "transform-inline-environment-variables",
        {
          exclude: [
            "EXPO_ROUTER_APP_ROOT",
            "EXPO_ROUTER_PROJECT_ROOT",
            "EXPO_ROUTER_IMPORT_MODE",
            "EXPO_ROUTER_IMPORT_MODE_ANDROID",
            "EXPO_ROUTER_IMPORT_MODE_IOS",
            "EXPO_ROUTER_IMPORT_MODE_WEB",
          ],
        },
      ],
    ],
  };
};

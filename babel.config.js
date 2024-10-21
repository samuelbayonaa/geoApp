module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv", // Elimina el espacio aquí
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
    ],
  };
};

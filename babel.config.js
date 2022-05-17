module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    //"presets": [["es2015", { "modules": false }]],es2015报错
    ["@babel/preset-env", { "modules": false }]
  ],
  "plugins": [
      //解决报错Uncaught ReferenceError: regeneratorRuntime is not defined
      '@babel/plugin-transform-runtime',
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      },
    ]
  ],


}

const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    // modifyVars: { '@base-color': '#607D8B' }
  })
);

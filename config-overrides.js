module.exports = function override(config, env) {
  // Remove source-map-loader from the webpack config
  config.module.rules = config.module.rules.filter(
    rule => !rule.enforce && (!rule.oneOf || !rule.oneOf.some(one => one.loader && one.loader.includes('source-map-loader')))
  );
  
  // Also check oneOf rules
  config.module.rules.forEach(rule => {
    if (rule.oneOf) {
      rule.oneOf = rule.oneOf.filter(
        one => !one.loader || !one.loader.includes('source-map-loader')
      );
    }
  });
  
  return config;
};

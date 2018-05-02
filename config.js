/*
  * Create and export configuration variables
  * 
*/

// Container for all the enviornments 
var environments = {};

// Staging default enviornment 
environments.staging = {
  'port' : 8888,
  'envName' : 'staging'
};

// Production enviornment 
environments.production = {
  'port' : 9999,
  'envName' : 'production'
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the env above, if not, default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;
// globalTestSetup.js

// Global setup function
module.exports = async () => {
    console.log('Global setup: Performing common setup tasks...');
  
    console.log('Global setup: Common setup tasks completed.');
  
    // Return a Promise to signal completion of global setup
    return Promise.resolve();
  };
  
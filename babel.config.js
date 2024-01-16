module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [                                                                                                                                                         
        'module-resolver',                                                                                                        
        {                                                                                                                                                
          root: ["./src/"],                                                                                                                              
          alias: {                                                                                                                                        
            assets: "./src/assets",                                                                                      
            components: "./src/components",   
            constants: "./src/constants",                                                                                                              
            helper: "./src/helper",                                                                                                                  
            middlewares: "./src/middlewares",                                                                                                              
            navigations: "./src/navigations",                                                                                                        
            scences: "./src/scences",     
            utils: "./src/utils",                                                                                                                    
            styles: "./src/styles",                                                                                                                    
          },                                                                                                                                             
          extensions: [".js", ".jsx", ".tsx", ".ios.js", ".android.js"],                                                                                        
        },                                                                                                                                                      
      ],  
    ],
  };
};

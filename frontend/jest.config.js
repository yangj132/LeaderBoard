module.exports = {
    
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.vue$': 'vue-jest',  
        '^.+\\.jsx?$': 'babel-jest'
    },
  };
  
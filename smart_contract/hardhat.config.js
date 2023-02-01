

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity : '0.8.4', // solidity version of smart contract
  networks : {
    goerli : {
      url :"https://eth-goerli.g.alchemy.com/v2/ALCHEMY_API_KEY", // alchemy url for the deployment of smart contract
      accounts : [''] //private key
    }
  }
}


module.exports = {
  networks: {
    mainnet: {
      // Don't put your private key here:
      privateKey: "53076c7454baa2d5658499e39ce7cddb334dad9b2cca5ed77f14a48482c8f4a5",
      /*
Create a .env file (it must be gitignored) containing something like

  export PRIVATE_KEY_MAINNET=4E7FEC...656243

Then, run the migration with:

  source .env && tronbox migrate --network mainnet

      */
      userFeePercentage: 100,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://api.trongrid.io',
      network_id: '1'
    },
    shasta: {
      privateKey: "53076c7454baa2d5658499e39ce7cddb334dad9b2cca5ed77f14a48482c8f4a5",
      userFeePercentage: 100,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://api.shasta.trongrid.io',
      network_id: '2'
    },
    nile: {
      privateKey: "4268cc1a0c2cc2d5f6101228340f2852cde62619338159c08485cfd28291d57d",
      userFeePercentage: 100,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://nile.trongrid.io',
      network_id: '3'
    },
    development: {
      // For tronbox/tre docker image
      privateKey: '4268cc1a0c2cc2d5f6101228340f2852cde62619338159c08485cfd28291d57d',
      userFeePercentage: 0,
      feeLimit: 1000 * 1e6,
      fullHost: 'http://127.0.0.1:9090',
      network_id: '9'
    },
    compilers: {
      solc: {
        version: '0.8.20'
      }
    }
  },
  // solc compiler optimize
  solc: {
  //   optimizer: {
  //     enabled: true,
  //     runs: 200
  //   },
  //   evmVersion: 'istanbul'
  }
}





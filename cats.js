const Web3 = require('web3');
const {contractABI, contractAddress} = require('./contract')
require('dotenv').config()

const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURAID}`);

const address = process.env.WALLETPUBLIC;
const pvtKey = process.env.WALLETPRIVATE;

const receiverAddress = process.env.WALLETPUBLIC

const Contract = new web3.eth.Contract(contractABI, contractAddress);
const gasLimit = 300000;
const gasPrice = '150'

const wrappedIDs = [];
d
(async () => {
    const tx = {
        from: address,
        to: contractAddress,
        gasPrice: web3.utils.toHex(web3.utils.toWei(gasPrice, 'gwei')),
        gas: gasLimit,
        data: Contract.methods.multi721Deposit(wrappedIDs, receiverAddress).encodeABI()
    }

    const signedTx = await web3.eth.accounts.signTransaction(tx, pvtKey);
    const sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
})()

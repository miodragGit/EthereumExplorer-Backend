const fetch = require('node-fetch');
const Web3 = require('web3');
const EthDater = require('ethereum-block-by-date');
const ganache = require('ganache-cli');

let url = 'https://mainnet.infura.io/v3/9eccaa80d73b4c9ab11afda7a3b14c35';

let web3 = new Web3(url);

const dater = new EthDater(web3);

const getTransactionsForAddressFromBlockNumber = async (address, blockNumber) => {
    
    let transactions;

    await fetch('https://api.etherscan.io/api?module=account&action=txlist&address='+ address +'&startblock=0&endblock='+ blockNumber +'&sort=asc&apikey=C7MZSCTPGFZZJPFVTXQPJ8WB7C9Y12CJWQ')
    .then(res => res.json())
    .then(json => { transactions = json });

    return transactions;
}

const getEthBlanceForAddressAtGivenTime_Option1 = async (dateString, address) => {
    
    var date = new Date('2016-07-20T13:20:40Z');
    var seconds = date.getTime() / 1000;    

    let blockNumber;
    await fetch('https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp='+ seconds +'&closest=before&apikey=C7MZSCTPGFZZJPFVTXQPJ8WB7C9Y12CJWQ')
    .then(res => res.json())
    .then(json => { blockNumber = json.result });

    let ethAmount;
    await fetch('https://api.etherscan.io/api?module=account&action=balancehistory&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&blockno='+ blockNumber +'&apikey=C7MZSCTPGFZZJPFVTXQPJ8WB7C9Y12CJWQ')
    .then(res => res.json())
    .then(json => { ethAmount = json.result });

    return ethAmount;
}

const getEthBlanceForAddressAtGivenTime_Option2 = async (date) => {
    
    let block = await dater.getDate(date);

    return block.block;
}

exports.getTransactionsForAddressFromBlockNumber = getTransactionsForAddressFromBlockNumber;
exports.getEthBlanceForAddressAtGivenTime_Option1 = getEthBlanceForAddressAtGivenTime_Option1;
exports.getEthBlanceForAddressAtGivenTime_Option2 = getEthBlanceForAddressAtGivenTime_Option2;
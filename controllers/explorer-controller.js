const fetch = require('node-fetch');

const HttpError = require('../models/http-error');
const explorerService = require('../services/explorer-service');

const getTransactionsForAddressFromBlockNumber = async (req, res, next) => {

    let transactions;
    try {
        transactions = await explorerService.getTransactionsForAddressFromBlockNumber(req.params.address, req.params.number)
    }
    catch (err){
        const error = new HttpError('Something went wrong.', 500);    
        return next(error);
    }

    if (!transactions || transactions.length === 0){
        const error = new HttpError('Not found.', 404);
        return next(error);
    }

    res.json(transactions);
}

const getEthBlanceForAddressAtGivenTime = async (req, res, next) => {
    console.log(req.params)
    let blockNumber;
    try {
        blockNumber = await explorerService.getEthBlanceForAddressAtGivenTime_Option2(req.params.date)
    }
    catch (err){
        const error = new HttpError('Something went wrong.', 500);    
        return next(error);
    }

    res.json(blockNumber);
}

exports.getTransactionsForAddressFromBlockNumber = getTransactionsForAddressFromBlockNumber;
exports.getEthBlanceForAddressAtGivenTime = getEthBlanceForAddressAtGivenTime;
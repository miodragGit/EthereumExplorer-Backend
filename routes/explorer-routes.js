const express = require('express');

const explorerController = require('../controllers/explorer-controller');

const router = express.Router();

router.get('/wallet/:address/blockNumber/:number', explorerController.getTransactionsForAddressFromBlockNumber);

router.get('/balance/:date', explorerController.getEthBlanceForAddressAtGivenTime);

module.exports = router;
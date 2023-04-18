const PROVIDER = new ethers.providers.Web3Provider(window.ethereum)
const SIGNER = PROVIDER.getSigner()

// var fs = require('fs');
// var jsonFile = "pathToYourJSONFile/project.json";
// var parsed= JSON.parse(fs.readFileSync(jsonFile));
// var abi = parsed.abi;


// TODO : Test abi import via JSON file
// const { abi } = require('./abi/optimism_perp_vault_proxy.json')

// console.log(abi)

// TODO
// dYdX (ajout/retrait de marge) : https://dydxprotocol.github.io/v3-teacher/#perpetual-contracts
// Velodrome (Unstake + Withdraw LP) : https://docs.velodrome.finance/security#contract-addresses
// Gearbox (ajout de marge) : https://docs.gearbox.finance/traders-and-farmers/credit-account-dashboard-overview/kak-ne-byt-rekt
// Liquity (ajout de marge coffre + check collat ratio (recovery mode ?) + rembourser dette + cloturer coffre) : https://docs.liquity.org/documentation/resources

// Contracts
const ABIS = {
    OPTIMISM: {
        PERP_VAULT_PROXY: '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BadDebtSettled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"clearingHouse","type":"address"}],"name":"ClearingHouseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":true,"internalType":"address","name":"collateralToken","type":"address"},{"indexed":true,"internalType":"address","name":"liquidator","type":"address"},{"indexed":false,"internalType":"uint256","name":"collateral","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"repaidSettlementWithoutInsuranceFundFeeX10_S","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"insuranceFundFeeX10_S","type":"uint256"},{"indexed":false,"internalType":"uint24","name":"discountRatio","type":"uint24"}],"name":"CollateralLiquidated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"collateralManager","type":"address"}],"name":"CollateralManagerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"collateralToken","type":"address"},{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trustedForwarder","type":"address"}],"name":"TrustedForwarderChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"trustedForwarder","type":"address"}],"name":"TrustedForwarderUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"WETH9","type":"address"}],"name":"WETH9Changed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"collateralToken","type":"address"},{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"candidate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositEther","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"depositEtherFor","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAccountBalance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getAccountValue","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getBalance","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"getBalanceByToken","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClearingHouse","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClearingHouseConfig","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCollateralManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCollateralMmRatio","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getCollateralTokens","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getExchange","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getFreeCollateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"uint24","name":"ratio","type":"uint24"}],"name":"getFreeCollateralByRatio","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"getFreeCollateralByToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInsuranceFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"settlementX10_S","type":"uint256"}],"name":"getLiquidatableCollateralBySettlement","outputs":[{"internalType":"uint256","name":"collateral","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getMarginRequirementForCollateralLiquidation","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"getMaxRepaidSettlementAndLiquidatableCollateral","outputs":[{"internalType":"uint256","name":"maxRepaidSettlementX10_S","type":"uint256"},{"internalType":"uint256","name":"maxLiquidatableCollateral","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"collateral","type":"uint256"}],"name":"getRepaidSettlementByCollateral","outputs":[{"internalType":"uint256","name":"settlementX10_S","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSettlementToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getSettlementTokenValue","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTrustedForwarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"insuranceFundArg","type":"address"},{"internalType":"address","name":"clearingHouseConfigArg","type":"address"},{"internalType":"address","name":"accountBalanceArg","type":"address"},{"internalType":"address","name":"exchangeArg","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"isLiquidatable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isDenominatedInSettlementToken","type":"bool"}],"name":"liquidateCollateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"clearingHouseArg","type":"address"}],"name":"setClearingHouse","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"collateralManagerArg","type":"address"}],"name":"setCollateralManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trustedForwarderArg","type":"address"}],"name":"setTrustedForwarder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"WETH9Arg","type":"address"}],"name":"setWETH9","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"settleBadDebt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"versionRecipient","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"withdrawAll","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAllEther","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]',
        PERP_CLEARINGHOUSE_PROXY: '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegateApproval","type":"address"}],"name":"DelegateApprovalChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":true,"internalType":"address","name":"baseToken","type":"address"},{"indexed":false,"internalType":"int256","name":"fundingPayment","type":"int256"}],"name":"FundingPaymentSettled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":true,"internalType":"address","name":"baseToken","type":"address"},{"indexed":true,"internalType":"address","name":"quoteToken","type":"address"},{"indexed":false,"internalType":"int24","name":"lowerTick","type":"int24"},{"indexed":false,"internalType":"int24","name":"upperTick","type":"int24"},{"indexed":false,"internalType":"int256","name":"base","type":"int256"},{"indexed":false,"internalType":"int256","name":"quote","type":"int256"},{"indexed":false,"internalType":"int128","name":"liquidity","type":"int128"},{"indexed":false,"internalType":"uint256","name":"quoteFee","type":"uint256"}],"name":"LiquidityChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":true,"internalType":"address","name":"baseToken","type":"address"},{"indexed":false,"internalType":"int256","name":"exchangedPositionSize","type":"int256"},{"indexed":false,"internalType":"int256","name":"exchangedPositionNotional","type":"int256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"},{"indexed":false,"internalType":"int256","name":"openNotional","type":"int256"},{"indexed":false,"internalType":"int256","name":"realizedPnl","type":"int256"},{"indexed":false,"internalType":"uint256","name":"sqrtPriceAfterX96","type":"uint256"}],"name":"PositionChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":true,"internalType":"address","name":"baseToken","type":"address"},{"indexed":false,"internalType":"int256","name":"closedPositionSize","type":"int256"},{"indexed":false,"internalType":"int256","name":"closedPositionNotional","type":"int256"},{"indexed":false,"internalType":"int256","name":"openNotional","type":"int256"},{"indexed":false,"internalType":"int256","name":"realizedPnl","type":"int256"},{"indexed":false,"internalType":"uint256","name":"closedPrice","type":"uint256"}],"name":"PositionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":true,"internalType":"address","name":"baseToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"positionNotional","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"positionSize","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidationFee","type":"uint256"},{"indexed":false,"internalType":"address","name":"liquidator","type":"address"}],"name":"PositionLiquidated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"ReferredPositionChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"forwarder","type":"address"}],"name":"TrustedForwarderChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"trustedForwarder","type":"address"}],"name":"TrustedForwarderUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"components":[{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"},{"internalType":"int24","name":"lowerTick","type":"int24"},{"internalType":"int24","name":"upperTick","type":"int24"},{"internalType":"uint256","name":"minBase","type":"uint256"},{"internalType":"uint256","name":"minQuote","type":"uint256"},{"internalType":"bool","name":"useTakerBalance","type":"bool"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct IClearingHouse.AddLiquidityParams","name":"params","type":"tuple"}],"name":"addLiquidity","outputs":[{"components":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"internalType":"struct IClearingHouse.AddLiquidityResponse","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"cancelAllExcessOrders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"bytes32[]","name":"orderIds","type":"bytes32[]"}],"name":"cancelExcessOrders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"candidate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"},{"internalType":"uint256","name":"oppositeAmountBound","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"internalType":"struct IClearingHouse.ClosePositionParams","name":"params","type":"tuple"}],"name":"closePosition","outputs":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAccountBalance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getAccountValue","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClearingHouseConfig","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDelegateApproval","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getExchange","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInsuranceFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOrderBook","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getQuoteToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTrustedForwarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUniswapV3Factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"clearingHouseConfigArg","type":"address"},{"internalType":"address","name":"vaultArg","type":"address"},{"internalType":"address","name":"quoteTokenArg","type":"address"},{"internalType":"address","name":"uniV3FactoryArg","type":"address"},{"internalType":"address","name":"exchangeArg","type":"address"},{"internalType":"address","name":"accountBalanceArg","type":"address"},{"internalType":"address","name":"insuranceFundArg","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"int256","name":"positionSize","type":"int256"}],"name":"liquidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"liquidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"bool","name":"isBaseToQuote","type":"bool"},{"internalType":"bool","name":"isExactInput","type":"bool"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"oppositeAmountBound","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"internalType":"struct IClearingHouse.OpenPositionParams","name":"params","type":"tuple"}],"name":"openPosition","outputs":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"components":[{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"bool","name":"isBaseToQuote","type":"bool"},{"internalType":"bool","name":"isExactInput","type":"bool"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"oppositeAmountBound","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"internalType":"struct IClearingHouse.OpenPositionParams","name":"params","type":"tuple"}],"name":"openPositionFor","outputs":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"quitMarket","outputs":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"int24","name":"lowerTick","type":"int24"},{"internalType":"int24","name":"upperTick","type":"int24"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"minBase","type":"uint256"},{"internalType":"uint256","name":"minQuote","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct IClearingHouse.RemoveLiquidityParams","name":"params","type":"tuple"}],"name":"removeLiquidity","outputs":[{"components":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"}],"internalType":"struct IClearingHouse.RemoveLiquidityResponse","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegateApprovalArg","type":"address"}],"name":"setDelegateApproval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"settleAllFunding","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Owed","type":"uint256"},{"internalType":"uint256","name":"amount1Owed","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"uniswapV3MintCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"amount0Delta","type":"int256"},{"internalType":"int256","name":"amount1Delta","type":"int256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"uniswapV3SwapCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"versionRecipient","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}]',
    },
    ARBITRUM: {
        LYRA_OPTIONMARKET: '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"}],"name":"AlreadyInitialised","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BaseTransferFailed","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"BoardAlreadySettled","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"boardId","type":"uint256"},{"internalType":"uint256","name":"boardExpiry","type":"uint256"},{"internalType":"uint256","name":"currentTime","type":"uint256"}],"name":"BoardExpired","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"BoardIsFrozen","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"BoardNotExpired","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"BoardNotFrozen","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"}],"name":"CannotRecoverQuote","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"enum OptionMarket.NonZeroValues","name":"valueType","type":"uint8"}],"name":"ExpectedNonZeroValue","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"InvalidBoardId","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"currentTime","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"maxBoardExpiry","type":"uint256"}],"name":"InvalidExpiryTimestamp","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"components":[{"internalType":"uint256","name":"maxBoardExpiry","type":"uint256"},{"internalType":"address","name":"securityModule","type":"address"},{"internalType":"uint256","name":"feePortionReserved","type":"uint256"},{"internalType":"uint256","name":"staticBaseSettlementFee","type":"uint256"}],"internalType":"struct OptionMarket.OptionMarketParameters","name":"optionMarketParams","type":"tuple"}],"name":"InvalidOptionMarketParams","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"strikeId","type":"uint256"}],"name":"InvalidStrikeId","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"address","name":"caller","type":"address"},{"internalType":"address","name":"nominatedOwner","type":"address"}],"name":"OnlyNominatedOwner","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"address","name":"caller","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"OnlyOwner","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"address","name":"caller","type":"address"},{"internalType":"address","name":"securityModule","type":"address"}],"name":"OnlySecurityModule","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"QuoteTransferFailed","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"strikesLength","type":"uint256"},{"internalType":"uint256","name":"skewsLength","type":"uint256"}],"name":"StrikeSkewLengthMismatch","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"totalCost","type":"uint256"},{"internalType":"uint256","name":"minCost","type":"uint256"},{"internalType":"uint256","name":"maxCost","type":"uint256"}],"name":"TotalCostOutsideOfSpecifiedBounds","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"iterations","type":"uint256"},{"internalType":"uint256","name":"expectedAmount","type":"uint256"},{"internalType":"uint256","name":"tradeAmount","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"}],"name":"TradeIterationsHasRemainder","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"boardId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseIv","type":"uint256"}],"name":"BoardBaseIvSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"boardId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"expiry","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseIv","type":"uint256"},{"indexed":false,"internalType":"bool","name":"frozen","type":"bool"}],"name":"BoardCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"boardId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"frozen","type":"bool"}],"name":"BoardFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"boardId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"spotPriceAtExpiry","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalUserLongProfitQuote","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBoardLongCallCollateral","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBoardLongPutCollateral","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalAMMShortCallProfitBase","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalAMMShortCallProfitQuote","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalAMMShortPutProfitQuote","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"longScaleFactor","type":"uint256"}],"name":"BoardSettled","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"uint256","name":"maxBoardExpiry","type":"uint256"},{"internalType":"address","name":"securityModule","type":"address"},{"internalType":"uint256","name":"feePortionReserved","type":"uint256"},{"internalType":"uint256","name":"staticBaseSettlementFee","type":"uint256"}],"indexed":false,"internalType":"struct OptionMarket.OptionMarketParameters","name":"optionMarketParams","type":"tuple"}],"name":"OptionMarketParamsSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"securityModule","type":"address"},{"indexed":false,"internalType":"uint256","name":"quoteAmount","type":"uint256"}],"name":"SMClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"boardId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"strikeId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"strikePrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"skew","type":"uint256"}],"name":"StrikeAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"strikeId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"skew","type":"uint256"}],"name":"StrikeSkewSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":true,"internalType":"uint256","name":"positionId","type":"uint256"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"components":[{"internalType":"uint256","name":"strikeId","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"enum OptionMarket.OptionType","name":"optionType","type":"uint8"},{"internalType":"enum OptionMarket.TradeDirection","name":"tradeDirection","type":"uint8"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"setCollateralTo","type":"uint256"},{"internalType":"bool","name":"isForceClose","type":"bool"},{"internalType":"uint256","name":"spotPrice","type":"uint256"},{"internalType":"uint256","name":"reservedFee","type":"uint256"},{"internalType":"uint256","name":"totalCost","type":"uint256"}],"indexed":false,"internalType":"struct OptionMarket.TradeEventData","name":"trade","type":"tuple"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"uint256","name":"optionPriceFee","type":"uint256"},{"internalType":"uint256","name":"spotPriceFee","type":"uint256"},{"components":[{"internalType":"int256","name":"preTradeAmmNetStdVega","type":"int256"},{"internalType":"int256","name":"postTradeAmmNetStdVega","type":"int256"},{"internalType":"uint256","name":"vegaUtil","type":"uint256"},{"internalType":"uint256","name":"volTraded","type":"uint256"},{"internalType":"uint256","name":"NAV","type":"uint256"},{"internalType":"uint256","name":"vegaUtilFee","type":"uint256"}],"internalType":"struct OptionMarketPricer.VegaUtilFeeComponents","name":"vegaUtilFee","type":"tuple"},{"components":[{"internalType":"uint256","name":"varianceFeeCoefficient","type":"uint256"},{"internalType":"uint256","name":"vega","type":"uint256"},{"internalType":"uint256","name":"vegaCoefficient","type":"uint256"},{"internalType":"uint256","name":"skew","type":"uint256"},{"internalType":"uint256","name":"skewCoefficient","type":"uint256"},{"internalType":"uint256","name":"ivVariance","type":"uint256"},{"internalType":"uint256","name":"ivVarianceCoefficient","type":"uint256"},{"internalType":"uint256","name":"varianceFee","type":"uint256"}],"internalType":"struct OptionMarketPricer.VarianceFeeComponents","name":"varianceFee","type":"tuple"},{"internalType":"uint256","name":"totalFee","type":"uint256"},{"internalType":"uint256","name":"totalCost","type":"uint256"},{"internalType":"uint256","name":"volTraded","type":"uint256"},{"internalType":"uint256","name":"newBaseIv","type":"uint256"},{"internalType":"uint256","name":"newSkew","type":"uint256"}],"indexed":false,"internalType":"struct OptionMarketPricer.TradeResult[]","name":"tradeResults","type":"tuple[]"},{"components":[{"internalType":"address","name":"rewardBeneficiary","type":"address"},{"internalType":"address","name":"caller","type":"address"},{"internalType":"uint256","name":"returnCollateral","type":"uint256"},{"internalType":"uint256","name":"lpPremiums","type":"uint256"},{"internalType":"uint256","name":"lpFee","type":"uint256"},{"internalType":"uint256","name":"liquidatorFee","type":"uint256"},{"internalType":"uint256","name":"smFee","type":"uint256"},{"internalType":"uint256","name":"insolventAmount","type":"uint256"}],"indexed":false,"internalType":"struct OptionMarket.LiquidationEventData","name":"liquidation","type":"tuple"},{"indexed":false,"internalType":"uint256","name":"longScaleFactor","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Trade","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"amountCollateral","type":"uint256"}],"name":"addCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"},{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"uint256","name":"skew","type":"uint256"}],"name":"addStrikeToBoard","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"baseAsset","outputs":[{"internalType":"contract IERC20Decimals","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"boardToPriceAtExpiry","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"strikeId","type":"uint256"},{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"iterations","type":"uint256"},{"internalType":"enum OptionMarket.OptionType","name":"optionType","type":"uint8"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"setCollateralTo","type":"uint256"},{"internalType":"uint256","name":"minTotalCost","type":"uint256"},{"internalType":"uint256","name":"maxTotalCost","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"internalType":"struct OptionMarket.TradeInputParameters","name":"params","type":"tuple"}],"name":"closePosition","outputs":[{"components":[{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"totalCost","type":"uint256"},{"internalType":"uint256","name":"totalFee","type":"uint256"}],"internalType":"struct OptionMarket.Result","name":"result","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"baseIV","type":"uint256"},{"internalType":"uint256[]","name":"strikePrices","type":"uint256[]"},{"internalType":"uint256[]","name":"skews","type":"uint256[]"},{"internalType":"bool","name":"frozen","type":"bool"}],"name":"createOptionBoard","outputs":[{"internalType":"uint256","name":"boardId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"strikeId","type":"uint256"},{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"iterations","type":"uint256"},{"internalType":"enum OptionMarket.OptionType","name":"optionType","type":"uint8"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"setCollateralTo","type":"uint256"},{"internalType":"uint256","name":"minTotalCost","type":"uint256"},{"internalType":"uint256","name":"maxTotalCost","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"internalType":"struct OptionMarket.TradeInputParameters","name":"params","type":"tuple"}],"name":"forceClosePosition","outputs":[{"components":[{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"totalCost","type":"uint256"},{"internalType":"uint256","name":"totalFee","type":"uint256"}],"internalType":"struct OptionMarket.Result","name":"result","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"forceSettleBoard","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"getBoardAndStrikeDetails","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"iv","type":"uint256"},{"internalType":"bool","name":"frozen","type":"bool"},{"internalType":"uint256[]","name":"strikeIds","type":"uint256[]"}],"internalType":"struct OptionMarket.OptionBoard","name":"","type":"tuple"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"uint256","name":"skew","type":"uint256"},{"internalType":"uint256","name":"longCall","type":"uint256"},{"internalType":"uint256","name":"shortCallBase","type":"uint256"},{"internalType":"uint256","name":"shortCallQuote","type":"uint256"},{"internalType":"uint256","name":"longPut","type":"uint256"},{"internalType":"uint256","name":"shortPut","type":"uint256"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"internalType":"struct OptionMarket.Strike[]","name":"","type":"tuple[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"getBoardStrikes","outputs":[{"internalType":"uint256[]","name":"strikeIds","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLiveBoards","outputs":[{"internalType":"uint256[]","name":"_liveBoards","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumLiveBoards","outputs":[{"internalType":"uint256","name":"numLiveBoards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"getOptionBoard","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"iv","type":"uint256"},{"internalType":"bool","name":"frozen","type":"bool"},{"internalType":"uint256[]","name":"strikeIds","type":"uint256[]"}],"internalType":"struct OptionMarket.OptionBoard","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOptionMarketParams","outputs":[{"components":[{"internalType":"uint256","name":"maxBoardExpiry","type":"uint256"},{"internalType":"address","name":"securityModule","type":"address"},{"internalType":"uint256","name":"feePortionReserved","type":"uint256"},{"internalType":"uint256","name":"staticBaseSettlementFee","type":"uint256"}],"internalType":"struct OptionMarket.OptionMarketParameters","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"strikeId","type":"uint256"}],"name":"getSettlementParameters","outputs":[{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"uint256","name":"priceAtExpiry","type":"uint256"},{"internalType":"uint256","name":"strikeToBaseReturned","type":"uint256"},{"internalType":"uint256","name":"longScaleFactor","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"strikeId","type":"uint256"}],"name":"getStrike","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"uint256","name":"skew","type":"uint256"},{"internalType":"uint256","name":"longCall","type":"uint256"},{"internalType":"uint256","name":"shortCallBase","type":"uint256"},{"internalType":"uint256","name":"shortCallQuote","type":"uint256"},{"internalType":"uint256","name":"longPut","type":"uint256"},{"internalType":"uint256","name":"shortPut","type":"uint256"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"internalType":"struct OptionMarket.Strike","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"strikeId","type":"uint256"}],"name":"getStrikeAndBoard","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"uint256","name":"skew","type":"uint256"},{"internalType":"uint256","name":"longCall","type":"uint256"},{"internalType":"uint256","name":"shortCallBase","type":"uint256"},{"internalType":"uint256","name":"shortCallQuote","type":"uint256"},{"internalType":"uint256","name":"longPut","type":"uint256"},{"internalType":"uint256","name":"shortPut","type":"uint256"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"internalType":"struct OptionMarket.Strike","name":"","type":"tuple"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"iv","type":"uint256"},{"internalType":"bool","name":"frozen","type":"bool"},{"internalType":"uint256[]","name":"strikeIds","type":"uint256[]"}],"internalType":"struct OptionMarket.OptionBoard","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"strikeId","type":"uint256"}],"name":"getStrikeAndExpiry","outputs":[{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract BaseExchangeAdapter","name":"_exchangeAdapter","type":"address"},{"internalType":"contract LiquidityPool","name":"_liquidityPool","type":"address"},{"internalType":"contract OptionMarketPricer","name":"_optionPricer","type":"address"},{"internalType":"contract OptionGreekCache","name":"_greekCache","type":"address"},{"internalType":"contract ShortCollateral","name":"_shortCollateral","type":"address"},{"internalType":"contract OptionToken","name":"_optionToken","type":"address"},{"internalType":"contract IERC20Decimals","name":"_quoteAsset","type":"address"},{"internalType":"contract IERC20Decimals","name":"_baseAsset","type":"address"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"address","name":"rewardBeneficiary","type":"address"}],"name":"liquidatePosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"strikeId","type":"uint256"},{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"iterations","type":"uint256"},{"internalType":"enum OptionMarket.OptionType","name":"optionType","type":"uint8"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"setCollateralTo","type":"uint256"},{"internalType":"uint256","name":"minTotalCost","type":"uint256"},{"internalType":"uint256","name":"maxTotalCost","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"internalType":"struct OptionMarket.TradeInputParameters","name":"params","type":"tuple"}],"name":"openPosition","outputs":[{"components":[{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"totalCost","type":"uint256"},{"internalType":"uint256","name":"totalFee","type":"uint256"}],"internalType":"struct OptionMarket.Result","name":"result","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"quoteAsset","outputs":[{"internalType":"contract IERC20Decimals","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20Decimals","name":"token","type":"address"},{"internalType":"address","name":"recipient","type":"address"}],"name":"recoverFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"scaledLongsForBoard","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"},{"internalType":"uint256","name":"baseIv","type":"uint256"}],"name":"setBoardBaseIv","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"},{"internalType":"bool","name":"frozen","type":"bool"}],"name":"setBoardFrozen","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"maxBoardExpiry","type":"uint256"},{"internalType":"address","name":"securityModule","type":"address"},{"internalType":"uint256","name":"feePortionReserved","type":"uint256"},{"internalType":"uint256","name":"staticBaseSettlementFee","type":"uint256"}],"internalType":"struct OptionMarket.OptionMarketParameters","name":"_optionMarketParams","type":"tuple"}],"name":"setOptionMarketParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"strikeId","type":"uint256"},{"internalType":"uint256","name":"skew","type":"uint256"}],"name":"setStrikeSkew","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"settleExpiredBoard","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"smClaim","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
    },
    ETHEREUM: {
        LIQUITY_BORROWERS_OPERATIONS: '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_activePoolAddress","type":"address"}],"name":"ActivePoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_collSurplusPoolAddress","type":"address"}],"name":"CollSurplusPoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_defaultPoolAddress","type":"address"}],"name":"DefaultPoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_gasPoolAddress","type":"address"}],"name":"GasPoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lqtyStakingAddress","type":"address"}],"name":"LQTYStakingAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"_LUSDFee","type":"uint256"}],"name":"LUSDBorrowingFeePaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lusdTokenAddress","type":"address"}],"name":"LUSDTokenAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newPriceFeedAddress","type":"address"}],"name":"PriceFeedAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_sortedTrovesAddress","type":"address"}],"name":"SortedTrovesAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_stabilityPoolAddress","type":"address"}],"name":"StabilityPoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"arrayIndex","type":"uint256"}],"name":"TroveCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newTroveManagerAddress","type":"address"}],"name":"TroveManagerAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"_debt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_coll","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"stake","type":"uint256"},{"indexed":false,"internalType":"enum BorrowerOperations.BorrowerOperation","name":"operation","type":"uint8"}],"name":"TroveUpdated","type":"event"},{"inputs":[],"name":"BORROWING_FEE_FLOOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DECIMAL_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LUSD_GAS_COMPENSATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_NET_DEBT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NAME","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENT_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_100pct","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activePool","outputs":[{"internalType":"contract IActivePool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"addColl","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_collWithdrawal","type":"uint256"},{"internalType":"uint256","name":"_LUSDChange","type":"uint256"},{"internalType":"bool","name":"_isDebtIncrease","type":"bool"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"adjustTrove","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeTrove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"defaultPool","outputs":[{"internalType":"contract IDefaultPool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_debt","type":"uint256"}],"name":"getCompositeDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getEntireSystemColl","outputs":[{"internalType":"uint256","name":"entireSystemColl","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEntireSystemDebt","outputs":[{"internalType":"uint256","name":"entireSystemDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lqtyStaking","outputs":[{"internalType":"contract ILQTYStaking","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lqtyStakingAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lusdToken","outputs":[{"internalType":"contract ILUSDToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"moveETHGainToTrove","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_LUSDAmount","type":"uint256"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"openTrove","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceFeed","outputs":[{"internalType":"contract IPriceFeed","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_LUSDAmount","type":"uint256"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"repayLUSD","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_troveManagerAddress","type":"address"},{"internalType":"address","name":"_activePoolAddress","type":"address"},{"internalType":"address","name":"_defaultPoolAddress","type":"address"},{"internalType":"address","name":"_stabilityPoolAddress","type":"address"},{"internalType":"address","name":"_gasPoolAddress","type":"address"},{"internalType":"address","name":"_collSurplusPoolAddress","type":"address"},{"internalType":"address","name":"_priceFeedAddress","type":"address"},{"internalType":"address","name":"_sortedTrovesAddress","type":"address"},{"internalType":"address","name":"_lusdTokenAddress","type":"address"},{"internalType":"address","name":"_lqtyStakingAddress","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sortedTroves","outputs":[{"internalType":"contract ISortedTroves","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"troveManager","outputs":[{"internalType":"contract ITroveManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_collWithdrawal","type":"uint256"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"withdrawColl","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_LUSDAmount","type":"uint256"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"withdrawLUSD","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
    }
}

// Perpetuals contracts
const OPTIMISM_PERP_VAULT_PROXY_CONTRACT = '0xD24b8feEeA13A0EcCe247e37E8AD1a0b2620Fc5B'
const OPTIMISM_PERP_VAULT_PROXY_INTERACTION = new ethers.Contract(
    OPTIMISM_PERP_VAULT_PROXY_CONTRACT,
    ABIS["OPTIMISM"]["PERP_VAULT_PROXY"],
    PROVIDER
)

const OPTIMISM_PERP_CLEARINGHOUSE_PROXY_CONTRACT = '0x12c884f45062b58e1592d1438542731829790a25'
const OPTIMISM_PERP_CLEARINGHOUSE_PROXY_INTERACTION = new ethers.Contract(
    OPTIMISM_PERP_CLEARINGHOUSE_PROXY_CONTRACT,
    ABIS["OPTIMISM"]["PERP_CLEARINGHOUSE_PROXY"],
    PROVIDER
)

// Lyra contracts
const ARBITRUM_LYRA_OPTIONMARKET_CONTRACT = '0x919E5e0C096002cb8a21397D724C4e3EbE77bC15'
const ARBITRUM_LYRA_OPTIONMARKET_INTERACTION = new ethers.Contract(
    ARBITRUM_LYRA_OPTIONMARKET_CONTRACT,
    ABIS["ARBITRUM"]["LYRA_OPTIONMARKET"],
    PROVIDER
)

// Velodrome contracts


// Liquity contracts
const ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_CONTRACT = '0x24179cd81c9e782a4096035f7ec97fb8b783e007'
const ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_INTERACTION = new ethers.Contract(
    ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_CONTRACT,
    ABIS["ETHEREUM"]["LIQUITY_BORROWERS_OPERATIONS"],
    PROVIDER
)

// Gearbox contracts


// dYdX contracts


// Perp Vault tokens
const OPTIMISM_PERP_VAULT_TOKENS = {
    'ETH' : '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    'FRAX' : '0x2E3D870790dC77A83DD1d18184Acc7439A53f475',
    'OP' : '0x4200000000000000000000000000000000000042',
    'USDC' : '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    'USDT' : '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    'WETH' : '0x4200000000000000000000000000000000000006',
}

const OPTIMISM_PERP_POOL_TOKENS = {
    'vAAVE' : '0x34235c8489b06482a99bb7fcab6d7c467b92d248',
    'vATOM' : '0x5f714b5347f0b5de9f9598e39840e176ce889b9c',
    'vAPE': '0x9d34F1D15C22e4C0924804e2a38cBe93DFB84bc2',
    'vAVAX': '0x5FAa136Fc58B6136fFDAeAAC320076C4865c070F',
    'vBNB': '0xb6599Bd362120Dc70D48409B8a08888807050700',
    'vBTC': '0x86f1e0420c26a858fc203a3645dd1a36868f18e5',
    'vCRV' : '0x7161c3416e08abaa5cd38e68d9a28e43a694e037',
    'vETH' : '0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb',
    'vFLOW': '0x7EAdA83e15AcD08d22ad85A1dCE92E5A257Acb92',
    'vFTM' : '0x2dB8d2DB86cA3a4C7040E778244451776570359B',
    'vLINK' : '0x2f198182ec54469195a4a06262a9431a42462373',
    'vNEAR': '0x3Fb3282e3BA34A0Bff94845f1800Eb93CC6850d4',
    'vONE': '0x77d0cc9568605bFfF32F918C8FFaa53F72901416',
    'vPERP' : '0x9482aafdced6b899626f465e1fa0cf1b1418d797',
    'vSAND': '0x333b1eA429a88d0dd48cE7C06C16609CD76F43A8',
    'vSOL': '0x151Bb01c79F4516c233948D69daE39869BCcB737',
    'vMATIC': '0xBe5de48197fc974600929196239E264EcB703eE8',
}

// async function getBalanceEther(address) {
//     return ethers.utils.formatEther(await PROVIDER.getBalance(address))
// }

// function notifyMe() {
//     // Let's check if the browser supports notifications
//     if (!("Notification" in window)) {
//         alert("This browser does not support desktop notification");
//     }

//     // Let's check whether notification permissions have already been granted
//     else if (Notification.permission === "granted") {
//         // If it's okay let's create a notification
//         var notification = new Notification("Hi there!");
//     }

//     // Otherwise, we need to ask the user for permission
//     else if (Notification.permission !== "denied") {
//         Notification.requestPermission().then(function (permission) {
//             // If the user accepts, let's create a notification
//             if (permission === "granted") {
//                 var notification = new Notification("Hi there!");
//             }
//         });
//     }

//     // At last, if the user has denied notifications, and you 
//     // want to be respectful there is no need to bother them any more.
//     console.log("notification::", notification)
// }

$(document).ready(async function() {
    // // ETH Balance
    // $("#eth-balance-button").click(async function() {
    //     etherBalance = await getBalanceEther($("#selected-account").text())
    //     $("#eth-balance").text(etherBalance)
    //     notifyMe();
    // })
    // $("#eth-goerli-balance-button").click(async function() {
    //     etherBalance = await getBalanceEther($("#selected-account").text())
    //     $("#eth-goerli-balance").text(etherBalance)
    //     notifyMe();
    // })

    // PerpV2 - Optimism - Balances
    $("#eth-optimism-perp-balance-button").click(async function() {
        // balanceOfWei = await OPTIMISM_PERP_VAULT_INTERACTION.getBalanceByToken(
        balanceOfWei = await OPTIMISM_PERP_VAULT_PROXY_INTERACTION.getBalanceByToken(
            // TODO : FIX IT
            // $("#selected-account").text(),
            '0x54240c950ff793a4eb5895a56f859216cb1c3f0d',
            OPTIMISM_PERP_VAULT_TOKENS['ETH']
        )

        console.log(balanceOfWei)

        balanceOf = ethers.utils.formatUnits(balanceOfWei, 18)
        $("#eth-optimism-perp-balance").text(balanceOf)
    })
    $("#usdc-optimism-perp-balance-button").click(async function() {
        // balanceOfWei = await OPTIMISM_PERP_VAULT_INTERACTION.getBalanceByToken(
        balanceOfWei = await OPTIMISM_PERP_VAULT_PROXY_INTERACTION.getBalanceByToken(
            // TODO : FIX IT
            // $("#selected-account").text(),
            "0x54240c950ff793a4eb5895a56f859216cb1c3f0d",
            // TODO : FIX IT
            // OPTIMISM_PERP_VAULT_TOKENS['USDC']
            "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
        )

        console.log(balanceOfWei)

        balanceOf = ethers.utils.formatUnits(balanceOfWei, 18)
        $("#usdc-optimism-perp-balance").text(balanceOf)
    })

    // PerpV2 - Optimism - Deposit
    $("#deposit-optimism-perp-vault-button").click(async function() {
        // Get option value of select id "deposit-collateral-optimism-perp-select"
        const collateral = $("#deposit-collateral-optimism-perp-select").val()
        const amount = $("#deposit-optimism-perp-vault-amount").val()
        console.log("collateral::", collateral)
        console.log("amount::", amount)

        const vaultContract = await OPTIMISM_PERP_VAULT_PROXY_INTERACTION.connect(SIGNER)

        if (collateral === 'ETH') {
            const tx = await vaultContract.depositEther(
                {
                    value: ethers.utils.parseUnits(amount, 18),
                    gasLimit: 150000
                }
            )
            console.log("tx::", tx)
        } else {
            const tx = await vaultContract.deposit(
                OPTIMISM_PERP_VAULT_TOKENS[collateral],
                ethers.utils.parseUnits(amount, 18),
                {
                    gasLimit: 150000
                }
            )
            console.log("tx::", tx)
        }
    })

    // PerpV2 - Optimism - Withdraw
    $("#withdraw-optimism-perp-vault-button").click(async function() {
        const collateral = $("#withdraw-collateral-optimism-perp-select").val()
        const amount = $("#withdraw-optimism-perp-vault-amount").val()
        console.log("collateral::", collateral)
        console.log("amount::", amount)

        const vaultContract = await OPTIMISM_PERP_VAULT_PROXY_INTERACTION.connect(SIGNER)

        if (collateral === 'ETH') {
            const tx = await vaultContract.withdrawEther(
                {
                    value: ethers.utils.parseUnits(amount, 18),
                    gasLimit: 400000
                }
            )
            console.log("tx::", tx)
        } else {
            const tx = await vaultContract.withdraw(
                OPTIMISM_PERP_VAULT_TOKENS[collateral],
                ethers.utils.parseUnits(amount, 18),
                {
                    gasLimit: 1500000
                }
            )
            console.log("tx::", tx)
        }
    })

    // PerpV2 - Optimism - Open Position
    $("#open-position-optimism-perp-clearinghouse-button").click(async function() {
        const currentDate = new Date();
        const vtoken = $("#open-position-vtoken-optimism-perp-select").val()
        const amount = $("#open-position-optimism-perp-clearinghouse-amount").val()
        const isBaseToQuote = JSON.parse($("#open-position-side-optimism-perp-select").val())
        const isExactInput = true
        const oppositeAmountBound = "0"
        const sqrtPriceLimitX96 = "0"
        const timestamp = currentDate.getTime();
        const deadline = timestamp + 300000; // + 5 minutes
        const referralCode = "0x0000000000000000000000000000000000000000000000000000000000000000"
        
        // Debug transaction
        const transaction_debug = {
            "baseToken": OPTIMISM_PERP_POOL_TOKENS[vtoken],
            "isBaseToQuote": isBaseToQuote,
            "isExactInput": isExactInput,
            "amount": ethers.utils.parseUnits(amount, 18),
            "oppositeAmountBound": oppositeAmountBound,
            "deadline": deadline,
            "sqrtPriceLimitX96": sqrtPriceLimitX96,
            "referralCode": referralCode
        }
        console.log("transaction_debug::", transaction_debug)

        const clearingHouseContract = await OPTIMISM_PERP_CLEARINGHOUSE_PROXY_INTERACTION.connect(SIGNER)

        const tx = await clearingHouseContract.openPosition([
            OPTIMISM_PERP_POOL_TOKENS[vtoken],
            isBaseToQuote,
            isExactInput,
            ethers.utils.parseUnits(amount, 18),
            oppositeAmountBound,
            deadline,
            sqrtPriceLimitX96,
            referralCode,
            {
                gasLimit: 1500000
            }

            // address baseToken; -> vToken base address
            // bool isBaseToQuote; -> Short = true / Long = false
            // bool isExactInput; -> isExactInput can be entered as true or false. ???
            // uint256 amount; -> 50 * 10^18
            // uint256 oppositeAmountBound; -> is a restriction on how many tokens to receive or pay, depending on isBaseToQuote and isExactInput. ???
            // uint256 deadline; -> sets a deadline for executing the transaction. You can use a Unix time converter to enter this parameter, by converting a custom date 15 minutes ahead of the current time to Unix timestamp: https://awebanalysis.com/en/unix-timestamp-converter/ ???
            // uint160 sqrtPriceLimitX96; -> is a restriction on the ending price after the swap, where sqrtPriceLimitX96 is defined here. For no restriction, you can enter 0. ???
            // bytes32 referralCode; -> is used to add your referral code (or use 0x0000000000000000000000000000000000000000000000000000000000000000 if you do not have a code to apply). ???
        ])

        console.log("tx::", tx)
    })

    // Lyra - Arbitrum - Buy ETH CALL
    $("#open-position-arbitrum-lyra-optionmarket-button").click(async function() {
        const currentDate = new Date();
        const vtoken = $("#open-position-vtoken-optimism-perp-select").val()
        const amount = $("#open-position-optimism-perp-clearinghouse-amount").val()
        const isBaseToQuote = JSON.parse($("#open-position-side-optimism-perp-select").val())
        const isExactInput = true
        const oppositeAmountBound = "0"
        const sqrtPriceLimitX96 = "0"
        const timestamp = currentDate.getTime();
        const deadline = timestamp + 300000; // + 5 minutes
        const referralCode = "0x0000000000000000000000000000000000000000000000000000000000000000"

        // Debug transaction
        const transaction_debug = {
            "baseToken": OPTIMISM_PERP_POOL_TOKENS[vtoken],
            "isBaseToQuote": isBaseToQuote,
            "isExactInput": isExactInput,
            "amount": ethers.utils.parseUnits(amount, 18),
            "oppositeAmountBound": oppositeAmountBound,
            "deadline": deadline,
            "sqrtPriceLimitX96": sqrtPriceLimitX96,
            "referralCode": referralCode
        }
        console.log("transaction_debug::", transaction_debug)

        const optionMarketContract = await ARBITRUM_LYRA_OPTIONMARKET_INTERACTION.openPosition(SIGNER)

        const tx = await optionMarketContract.openPosition([
            OPTIMISM_PERP_POOL_TOKENS[vtoken],
            isBaseToQuote,
            isExactInput,
            ethers.utils.parseUnits(amount, 18),
            oppositeAmountBound,
            deadline,
            sqrtPriceLimitX96,
            referralCode,
            // {
            //     gasLimit: 1500000
            // }

            // MethodID : openPosition (0xd6c0bb44)
            // 0 - params.strikeId : 150 ???
            // 1 - params.positionId : 0 ???
            // 2 - params.iterations : 3 ???
            // 3 - params.optionType : 0 ???
            // 4 - params.amount : 1000000000000000 (18 dec for 6 USDC dec ???) - 0.001
            // 5 - params.setCollateralTo : 0 ???
            // 6 - params.minTotalCost : 0 ???
            // 7 - params.maxTotalCost : 15350031147489869
            // 8 - params.referrer : 0x0000000000000000000000000000000000000000
        ])

        console.log("tx::", tx)
    })

    // Lyra - Arbitrum - Sell ETH CALL
    $("#close-position-arbitrum-lyra-optionmarket-button").click(async function() {
        const currentDate = new Date();
        const vtoken = $("#open-position-vtoken-optimism-perp-select").val()
        const amount = $("#open-position-optimism-perp-clearinghouse-amount").val()
        const isBaseToQuote = JSON.parse($("#open-position-side-optimism-perp-select").val())
        const isExactInput = true
        const oppositeAmountBound = "0"
        const sqrtPriceLimitX96 = "0"
        const timestamp = currentDate.getTime();
        const deadline = timestamp + 300000; // + 5 minutes
        const referralCode = "0x0000000000000000000000000000000000000000000000000000000000000000"

        // Debug transaction
        const transaction_debug = {
            "baseToken": OPTIMISM_PERP_POOL_TOKENS[vtoken],
            "isBaseToQuote": isBaseToQuote,
            "isExactInput": isExactInput,
            "amount": ethers.utils.parseUnits(amount, 18),
            "oppositeAmountBound": oppositeAmountBound,
            "deadline": deadline,
            "sqrtPriceLimitX96": sqrtPriceLimitX96,
            "referralCode": referralCode
        }
        console.log("transaction_debug::", transaction_debug)

        const optionMarketContract = await ARBITRUM_LYRA_OPTIONMARKET_INTERACTION.openPosition(SIGNER)

        const tx = await optionMarketContract.closePosition([
            OPTIMISM_PERP_POOL_TOKENS[vtoken],
            isBaseToQuote,
            isExactInput,
            ethers.utils.parseUnits(amount, 18),
            oppositeAmountBound,
            deadline,
            sqrtPriceLimitX96,
            referralCode,
            // {
            //     gasLimit: 1500000
            // }

            // 0 - params.strikeId : 150 ???
            // 1 - params.positionId : 5936 ???
            // 2 - params.iterations : 3 ???
            // 3 - params.optionType : 0 ???
            // 4 - params.amount : 1000000000000000 (18 dec for 6 USDC dec ???) - 0.001
            // 5 - params.setCollateralTo : 0 ???
            // 6 - params.minTotalCost : 10200696066132676 ???
            // 7 - params.maxTotalCost : 115792089237316195423570985008687907853269984665640564039457584007913129639935
            // 8 - params.referrer : 0x0000000000000000000000000000000000000000
        ])

        console.log("tx::", tx)
    })

    // Lyra - Arbitrum - Check balances
    $("#check-balances-arbitrum-lyra-button").click(async function() {
        // balanceOfWei = await OPTIMISM_PERP_VAULT_INTERACTION.getBalanceByToken(
        balanceOfWei = await ARBITRUM_LYRA_OPTIONMARKET_INTERACTION.getBalanceByToken(
            // TODO : FIX IT
            // $("#selected-account").text(),
            "0x54240c950ff793a4eb5895a56f859216cb1c3f0d",
            // TODO : FIX IT
            // OPTIMISM_PERP_VAULT_TOKENS['USDC']
            "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
        )

        console.log(balanceOfWei)

        balanceOf = ethers.utils.formatUnits(balanceOfWei, 18)
        $("#usdc-optimism-perp-balance").text(balanceOf)
    })

    // Liquity - Ethereum - Open trove
    $("#open-trove-ethereum-liquity-button").click(async function() {
        openTrove = await ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_INTERACTION.openTrove(
            
            // payableAmount (ether)
            // _maxFeePercentage (uint256)
            // _maxFeePercentage (uint256)
            // _LUSDAmount (uint256)
            // _LUSDAmount (uint256)
            // _upperHint (address)
            // _upperHint (address)
            // _lowerHint (address)
            // _lowerHint (address)
        )
    })

    // Liquity - Ethereum - Close trove
    $("#close-trove-ethereum-liquity-button").click(async function() {
        closeTrove = await ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_INTERACTION.closeTrove()
    })

    // Liquity - Ethereum - Repay LUSD
    $("#repay-lusd-ethereum-liquity-button").click(async function() {
        repayLUSD = await ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_INTERACTION.repayLUSD(

            // _LUSDAmount (uint256)
            // _LUSDAmount (uint256)
            // _upperHint (address)
            // _upperHint (address)
            // _lowerHint (address)
            // _lowerHint (address)
        )
    })

    // Liquity - Ethereum - Withdraw LUSD
    $("#withdraw-lusd-ethereum-liquity-button").click(async function() {
        withdrawLUSD = await ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_INTERACTION.withdrawLUSD(

            // _maxFeePercentage (uint256)
            // _maxFeePercentage (uint256)
            // _LUSDAmount (uint256)
            // _LUSDAmount (uint256)
            // _upperHint (address)
            // _upperHint (address)
            // _lowerHint (address)
            // _lowerHint (address)
        )
    })

    // Liquity - Ethereum - Add collateral
    $("#add-eth-ethereum-liquity-button").click(async function() {
        addETH = await ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_INTERACTION.addColl(
            
            // payableAmount (ether)
            // _upperHint (address)
            // _upperHint (address)
            // _lowerHint (address)
            // _lowerHint (address)
        )
    })

    // Liquity - Ethereum - Withdraw collateral
    $("#withdraw-eth-ethereum-liquity-button").click(async function() {
        withdrawETH = await ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_INTERACTION.withdrawColl(

            // _collWithdrawal (uint256)
            // _collWithdrawal (uint256)
            // _upperHint (address)
            // _upperHint (address)
            // _lowerHint (address)
            // _lowerHint (address)
        )
    })

    // // Borrow ETH Goerli
    // $("#eth-goerli-borrow-button").click(async function() {
    //     let borrowingAmount = ethers.utils.parseUnits($('#borrow-amount-goerli').val())
    //     let borrowContract = await GOERLI_PROXY_INTERACTION_AAVE.connect(SIGNER)
    //     // args : address lendingPool, uint256 amount, uint256 interesRateMode, uint16 referralCode
    //     let result = await borrowContract.borrowETH(
    //         "0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6",
    //         borrowingAmount,
    //         ethers.BigNumber.from("2"),
    //         ethers.BigNumber.from("0"),
    //     {
    //         gasLimit: 400000
    //     })
    //     console.log("result::", result)
    // })
})

// Web3modal
"use strict";

// Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const EvmChains = window.EvmChains;

// Web3modal instance
let web3Modal
// Address of the selected account
let selectedAccount;

function init() {
    // console.log("WalletConnectProvider is", WalletConnectProvider);

    const providerOptions = {
        // walletconnect: {
        //     package: WalletConnectProvider,
        //     options: {
        //         // Mikko's test key - don't copy as your mileage may vary
        //         infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
        //     }
        // },
    };

    web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
    });
}

/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {
    // Get connected chain id from Ethereum node
    const chain = await PROVIDER.getNetwork();
    // Load chain information over an HTTP API
    const chainId = await chain.chainId;
    const chainData = await chain.name;
    document.querySelector("#network-id").textContent = chainId;
    document.querySelector("#network-name").textContent = chainData;
    // console.log("PROVIDER.detectNetwork()::", await PROVIDER.detectNetwork())
    // console.log("chain::", chain)
    // console.log("chainId::", chainId)
    // console.log("chainData::", chainData)

    const address = await SIGNER.getAddress()

    document.querySelector("#selected-account").textContent = address;

    // Display fully loaded UI for wallet data
    document.querySelector("#prepare").style.display = "none";
    document.querySelector("#connected").style.display = "block";
    document.querySelector("#networkTab").style.display = "flex";
    document.querySelector("#networkTabContent").style.display = "block";
}

/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {
    document.querySelector("#connected").style.display = "none";
    document.querySelector("#networkTab").style.display = "none";
    document.querySelector("#networkTabContent").style.display = "none";
    document.querySelector("#prepare").style.display = "block";

    document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
    await fetchAccountData(PROVIDER);
    document.querySelector("#btn-connect").removeAttribute("disabled")
}

/**
 * Connect wallet button pressed.
 */
async function onConnect() {
    // console.log("Opening a dialog", web3Modal);
    try {
        const PROVIDER = await web3Modal.connect();
    } catch(e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

    // Subscribe to accounts change
    PROVIDER.on("accountsChanged", (accounts) => {
        console.log("accountsChanged")
        fetchAccountData();
    });

    // Subscribe to chainId change
    PROVIDER.on("chainChanged", (chainId) => {
        console.log("chainChanged")
        fetchAccountData();
    });

    // Subscribe to networkId change
    PROVIDER.on("networkChanged", (networkId) => {
        console.log("networkChanged")
        fetchAccountData();
    });

    await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {
    console.log("Killing the wallet connection", PROVIDER);

    // TODO: Which providers have close method?
    if (PROVIDER.close) {
        await PROVIDER.close();
        await web3Modal.clearCachedProvider();
        PROVIDER = null;
    }

    selectedAccount = null;

    // Set the UI back to the initial state
    document.querySelector("#prepare").style.display = "block";
    document.querySelector("#connected").style.display = "none";
    document.querySelector("#networkTab").style.display = "none";
    document.querySelector("#networkTabContent").style.display = "none";
}

/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
    init();
    document.querySelector("#btn-connect").addEventListener("click", onConnect);
    document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
});
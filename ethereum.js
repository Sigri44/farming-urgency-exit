const PROVIDER = new ethers.providers.Web3Provider(window.ethereum)
const SIGNER = PROVIDER.getSigner()
const COINGECKO_URI = 'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids='
// const PERP_METADATA_URI = 'https://metadata.perp.exchange/v2/optimism.json'
const PERP_METADATA_URI = './perp_optimism_metadata.json'
let PERPV2_METADATA

// Contracts
const ABIS = {
    GENERIC: {
        ERC20: '[{"inputs":[{"internalType":"address","name":"_l2Bridge","type":"address"},{"internalType":"address","name":"_l1Token","type":"address"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"Blacklisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newBlacklister","type":"address"}],"name":"BlacklisterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_account","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_account","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pauser","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousPauser","type":"address"},{"indexed":true,"internalType":"address","name":"newPauser","type":"address"}],"name":"PauserChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"UnBlacklisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pauser","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"blacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"blacklister","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"l1Token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"l2Bridge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauser","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"setPauser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"unBlacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newBlacklister","type":"address"}],"name":"updateBlacklister","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
        VTOKEN: '[{"inputs":[{"internalType":"address","name":"poolArg","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]'
    },
    OPTIMISM: {
        PERP_VAULT_PROXY: '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BadDebtSettled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"clearingHouse","type":"address"}],"name":"ClearingHouseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":true,"internalType":"address","name":"collateralToken","type":"address"},{"indexed":true,"internalType":"address","name":"liquidator","type":"address"},{"indexed":false,"internalType":"uint256","name":"collateral","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"repaidSettlementWithoutInsuranceFundFeeX10_S","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"insuranceFundFeeX10_S","type":"uint256"},{"indexed":false,"internalType":"uint24","name":"discountRatio","type":"uint24"}],"name":"CollateralLiquidated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"collateralManager","type":"address"}],"name":"CollateralManagerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"collateralToken","type":"address"},{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trustedForwarder","type":"address"}],"name":"TrustedForwarderChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"trustedForwarder","type":"address"}],"name":"TrustedForwarderUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"WETH9","type":"address"}],"name":"WETH9Changed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"collateralToken","type":"address"},{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"candidate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositEther","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"depositEtherFor","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAccountBalance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getAccountValue","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getBalance","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"getBalanceByToken","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClearingHouse","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClearingHouseConfig","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCollateralManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCollateralMmRatio","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getCollateralTokens","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getExchange","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getFreeCollateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"uint24","name":"ratio","type":"uint24"}],"name":"getFreeCollateralByRatio","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"getFreeCollateralByToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInsuranceFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"settlementX10_S","type":"uint256"}],"name":"getLiquidatableCollateralBySettlement","outputs":[{"internalType":"uint256","name":"collateral","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getMarginRequirementForCollateralLiquidation","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"getMaxRepaidSettlementAndLiquidatableCollateral","outputs":[{"internalType":"uint256","name":"maxRepaidSettlementX10_S","type":"uint256"},{"internalType":"uint256","name":"maxLiquidatableCollateral","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"collateral","type":"uint256"}],"name":"getRepaidSettlementByCollateral","outputs":[{"internalType":"uint256","name":"settlementX10_S","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSettlementToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getSettlementTokenValue","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTrustedForwarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"insuranceFundArg","type":"address"},{"internalType":"address","name":"clearingHouseConfigArg","type":"address"},{"internalType":"address","name":"accountBalanceArg","type":"address"},{"internalType":"address","name":"exchangeArg","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"isLiquidatable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isDenominatedInSettlementToken","type":"bool"}],"name":"liquidateCollateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"clearingHouseArg","type":"address"}],"name":"setClearingHouse","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"collateralManagerArg","type":"address"}],"name":"setCollateralManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trustedForwarderArg","type":"address"}],"name":"setTrustedForwarder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"WETH9Arg","type":"address"}],"name":"setWETH9","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"settleBadDebt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"versionRecipient","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"withdrawAll","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAllEther","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]',
        PERP_CLEARINGHOUSE_PROXY: '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegateApproval","type":"address"}],"name":"DelegateApprovalChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":true,"internalType":"address","name":"baseToken","type":"address"},{"indexed":false,"internalType":"int256","name":"fundingPayment","type":"int256"}],"name":"FundingPaymentSettled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":true,"internalType":"address","name":"baseToken","type":"address"},{"indexed":true,"internalType":"address","name":"quoteToken","type":"address"},{"indexed":false,"internalType":"int24","name":"lowerTick","type":"int24"},{"indexed":false,"internalType":"int24","name":"upperTick","type":"int24"},{"indexed":false,"internalType":"int256","name":"base","type":"int256"},{"indexed":false,"internalType":"int256","name":"quote","type":"int256"},{"indexed":false,"internalType":"int128","name":"liquidity","type":"int128"},{"indexed":false,"internalType":"uint256","name":"quoteFee","type":"uint256"}],"name":"LiquidityChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":true,"internalType":"address","name":"baseToken","type":"address"},{"indexed":false,"internalType":"int256","name":"exchangedPositionSize","type":"int256"},{"indexed":false,"internalType":"int256","name":"exchangedPositionNotional","type":"int256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"},{"indexed":false,"internalType":"int256","name":"openNotional","type":"int256"},{"indexed":false,"internalType":"int256","name":"realizedPnl","type":"int256"},{"indexed":false,"internalType":"uint256","name":"sqrtPriceAfterX96","type":"uint256"}],"name":"PositionChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":true,"internalType":"address","name":"baseToken","type":"address"},{"indexed":false,"internalType":"int256","name":"closedPositionSize","type":"int256"},{"indexed":false,"internalType":"int256","name":"closedPositionNotional","type":"int256"},{"indexed":false,"internalType":"int256","name":"openNotional","type":"int256"},{"indexed":false,"internalType":"int256","name":"realizedPnl","type":"int256"},{"indexed":false,"internalType":"uint256","name":"closedPrice","type":"uint256"}],"name":"PositionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":true,"internalType":"address","name":"baseToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"positionNotional","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"positionSize","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidationFee","type":"uint256"},{"indexed":false,"internalType":"address","name":"liquidator","type":"address"}],"name":"PositionLiquidated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"ReferredPositionChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"forwarder","type":"address"}],"name":"TrustedForwarderChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"trustedForwarder","type":"address"}],"name":"TrustedForwarderUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"components":[{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"},{"internalType":"int24","name":"lowerTick","type":"int24"},{"internalType":"int24","name":"upperTick","type":"int24"},{"internalType":"uint256","name":"minBase","type":"uint256"},{"internalType":"uint256","name":"minQuote","type":"uint256"},{"internalType":"bool","name":"useTakerBalance","type":"bool"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct IClearingHouse.AddLiquidityParams","name":"params","type":"tuple"}],"name":"addLiquidity","outputs":[{"components":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"internalType":"struct IClearingHouse.AddLiquidityResponse","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"cancelAllExcessOrders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"bytes32[]","name":"orderIds","type":"bytes32[]"}],"name":"cancelExcessOrders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"candidate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"},{"internalType":"uint256","name":"oppositeAmountBound","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"internalType":"struct IClearingHouse.ClosePositionParams","name":"params","type":"tuple"}],"name":"closePosition","outputs":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAccountBalance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getAccountValue","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClearingHouseConfig","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDelegateApproval","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getExchange","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInsuranceFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOrderBook","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getQuoteToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTrustedForwarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUniswapV3Factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"clearingHouseConfigArg","type":"address"},{"internalType":"address","name":"vaultArg","type":"address"},{"internalType":"address","name":"quoteTokenArg","type":"address"},{"internalType":"address","name":"uniV3FactoryArg","type":"address"},{"internalType":"address","name":"exchangeArg","type":"address"},{"internalType":"address","name":"accountBalanceArg","type":"address"},{"internalType":"address","name":"insuranceFundArg","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"int256","name":"positionSize","type":"int256"}],"name":"liquidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"liquidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"bool","name":"isBaseToQuote","type":"bool"},{"internalType":"bool","name":"isExactInput","type":"bool"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"oppositeAmountBound","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"internalType":"struct IClearingHouse.OpenPositionParams","name":"params","type":"tuple"}],"name":"openPosition","outputs":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"components":[{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"bool","name":"isBaseToQuote","type":"bool"},{"internalType":"bool","name":"isExactInput","type":"bool"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"oppositeAmountBound","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"internalType":"struct IClearingHouse.OpenPositionParams","name":"params","type":"tuple"}],"name":"openPositionFor","outputs":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"quitMarket","outputs":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"int24","name":"lowerTick","type":"int24"},{"internalType":"int24","name":"upperTick","type":"int24"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"minBase","type":"uint256"},{"internalType":"uint256","name":"minQuote","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct IClearingHouse.RemoveLiquidityParams","name":"params","type":"tuple"}],"name":"removeLiquidity","outputs":[{"components":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"quote","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"}],"internalType":"struct IClearingHouse.RemoveLiquidityResponse","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegateApprovalArg","type":"address"}],"name":"setDelegateApproval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"settleAllFunding","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Owed","type":"uint256"},{"internalType":"uint256","name":"amount1Owed","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"uniswapV3MintCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"amount0Delta","type":"int256"},{"internalType":"int256","name":"amount1Delta","type":"int256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"uniswapV3SwapCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"versionRecipient","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}]',
        PERP_ACCOUNTBALANCE_PROXY: '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"clearingHouse","type":"address"}],"name":"ClearingHouseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":false,"internalType":"int256","name":"amount","type":"int256"}],"name":"PnlRealized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"vault","type":"address"}],"name":"VaultChanged","type":"event"},{"inputs":[],"name":"candidate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"deregisterBaseToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"getAccountInfo","outputs":[{"components":[{"internalType":"int256","name":"takerPositionSize","type":"int256"},{"internalType":"int256","name":"takerOpenNotional","type":"int256"},{"internalType":"int256","name":"lastTwPremiumGrowthGlobalX96","type":"int256"}],"internalType":"struct AccountMarket.Info","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"getBase","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getBaseTokens","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClearingHouse","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClearingHouseConfig","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"int256","name":"accountValue","type":"int256"}],"name":"getLiquidatablePositionSize","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getMarginRequirementForLiquidation","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"baseToken","type":"address"}],"name":"getMarkPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOrderBook","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getPnlAndPendingFee","outputs":[{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"getQuote","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"getTakerOpenNotional","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"getTakerPositionSize","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getTotalAbsPositionValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"getTotalDebtValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"getTotalOpenNotional","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"getTotalPositionSize","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"getTotalPositionValue","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"hasOrder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"clearingHouseConfigArg","type":"address"},{"internalType":"address","name":"orderBookArg","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"int256","name":"amount","type":"int256"}],"name":"modifyOwedRealizedPnl","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"int256","name":"base","type":"int256"},{"internalType":"int256","name":"quote","type":"int256"}],"name":"modifyTakerBalance","outputs":[{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"registerBaseToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"clearingHouseArg","type":"address"}],"name":"setClearingHouse","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"vaultArg","type":"address"}],"name":"setVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"int256","name":"takerBase","type":"int256"},{"internalType":"int256","name":"takerQuote","type":"int256"},{"internalType":"int256","name":"realizedPnl","type":"int256"},{"internalType":"int256","name":"makerFee","type":"int256"}],"name":"settleBalanceAndDeregister","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"}],"name":"settleOwedRealizedPnl","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"}],"name":"settlePositionInClosedMarket","outputs":[{"internalType":"int256","name":"positionNotional","type":"int256"},{"internalType":"int256","name":"openNotional","type":"int256"},{"internalType":"int256","name":"realizedPnl","type":"int256"},{"internalType":"uint256","name":"closedPrice","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"int256","name":"amount","type":"int256"}],"name":"settleQuoteToOwedRealizedPnl","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"int256","name":"lastTwPremiumGrowthGlobalX96","type":"int256"}],"name":"updateTwPremiumGrowthGlobal","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
        VELODROME_ROUTER: '[{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_weth","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"stable","type":"bool"}],"internalType":"struct Router.route[]","name":"routes","type":"tuple[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"UNSAFE_swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"bool","name":"stable","type":"bool"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"bool","name":"stable","type":"bool"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"stable","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"stable","type":"bool"}],"internalType":"struct Router.route[]","name":"routes","type":"tuple[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"bool","name":"stable","type":"bool"}],"name":"getReserves","outputs":[{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"}],"name":"isPair","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"bool","name":"stable","type":"bool"}],"name":"pairFor","outputs":[{"internalType":"address","name":"pair","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"bool","name":"stable","type":"bool"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"}],"name":"quoteAddLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"bool","name":"stable","type":"bool"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"quoteRemoveLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"bool","name":"stable","type":"bool"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"bool","name":"stable","type":"bool"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"bool","name":"stable","type":"bool"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"bool","name":"stable","type":"bool"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"sortTokens","outputs":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"stable","type":"bool"}],"internalType":"struct Router.route[]","name":"routes","type":"tuple[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"stable","type":"bool"}],"internalType":"struct Router.route[]","name":"routes","type":"tuple[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"stable","type":"bool"}],"internalType":"struct Router.route[]","name":"routes","type":"tuple[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address","name":"tokenFrom","type":"address"},{"internalType":"address","name":"tokenTo","type":"address"},{"internalType":"bool","name":"stable","type":"bool"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSimple","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"weth","outputs":[{"internalType":"contract IWETH","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]'
    },
    ARBITRUM: {
        LYRA_OPTIONMARKET: '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"}],"name":"AlreadyInitialised","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BaseTransferFailed","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"BoardAlreadySettled","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"boardId","type":"uint256"},{"internalType":"uint256","name":"boardExpiry","type":"uint256"},{"internalType":"uint256","name":"currentTime","type":"uint256"}],"name":"BoardExpired","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"BoardIsFrozen","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"BoardNotExpired","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"BoardNotFrozen","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"}],"name":"CannotRecoverQuote","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"enum OptionMarket.NonZeroValues","name":"valueType","type":"uint8"}],"name":"ExpectedNonZeroValue","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"InvalidBoardId","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"currentTime","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"maxBoardExpiry","type":"uint256"}],"name":"InvalidExpiryTimestamp","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"components":[{"internalType":"uint256","name":"maxBoardExpiry","type":"uint256"},{"internalType":"address","name":"securityModule","type":"address"},{"internalType":"uint256","name":"feePortionReserved","type":"uint256"},{"internalType":"uint256","name":"staticBaseSettlementFee","type":"uint256"}],"internalType":"struct OptionMarket.OptionMarketParameters","name":"optionMarketParams","type":"tuple"}],"name":"InvalidOptionMarketParams","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"strikeId","type":"uint256"}],"name":"InvalidStrikeId","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"address","name":"caller","type":"address"},{"internalType":"address","name":"nominatedOwner","type":"address"}],"name":"OnlyNominatedOwner","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"address","name":"caller","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"OnlyOwner","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"address","name":"caller","type":"address"},{"internalType":"address","name":"securityModule","type":"address"}],"name":"OnlySecurityModule","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"QuoteTransferFailed","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"strikesLength","type":"uint256"},{"internalType":"uint256","name":"skewsLength","type":"uint256"}],"name":"StrikeSkewLengthMismatch","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"totalCost","type":"uint256"},{"internalType":"uint256","name":"minCost","type":"uint256"},{"internalType":"uint256","name":"maxCost","type":"uint256"}],"name":"TotalCostOutsideOfSpecifiedBounds","type":"error"},{"inputs":[{"internalType":"address","name":"thrower","type":"address"},{"internalType":"uint256","name":"iterations","type":"uint256"},{"internalType":"uint256","name":"expectedAmount","type":"uint256"},{"internalType":"uint256","name":"tradeAmount","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"}],"name":"TradeIterationsHasRemainder","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"boardId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseIv","type":"uint256"}],"name":"BoardBaseIvSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"boardId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"expiry","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseIv","type":"uint256"},{"indexed":false,"internalType":"bool","name":"frozen","type":"bool"}],"name":"BoardCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"boardId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"frozen","type":"bool"}],"name":"BoardFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"boardId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"spotPriceAtExpiry","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalUserLongProfitQuote","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBoardLongCallCollateral","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBoardLongPutCollateral","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalAMMShortCallProfitBase","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalAMMShortCallProfitQuote","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalAMMShortPutProfitQuote","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"longScaleFactor","type":"uint256"}],"name":"BoardSettled","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"uint256","name":"maxBoardExpiry","type":"uint256"},{"internalType":"address","name":"securityModule","type":"address"},{"internalType":"uint256","name":"feePortionReserved","type":"uint256"},{"internalType":"uint256","name":"staticBaseSettlementFee","type":"uint256"}],"indexed":false,"internalType":"struct OptionMarket.OptionMarketParameters","name":"optionMarketParams","type":"tuple"}],"name":"OptionMarketParamsSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"securityModule","type":"address"},{"indexed":false,"internalType":"uint256","name":"quoteAmount","type":"uint256"}],"name":"SMClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"boardId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"strikeId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"strikePrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"skew","type":"uint256"}],"name":"StrikeAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"strikeId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"skew","type":"uint256"}],"name":"StrikeSkewSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":true,"internalType":"uint256","name":"positionId","type":"uint256"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"components":[{"internalType":"uint256","name":"strikeId","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"enum OptionMarket.OptionType","name":"optionType","type":"uint8"},{"internalType":"enum OptionMarket.TradeDirection","name":"tradeDirection","type":"uint8"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"setCollateralTo","type":"uint256"},{"internalType":"bool","name":"isForceClose","type":"bool"},{"internalType":"uint256","name":"spotPrice","type":"uint256"},{"internalType":"uint256","name":"reservedFee","type":"uint256"},{"internalType":"uint256","name":"totalCost","type":"uint256"}],"indexed":false,"internalType":"struct OptionMarket.TradeEventData","name":"trade","type":"tuple"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"uint256","name":"optionPriceFee","type":"uint256"},{"internalType":"uint256","name":"spotPriceFee","type":"uint256"},{"components":[{"internalType":"int256","name":"preTradeAmmNetStdVega","type":"int256"},{"internalType":"int256","name":"postTradeAmmNetStdVega","type":"int256"},{"internalType":"uint256","name":"vegaUtil","type":"uint256"},{"internalType":"uint256","name":"volTraded","type":"uint256"},{"internalType":"uint256","name":"NAV","type":"uint256"},{"internalType":"uint256","name":"vegaUtilFee","type":"uint256"}],"internalType":"struct OptionMarketPricer.VegaUtilFeeComponents","name":"vegaUtilFee","type":"tuple"},{"components":[{"internalType":"uint256","name":"varianceFeeCoefficient","type":"uint256"},{"internalType":"uint256","name":"vega","type":"uint256"},{"internalType":"uint256","name":"vegaCoefficient","type":"uint256"},{"internalType":"uint256","name":"skew","type":"uint256"},{"internalType":"uint256","name":"skewCoefficient","type":"uint256"},{"internalType":"uint256","name":"ivVariance","type":"uint256"},{"internalType":"uint256","name":"ivVarianceCoefficient","type":"uint256"},{"internalType":"uint256","name":"varianceFee","type":"uint256"}],"internalType":"struct OptionMarketPricer.VarianceFeeComponents","name":"varianceFee","type":"tuple"},{"internalType":"uint256","name":"totalFee","type":"uint256"},{"internalType":"uint256","name":"totalCost","type":"uint256"},{"internalType":"uint256","name":"volTraded","type":"uint256"},{"internalType":"uint256","name":"newBaseIv","type":"uint256"},{"internalType":"uint256","name":"newSkew","type":"uint256"}],"indexed":false,"internalType":"struct OptionMarketPricer.TradeResult[]","name":"tradeResults","type":"tuple[]"},{"components":[{"internalType":"address","name":"rewardBeneficiary","type":"address"},{"internalType":"address","name":"caller","type":"address"},{"internalType":"uint256","name":"returnCollateral","type":"uint256"},{"internalType":"uint256","name":"lpPremiums","type":"uint256"},{"internalType":"uint256","name":"lpFee","type":"uint256"},{"internalType":"uint256","name":"liquidatorFee","type":"uint256"},{"internalType":"uint256","name":"smFee","type":"uint256"},{"internalType":"uint256","name":"insolventAmount","type":"uint256"}],"indexed":false,"internalType":"struct OptionMarket.LiquidationEventData","name":"liquidation","type":"tuple"},{"indexed":false,"internalType":"uint256","name":"longScaleFactor","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Trade","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"amountCollateral","type":"uint256"}],"name":"addCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"},{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"uint256","name":"skew","type":"uint256"}],"name":"addStrikeToBoard","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"baseAsset","outputs":[{"internalType":"contract IERC20Decimals","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"boardToPriceAtExpiry","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"strikeId","type":"uint256"},{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"iterations","type":"uint256"},{"internalType":"enum OptionMarket.OptionType","name":"optionType","type":"uint8"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"setCollateralTo","type":"uint256"},{"internalType":"uint256","name":"minTotalCost","type":"uint256"},{"internalType":"uint256","name":"maxTotalCost","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"internalType":"struct OptionMarket.TradeInputParameters","name":"params","type":"tuple"}],"name":"closePosition","outputs":[{"components":[{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"totalCost","type":"uint256"},{"internalType":"uint256","name":"totalFee","type":"uint256"}],"internalType":"struct OptionMarket.Result","name":"result","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"baseIV","type":"uint256"},{"internalType":"uint256[]","name":"strikePrices","type":"uint256[]"},{"internalType":"uint256[]","name":"skews","type":"uint256[]"},{"internalType":"bool","name":"frozen","type":"bool"}],"name":"createOptionBoard","outputs":[{"internalType":"uint256","name":"boardId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"strikeId","type":"uint256"},{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"iterations","type":"uint256"},{"internalType":"enum OptionMarket.OptionType","name":"optionType","type":"uint8"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"setCollateralTo","type":"uint256"},{"internalType":"uint256","name":"minTotalCost","type":"uint256"},{"internalType":"uint256","name":"maxTotalCost","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"internalType":"struct OptionMarket.TradeInputParameters","name":"params","type":"tuple"}],"name":"forceClosePosition","outputs":[{"components":[{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"totalCost","type":"uint256"},{"internalType":"uint256","name":"totalFee","type":"uint256"}],"internalType":"struct OptionMarket.Result","name":"result","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"forceSettleBoard","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"getBoardAndStrikeDetails","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"iv","type":"uint256"},{"internalType":"bool","name":"frozen","type":"bool"},{"internalType":"uint256[]","name":"strikeIds","type":"uint256[]"}],"internalType":"struct OptionMarket.OptionBoard","name":"","type":"tuple"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"uint256","name":"skew","type":"uint256"},{"internalType":"uint256","name":"longCall","type":"uint256"},{"internalType":"uint256","name":"shortCallBase","type":"uint256"},{"internalType":"uint256","name":"shortCallQuote","type":"uint256"},{"internalType":"uint256","name":"longPut","type":"uint256"},{"internalType":"uint256","name":"shortPut","type":"uint256"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"internalType":"struct OptionMarket.Strike[]","name":"","type":"tuple[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"getBoardStrikes","outputs":[{"internalType":"uint256[]","name":"strikeIds","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLiveBoards","outputs":[{"internalType":"uint256[]","name":"_liveBoards","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumLiveBoards","outputs":[{"internalType":"uint256","name":"numLiveBoards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"getOptionBoard","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"iv","type":"uint256"},{"internalType":"bool","name":"frozen","type":"bool"},{"internalType":"uint256[]","name":"strikeIds","type":"uint256[]"}],"internalType":"struct OptionMarket.OptionBoard","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOptionMarketParams","outputs":[{"components":[{"internalType":"uint256","name":"maxBoardExpiry","type":"uint256"},{"internalType":"address","name":"securityModule","type":"address"},{"internalType":"uint256","name":"feePortionReserved","type":"uint256"},{"internalType":"uint256","name":"staticBaseSettlementFee","type":"uint256"}],"internalType":"struct OptionMarket.OptionMarketParameters","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"strikeId","type":"uint256"}],"name":"getSettlementParameters","outputs":[{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"uint256","name":"priceAtExpiry","type":"uint256"},{"internalType":"uint256","name":"strikeToBaseReturned","type":"uint256"},{"internalType":"uint256","name":"longScaleFactor","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"strikeId","type":"uint256"}],"name":"getStrike","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"uint256","name":"skew","type":"uint256"},{"internalType":"uint256","name":"longCall","type":"uint256"},{"internalType":"uint256","name":"shortCallBase","type":"uint256"},{"internalType":"uint256","name":"shortCallQuote","type":"uint256"},{"internalType":"uint256","name":"longPut","type":"uint256"},{"internalType":"uint256","name":"shortPut","type":"uint256"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"internalType":"struct OptionMarket.Strike","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"strikeId","type":"uint256"}],"name":"getStrikeAndBoard","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"uint256","name":"skew","type":"uint256"},{"internalType":"uint256","name":"longCall","type":"uint256"},{"internalType":"uint256","name":"shortCallBase","type":"uint256"},{"internalType":"uint256","name":"shortCallQuote","type":"uint256"},{"internalType":"uint256","name":"longPut","type":"uint256"},{"internalType":"uint256","name":"shortPut","type":"uint256"},{"internalType":"uint256","name":"boardId","type":"uint256"}],"internalType":"struct OptionMarket.Strike","name":"","type":"tuple"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"iv","type":"uint256"},{"internalType":"bool","name":"frozen","type":"bool"},{"internalType":"uint256[]","name":"strikeIds","type":"uint256[]"}],"internalType":"struct OptionMarket.OptionBoard","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"strikeId","type":"uint256"}],"name":"getStrikeAndExpiry","outputs":[{"internalType":"uint256","name":"strikePrice","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract BaseExchangeAdapter","name":"_exchangeAdapter","type":"address"},{"internalType":"contract LiquidityPool","name":"_liquidityPool","type":"address"},{"internalType":"contract OptionMarketPricer","name":"_optionPricer","type":"address"},{"internalType":"contract OptionGreekCache","name":"_greekCache","type":"address"},{"internalType":"contract ShortCollateral","name":"_shortCollateral","type":"address"},{"internalType":"contract OptionToken","name":"_optionToken","type":"address"},{"internalType":"contract IERC20Decimals","name":"_quoteAsset","type":"address"},{"internalType":"contract IERC20Decimals","name":"_baseAsset","type":"address"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"address","name":"rewardBeneficiary","type":"address"}],"name":"liquidatePosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"strikeId","type":"uint256"},{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"iterations","type":"uint256"},{"internalType":"enum OptionMarket.OptionType","name":"optionType","type":"uint8"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"setCollateralTo","type":"uint256"},{"internalType":"uint256","name":"minTotalCost","type":"uint256"},{"internalType":"uint256","name":"maxTotalCost","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"internalType":"struct OptionMarket.TradeInputParameters","name":"params","type":"tuple"}],"name":"openPosition","outputs":[{"components":[{"internalType":"uint256","name":"positionId","type":"uint256"},{"internalType":"uint256","name":"totalCost","type":"uint256"},{"internalType":"uint256","name":"totalFee","type":"uint256"}],"internalType":"struct OptionMarket.Result","name":"result","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"quoteAsset","outputs":[{"internalType":"contract IERC20Decimals","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20Decimals","name":"token","type":"address"},{"internalType":"address","name":"recipient","type":"address"}],"name":"recoverFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"scaledLongsForBoard","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"},{"internalType":"uint256","name":"baseIv","type":"uint256"}],"name":"setBoardBaseIv","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"},{"internalType":"bool","name":"frozen","type":"bool"}],"name":"setBoardFrozen","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"maxBoardExpiry","type":"uint256"},{"internalType":"address","name":"securityModule","type":"address"},{"internalType":"uint256","name":"feePortionReserved","type":"uint256"},{"internalType":"uint256","name":"staticBaseSettlementFee","type":"uint256"}],"internalType":"struct OptionMarket.OptionMarketParameters","name":"_optionMarketParams","type":"tuple"}],"name":"setOptionMarketParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"strikeId","type":"uint256"},{"internalType":"uint256","name":"skew","type":"uint256"}],"name":"setStrikeSkew","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"boardId","type":"uint256"}],"name":"settleExpiredBoard","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"smClaim","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
    },
    ETHEREUM: {
        LIQUITY_BORROWERS_OPERATIONS: '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_activePoolAddress","type":"address"}],"name":"ActivePoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_collSurplusPoolAddress","type":"address"}],"name":"CollSurplusPoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_defaultPoolAddress","type":"address"}],"name":"DefaultPoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_gasPoolAddress","type":"address"}],"name":"GasPoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lqtyStakingAddress","type":"address"}],"name":"LQTYStakingAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"_LUSDFee","type":"uint256"}],"name":"LUSDBorrowingFeePaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lusdTokenAddress","type":"address"}],"name":"LUSDTokenAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newPriceFeedAddress","type":"address"}],"name":"PriceFeedAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_sortedTrovesAddress","type":"address"}],"name":"SortedTrovesAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_stabilityPoolAddress","type":"address"}],"name":"StabilityPoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"arrayIndex","type":"uint256"}],"name":"TroveCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newTroveManagerAddress","type":"address"}],"name":"TroveManagerAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"_debt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_coll","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"stake","type":"uint256"},{"indexed":false,"internalType":"enum BorrowerOperations.BorrowerOperation","name":"operation","type":"uint8"}],"name":"TroveUpdated","type":"event"},{"inputs":[],"name":"BORROWING_FEE_FLOOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DECIMAL_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LUSD_GAS_COMPENSATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_NET_DEBT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NAME","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENT_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_100pct","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activePool","outputs":[{"internalType":"contract IActivePool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"addColl","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_collWithdrawal","type":"uint256"},{"internalType":"uint256","name":"_LUSDChange","type":"uint256"},{"internalType":"bool","name":"_isDebtIncrease","type":"bool"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"adjustTrove","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeTrove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"defaultPool","outputs":[{"internalType":"contract IDefaultPool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_debt","type":"uint256"}],"name":"getCompositeDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getEntireSystemColl","outputs":[{"internalType":"uint256","name":"entireSystemColl","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEntireSystemDebt","outputs":[{"internalType":"uint256","name":"entireSystemDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lqtyStaking","outputs":[{"internalType":"contract ILQTYStaking","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lqtyStakingAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lusdToken","outputs":[{"internalType":"contract ILUSDToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"moveETHGainToTrove","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_LUSDAmount","type":"uint256"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"openTrove","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceFeed","outputs":[{"internalType":"contract IPriceFeed","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_LUSDAmount","type":"uint256"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"repayLUSD","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_troveManagerAddress","type":"address"},{"internalType":"address","name":"_activePoolAddress","type":"address"},{"internalType":"address","name":"_defaultPoolAddress","type":"address"},{"internalType":"address","name":"_stabilityPoolAddress","type":"address"},{"internalType":"address","name":"_gasPoolAddress","type":"address"},{"internalType":"address","name":"_collSurplusPoolAddress","type":"address"},{"internalType":"address","name":"_priceFeedAddress","type":"address"},{"internalType":"address","name":"_sortedTrovesAddress","type":"address"},{"internalType":"address","name":"_lusdTokenAddress","type":"address"},{"internalType":"address","name":"_lqtyStakingAddress","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sortedTroves","outputs":[{"internalType":"contract ISortedTroves","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"troveManager","outputs":[{"internalType":"contract ITroveManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_collWithdrawal","type":"uint256"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"withdrawColl","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_LUSDAmount","type":"uint256"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"withdrawLUSD","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
    }
}

const coingeckoTickers = {
	"aave": {"ticker": "aave", "price": 0},
	"atom": {"ticker": "cosmos", "price": 0},
	"ape": {"ticker": "apecoin", "price": 0},
	"avax": {"ticker": "avalanche-2", "price": 0},
	"bnb": {"ticker": "binancecoin", "price": 0},
	"btc": {"ticker": "bitcoin", "price": 0},
	"eth": {"ticker": "ethereum", "price": 0},
	"flow": {"ticker": "flow", "price": 0},
	"frax": {"ticker": "frax", "price": 0},
	"ftm": {"ticker": "fantom", "price": 0},
	"link": {"ticker": "chainlink", "price": 0},
	"matic": {"ticker": "matic-network", "price": 0},
	"mps": {"ticker": "mt-pelerin-shares", "price": 0},
	"near": {"ticker": "near", "price": 0},
	"one": {"ticker": "harmony", "price": 0},
	"op": {"ticker": "optimism", "price": 0},
	"perp": {"ticker": "perpetual-protocol", "price": 0},
	"sand": {"ticker": "the-sandbox", "price": 0},
	"sol": {"ticker": "solana", "price": 0},
	"usdc": {"ticker": "usd-coin", "price": 0},
	"usdt": {"ticker": "tether", "price": 0},
	"weth": {"ticker": "weth", "price": 0},
	"wmatic": {"ticker": "wmatic", "price": 0},
	// MANUAL
	"custom": {"price": 0},
}

// ERC20 Contract
function generateErc20Contract(CONTRACT) {
    return new ethers.Contract(
        CONTRACT,
        ABIS['GENERIC']['ERC20'],
        PROVIDER
    )
}

// vToken Contract
function generateVtokenContract(CONTRACT) {
    return new ethers.Contract(
        CONTRACT,
        ABIS['GENERIC']['VTOKEN'],
        PROVIDER
    )
}

// Perpetuals contracts
const OPTIMISM_PERP_VAULT_CONTRACT = '0xAD7b4C162707E0B2b5f6fdDbD3f8538A5fbA0d60'
// const OPTIMISM_PERP_VAULT_PROXY_CONTRACT = '0xD24b8feEeA13A0EcCe247e37E8AD1a0b2620Fc5B'
const OPTIMISM_PERP_VAULT_PROXY_INTERACTION = new ethers.Contract(
    OPTIMISM_PERP_VAULT_CONTRACT,
    ABIS['OPTIMISM']['PERP_VAULT_PROXY'],
    PROVIDER
)

const OPTIMISM_PERP_CLEARINGHOUSE_CONTRACT = '0x82ac2CE43e33683c58BE4cDc40975E73aA50f459'
// const OPTIMISM_PERP_CLEARINGHOUSE_PROXY_CONTRACT = '0x12c884f45062b58e1592d1438542731829790a25'
const OPTIMISM_PERP_CLEARINGHOUSE_PROXY_INTERACTION = new ethers.Contract(
    OPTIMISM_PERP_CLEARINGHOUSE_CONTRACT,
    ABIS['OPTIMISM']['PERP_CLEARINGHOUSE_PROXY'],
    PROVIDER
)

const OPTIMISM_PERP_ACCOUNTBALANCE_CONTRACT = '0xA7f3FC32043757039d5e13d790EE43edBcBa8b7c'
const OPTIMISM_PERP_ACCOUNTBALANCE_PROXY_INTERACTION = new ethers.Contract(
    OPTIMISM_PERP_ACCOUNTBALANCE_CONTRACT,
    ABIS['OPTIMISM']['PERP_ACCOUNTBALANCE_PROXY'],
    PROVIDER
)

// Lyra contracts
const ARBITRUM_LYRA_OPTIONMARKET_CONTRACT = '0x919E5e0C096002cb8a21397D724C4e3EbE77bC15'
const ARBITRUM_LYRA_OPTIONMARKET_INTERACTION = new ethers.Contract(
    ARBITRUM_LYRA_OPTIONMARKET_CONTRACT,
    ABIS['ARBITRUM']['LYRA_OPTIONMARKET'],
    PROVIDER
)

// Velodrome contracts
const OPTIMISM_VELODROME_ROUTER_CONTRACT = '0x9c12939390052919aF3155f41Bf4160Fd3666A6f'
const OPTIMISM_VELODROME_ROUTER_INTERACTION = new ethers.Contract(
    OPTIMISM_VELODROME_ROUTER_CONTRACT,
    ABIS['OPTIMISM']['VELODROME_ROUTER'],
    PROVIDER
)

// Liquity contracts
const ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_CONTRACT = '0x24179cd81c9e782a4096035f7ec97fb8b783e007'
const ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_INTERACTION = new ethers.Contract(
    ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_CONTRACT,
    ABIS['ETHEREUM']['LIQUITY_BORROWERS_OPERATIONS'],
    PROVIDER
)

// Gearbox contracts


// dYdX contracts


// Perp Vault tokens
const OPTIMISM_PERP_VAULT_TOKENS = {
    'ETH' : {
        'address' : '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
        'decimals' : 18,
    },
    'FRAX' : {
        'address' : '0x2E3D870790dC77A83DD1d18184Acc7439A53f475',
        'decimals' : 18,
    },
    'OP' : {
        'address' : '0x4200000000000000000000000000000000000042',
        'decimals' : 18,
    },
    'USDC' : {
        'address' : '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
        'decimals' : 6,
    },
    'USDT' : {
        'address' : '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
        'decimals' : 6,
    },
    'WETH' : {
        'address' : '0x4200000000000000000000000000000000000006',
        'decimals' : 18,
    },
}

const OPTIMISM_PERP_POOL_TOKENS = [
    'vAAVE',
    'vATOM',
    'vAPE',
    'vAVAX',
    'vBNB',
    'vBTC',
    'vCRV',
    'vETH',
    'vFLOW',
    'vFTM',
    'vLINK',
    'vNEAR',
    'vONE',
    'vOP',
    'vPERP',
    'vSAND',
    'vSOL',
    'vMATIC',
]

// Get balances
async function getBalanceEther(address) {
    return ethers.utils.formatEther(await PROVIDER.getBalance(address))
}
async function getErc20Balance(contractAddress, decimals) {
    contractAddress = generateErc20Contract(contractAddress)
    balanceOfWei = await contractAddress.balanceOf(
        $("#selected-account").text(),
    )

    return ethers.utils.formatUnits(balanceOfWei, decimals)
}
async function getOptimismPerpBalance(contractAddress, decimals) {
    balanceOfWei = await OPTIMISM_PERP_VAULT_PROXY_INTERACTION.getBalanceByToken(
        $("#selected-account").text(),
        contractAddress
    )

    return ethers.utils.formatUnits(balanceOfWei, decimals)
}
async function checkAllOptimismPerpBalances() {
    // Wallet
    $("#eth-optimism-balance").text(await getBalanceEther($("#selected-account").text()))
    $("#weth-optimism-balance").text(await getErc20Balance(OPTIMISM_PERP_VAULT_TOKENS['WETH']['address'], OPTIMISM_PERP_VAULT_TOKENS['WETH']['decimals']))
    $("#usdc-optimism-balance").text(await getErc20Balance(OPTIMISM_PERP_VAULT_TOKENS['USDC']['address'], OPTIMISM_PERP_VAULT_TOKENS['USDC']['decimals']))

    // Perp
    $("#eth-optimism-perp-balance").text(await getOptimismPerpBalance(OPTIMISM_PERP_VAULT_TOKENS['ETH']['address'], 18))
    $("#weth-optimism-perp-balance").text(await getOptimismPerpBalance(OPTIMISM_PERP_VAULT_TOKENS['WETH']['address'], OPTIMISM_PERP_VAULT_TOKENS['WETH']['decimals']))
    $("#usdc-optimism-perp-balance").text(await getOptimismPerpBalance(OPTIMISM_PERP_VAULT_TOKENS['USDC']['address'], OPTIMISM_PERP_VAULT_TOKENS['USDC']['decimals']))
}

const getCoingeckoPrice = async () => {
	let tokenIds = []
	for(ticker in coingeckoTickers) {
		tokenIds.push(coingeckoTickers[ticker].ticker)
	}
	const response = await fetch(COINGECKO_URI + tokenIds.join(","))
	const prices = await response.json()
	// Hydrate tickers array to add price
	for (symbol in coingeckoTickers) {
		if (prices[coingeckoTickers[symbol].ticker]) {
			coingeckoTickers[symbol].price = prices[coingeckoTickers[symbol].ticker].usd
		}
	}

    console.log('coingeckoTickers::', coingeckoTickers)
}

// parse vTokens into getCoingeckoPrice
async function getCoingeckoPriceFromVtokens(vTokens) {
    const symbol = vTokens.replace('v', '').toLowerCase()

    // DEBUG
    console.log("symbol::", symbol)

    return Number(coingeckoTickers[symbol].price)
}

// Hydrate deposit vault
async function hydrateDepositVault() {
    const select = document.querySelector('#deposit-collateral-optimism-perp-select');

    for (const token in OPTIMISM_PERP_VAULT_TOKENS) {
        const option = document.createElement('option');
        option.value = token;
        option.text = token;
        select.appendChild(option);
    }
}

// Hydrate withdraw vault
async function hydrateWithdrawVault() {
    const select = document.querySelector('#withdraw-collateral-optimism-perp-select');

    for (const token in OPTIMISM_PERP_VAULT_TOKENS) {
        const option = document.createElement('option');
        option.value = token;
        option.text = token;
        select.appendChild(option);
    }
}

// Hydrate open positions
async function hydrateOpenPositions() {
    const select = document.querySelector('#open-position-vtoken-optimism-perp-select');

    for (const token in OPTIMISM_PERP_POOL_TOKENS) {
        const option = document.createElement('option');
        option.value = OPTIMISM_PERP_POOL_TOKENS[token];
        option.text = OPTIMISM_PERP_POOL_TOKENS[token];
        select.appendChild(option);
    }
}

// Hydrate close positions
async function hydrateClosePositions() {
    const select = document.querySelector('#close-position-vtoken-optimism-perp-select');

    for (const token in OPTIMISM_PERP_POOL_TOKENS) {
        const option = document.createElement('option');
        option.value = OPTIMISM_PERP_POOL_TOKENS[token];
        option.text = OPTIMISM_PERP_POOL_TOKENS[token];
        select.appendChild(option);
    }
}

// Get PerpV2 metadata
async function getPerpetualMetadata() {
    const response = await fetch(PERP_METADATA_URI)
	return await response.json()
}

// Get Chainlink oracle price feed
async function getChainlinkOraclePriceFeed(oraclePriceFeedAddress) {
    const oraclePriceFeedContract = generateVtokenContract(oraclePriceFeedAddress)
    const price = await oraclePriceFeedContract.getPrice()

    return ethers.utils.formatEther(price)
}

function addPerpPositionRow(symbol, side, amount) {
    // Symbol
    var x = document.createElement("tr")
    var a = document.createElement("td")
    var anode = document.createTextNode(symbol)
    a.appendChild(anode)
    x.appendChild(a)

    // Side
    a = document.createElement("td")
    anode = document.createTextNode(side)
    a.appendChild(anode)
    x.appendChild(a)

    // Amount
    a = document.createElement("td")
    anode = document.createTextNode(amount)
    a.appendChild(anode)
    x.appendChild(a)

    a = document.createElement("td")
    a.setAttribute('class', 'input-group')
    anode = document.createElement('input')
    anode.setAttribute('type', 'number')
    anode.setAttribute('value', '1')
    a.appendChild(anode)

    div = document.createElement('div')
    div.setAttribute('class', 'input-group-append')
    a.appendChild(div)
    
    span = document.createElement('span')
    span.setAttribute('class', 'input-group-text')
    span.innerText = '%'
    div.appendChild(span)
    
    x.appendChild(a)

    // col button
    a = document.createElement("td")
    anode = document.createElement('button')
    anode.setAttribute('type', 'button')
    anode.setAttribute('class', 'btn btn-dark close-prep-optimism-position-button')
    anode.innerText = 'Close position'
    a.appendChild(anode)
    x.appendChild(a)

    document.querySelector("#perp-positions tbody").appendChild(x)
}

// Hydrate PerpV2 positions
async function hydratePerpPositions() {
    console.log("DEBUG:: PerpV2 positions hydrated - In progress")
    // Clean table
    document.querySelector("#perp-positions tbody").innerHTML = "";

    for (const vToken in OPTIMISM_PERP_POOL_TOKENS) {
        const symbol = OPTIMISM_PERP_POOL_TOKENS[vToken]
        tuppleResponse = await OPTIMISM_PERP_ACCOUNTBALANCE_PROXY_INTERACTION.getAccountInfo(
            $("#selected-account").text(),
            PERPV2_METADATA['contracts'][symbol]['address']
        )

        const amount = ethers.utils.formatEther(tuppleResponse[0])

        if (amount != 0.0) {
            // Side position
            let side = "long"
            if (amount < 0) side = "short"

            addPerpPositionRow(symbol, side, amount)

            // console.log("DEBUG::tuppleResponse", tuppleResponse)
            // console.log("DEBUG::tuppleResponse[0]", ethers.utils.formatEther(tuppleResponse[0]))
            // console.log("DEBUG::tuppleResponse[1]", ethers.utils.formatEther(tuppleResponse[1]))
            // console.log("DEBUG::tuppleResponse[2]", ethers.utils.formatEther(tuppleResponse[2]))
        }
    }
    console.log("DEBUG:: PerpV2 positions hydrated - Finished !")
}

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
    // Get coingecko tokens price
    //getCoingeckoPrice()

    // Init vTokensList
    await hydrateDepositVault()
    await hydrateWithdrawVault()
    await hydrateOpenPositions()
    await hydrateClosePositions()

    // Initi PerpV2 metadata
    PERPV2_METADATA = await getPerpetualMetadata()
    // console.log("PERPV2_METADATA::", PERPV2_METADATA)

    // Wallet - Optimism - Balances 
    $("#eth-optimism-balance-button").click(async function() {
        etherBalance = await getBalanceEther($("#selected-account").text())
        $("#eth-optimism-balance").text(etherBalance)
    })
    $("#weth-optimism-balance-button").click(async function() {
        const balanceOf = getErc20Balance(OPTIMISM_PERP_VAULT_TOKENS['WETH']['address'], OPTIMISM_PERP_VAULT_TOKENS['WETH']['decimals'])
        $("#weth-optimism-balance").text(balanceOf)
    })
    $("#usdc-optimism-balance-button").click(async function() {
        const balanceOf = getErc20Balance(OPTIMISM_PERP_VAULT_TOKENS['USDC']['address'], OPTIMISM_PERP_VAULT_TOKENS['USDC']['decimals'])
        $("#usdc-optimism-balance").text(balanceOf)
    })

    // PerpV2 - Optimism - Balances
    $("#eth-optimism-perp-balance-button").click(async function() {
        const balanceOf = getOptimismPerpBalance(OPTIMISM_PERP_VAULT_TOKENS['ETH']['address'], 18)
        $("#eth-optimism-perp-balance").text(balanceOf)
    })
    $("#weth-optimism-perp-balance-button").click(async function() {
        const balanceOf = getOptimismPerpBalance(OPTIMISM_PERP_VAULT_TOKENS['WETH']['address'], OPTIMISM_PERP_VAULT_TOKENS['WETH']['decimals'])
        $("#weth-optimism-perp-balance").text(balanceOf)
    })
    $("#usdc-optimism-perp-balance-button").click(async function() {
        const balanceOf = getOptimismPerpBalance(OPTIMISM_PERP_VAULT_TOKENS['USDC']['address'], OPTIMISM_PERP_VAULT_TOKENS['USDC']['decimals'])
        $("#usdc-optimism-perp-balance").text(balanceOf)
    })

    // PerpV2 - Optimism - Check all balances
    $("#total-optimism-perp-balance-button").click(async function() {
        await checkAllOptimismPerpBalances()
    })
    
    // PerpV2 - Optimism - Positions
    $("#optimism-perp-positions-button").click(async function() {
        await hydratePerpPositions() 
    })

    // PerpV2 - Optimism - Deposit
    $("#deposit-optimism-perp-vault-button").click(async function() {
        // Get option value of select id "deposit-collateral-optimism-perp-select"
        const collateral = $("#deposit-collateral-optimism-perp-select").val()
        const amount = $("#deposit-optimism-perp-vault-amount").val()
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
                OPTIMISM_PERP_VAULT_TOKENS[collateral]['address'],
                ethers.utils.parseUnits(amount, OPTIMISM_PERP_VAULT_TOKENS[collateral]['decimals']),
                {
                    gasLimit: 200000
                }
            )
            console.log("tx::", tx)
        }
    })

    // PerpV2 - Optimism - Withdraw
    $("#withdraw-optimism-perp-vault-button").click(async function() {
        const collateral = $("#withdraw-collateral-optimism-perp-select").val()
        const amount = $("#withdraw-optimism-perp-vault-amount").val()
        const vaultContract = await OPTIMISM_PERP_VAULT_PROXY_INTERACTION.connect(SIGNER)

        if (collateral === 'ETH') {
            const tx = await vaultContract.withdrawEther(
                ethers.utils.parseUnits(amount, 18),
                {
                    gasLimit: 400000
                }
            )
            console.log("tx::", tx)
        } else {
            const tx = await vaultContract.withdraw(
                OPTIMISM_PERP_VAULT_TOKENS[collateral]['address'],
                ethers.utils.parseUnits(amount, OPTIMISM_PERP_VAULT_TOKENS[collateral]['decimals']),
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
        const baseToken = PERPV2_METADATA['contracts'][vtoken]['address']
        const isExactInput = true
        const oppositeAmountBound = "0"
        const sqrtPriceLimitX96 = "0"
        const timestamp = currentDate.getTime();
        const deadline = timestamp + 300000; // + 5 minutes
        const referralCode = "0x0000000000000000000000000000000000000000000000000000000000000000"
        
        // DEBUG transaction
        console.log("transaction_debug::",  {
            "baseToken": baseToken,
            "isBaseToQuote": isBaseToQuote,
            "isExactInput": isExactInput,
            "amount": ethers.utils.parseUnits(amount, 18),
            "oppositeAmountBound": oppositeAmountBound,
            "deadline": deadline,
            "sqrtPriceLimitX96": sqrtPriceLimitX96,
            "referralCode": referralCode
        })

        const clearingHouseContract = await OPTIMISM_PERP_CLEARINGHOUSE_PROXY_INTERACTION.connect(SIGNER)

        const tx = await clearingHouseContract.openPosition([
            baseToken,
            isBaseToQuote,
            isExactInput,
            ethers.utils.parseUnits(amount, 18),
            oppositeAmountBound,
            deadline,
            sqrtPriceLimitX96,
            referralCode,
            {
                gasLimit: 2500000
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

    // PerpV2 - Optimism - Close Position
    async function closeOptimismPerpPosition(button) {
        const row = button.parent().parent()
        console.log("row::", row)
        const vToken = row[0].cells[0].textContent
        const sidePosition = row[0].cells[1].textContent
        const amount = Number(row[0].cells[2].textContent)
        const slippage = Number(row[0].cells[3].getElementsByTagName('input')[0].value)
        const currentDate = new Date()
        const baseToken = PERPV2_METADATA['contracts'][vToken]['address']
        let oppositeAmountBound = 0
        const sqrtPriceLimitX96 = "0"
        const timestamp = currentDate.getTime();
        const deadline = timestamp + 300000; // + 5 minutes
        const referralCode = "0x0000000000000000000000000000000000000000000000000000000000000000"

        const chainlinkOraclePriceFeed = await getChainlinkOraclePriceFeed(PERPV2_METADATA['contracts'][vToken + 'vUSDUniswapV3PriceFeed']['address'])
        const price = Number(chainlinkOraclePriceFeed)
        console.log("price::", typeof price, price)
        console.log("amount::", typeof amount, amount)
        console.log("slippage::", typeof slippage, slippage)

        if (sidePosition == 'long') {
            oppositeAmountBound = (price - ((price * slippage) / 100)) * amount
        } else {
            oppositeAmountBound = (price + ((price * slippage) / 100)) * amount
        }
        console.log("oppositeAmountBound::", typeof oppositeAmountBound, oppositeAmountBound)

        // DEBUG transaction
        console.log("transaction_debug::", {
            "baseToken": baseToken,
            "sqrtPriceLimitX96": sqrtPriceLimitX96,
            "oppositeAmountBound": oppositeAmountBound,
            "deadline": deadline,
            "referralCode": referralCode
        })

        const clearingHouseContract = await OPTIMISM_PERP_CLEARINGHOUSE_PROXY_INTERACTION.connect(SIGNER)

        const tx = await clearingHouseContract.closePosition([
            baseToken,
            sqrtPriceLimitX96,
            ethers.utils.parseUnits(oppositeAmountBound.toString(), 18),
            deadline,
            referralCode,
            {
                gasLimit: 1500000
            }

            // address baseToken; -> vToken base address
            // uint160 sqrtPriceLimitX96; -> is a restriction on the ending price after the swap, where sqrtPriceLimitX96 is defined here. For no restriction, you can enter 0. ???
            // uint256 oppositeAmountBound; -> is a restriction on how many tokens to receive or pay, depending on isBaseToQuote and isExactInput. ??? (vUSD VALUE !!???)
            // uint256 deadline; -> sets a deadline for executing the transaction. You can use a Unix time converter to enter this parameter, by converting a custom date 15 minutes ahead of the current time to Unix timestamp: https://awebanalysis.com/en/unix-timestamp-converter/ ???
            // bytes32 referralCode; -> is used to add your referral code (or use 0x0000000000000000000000000000000000000000000000000000000000000000 if you do not have a code to apply). ???
        ])

        console.log("tx::", tx)
    }
    // PerpV2 - Optimism - Close position on click
    $('#perp-positions').on('click', '.close-prep-optimism-position-button', function() {
        const button = $(this)
        closeOptimismPerpPosition(button)
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
            // OPTIMISM_PERP_VAULT_TOKENS['USDC']['address']
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

// Kick in the UI action after Web3modal dialog has chosen a provider
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

// Connect wallet button pressed.
async function onConnect() {
    // console.log("Opening a dialog", web3Modal)
    try {
        const PROVIDER = await web3Modal.connect();
    } catch(e) {
        console.log("Could not get a wallet connection", e)
        return
    }

    // Subscribe to accounts change
    PROVIDER.on("accountsChanged", (accounts) => {
        console.log("accountsChanged")
        fetchAccountData()
    });

    // Subscribe to chainId change
    PROVIDER.on("chainChanged", (chainId) => {
        console.log("chainChanged")
        fetchAccountData()
    });

    // Subscribe to networkId change
    PROVIDER.on("networkChanged", (networkId) => {
        console.log("networkChanged")
        fetchAccountData()
    });

    await refreshAccountData()
    await refreshDataAfterLogin()
}

// Disconnect wallet button pressed.
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

// Refresh data after login connexion
async function refreshDataAfterLogin() {
    await hydratePerpPositions()
}

// Main entry point.
window.addEventListener('load', async () => {
    init();
    document.querySelector("#btn-connect").addEventListener("click", onConnect);
    document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
})
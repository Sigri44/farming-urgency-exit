// Liquity contracts
const ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_CONTRACT = '0x24179cd81c9e782a4096035f7ec97fb8b783e007'
const ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_INTERACTION = new ethers.Contract(
    ETHEREUM_LIQUITY_BORROWERS_OPERATIONS_CONTRACT,
    ABIS['ETHEREUM']['LIQUITY']['LIQUITY_BORROWERS_OPERATIONS'],
    PROVIDER
)

$(document).ready(async function() {
    console.log("DEBUG::Liquity loaded.")
    
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
})
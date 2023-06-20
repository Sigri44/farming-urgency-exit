// Lyra contracts
// ETH market (Newport) - Option Market // ETH
const ETHEREUM_ASYMETRIX_STAKEPRIZEPOOL_CONTRACT = '0x82d24dd5041a3eb942cca68b319f1fda9eb0c604'
const ETHEREUM_ASYMETRIX_STAKEPRIZEPOOL_INTERACTION = new ethers.Contract(
    ETHEREUM_ASYMETRIX_STAKEPRIZEPOOL_CONTRACT,
    ABIS['ETHEREUM']['ASYMETRIX']['ASYMETRIX_STAKEPRIZEPOOL'],
    PROVIDER
)

$(document).ready(async function() {
    console.log("DEBUG::Asymetrix loaded.")

    // Asymetrix - Ethereum - Withdraw stETH
    $("#withdraw-steth-ethereum-asymetrix-button").click(async function() {
        const amount = $("#collateral-ethereum-asymetrix-stakeprizepool-amount").val()

        const stakePrizePoolContract = await ETHEREUM_ASYMETRIX_STAKEPRIZEPOOL_INTERACTION.connect(SIGNER)

        const tx = await stakePrizePoolContract.withdrawFrom(
            $("#selected-account").text(),
            ethers.utils.parseUnits(amount, 18)
        )

        console.log("tx::", tx)
    })
})
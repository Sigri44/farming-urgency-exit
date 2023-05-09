// Lyra contracts
const ARBITRUM_LYRA_OPTIONMARKET_CONTRACT = '0x919E5e0C096002cb8a21397D724C4e3EbE77bC15'
const ARBITRUM_LYRA_OPTIONMARKET_INTERACTION = new ethers.Contract(
    ARBITRUM_LYRA_OPTIONMARKET_CONTRACT,
    ABIS['ARBITRUM']['LYRA']['LYRA_OPTIONMARKET'],
    PROVIDER
)

const OPTIMISM_LYRA_OPTIONMARKET_CONTRACT = '0xCCE7819d65f348c64B7Beb205BA367b3fE33763B'
const OPTIMISM_LYRA_OPTIONMARKET_INTERACTION = new ethers.Contract(
    OPTIMISM_LYRA_OPTIONMARKET_CONTRACT,
    ABIS['OPTIMISM']['LYRA']['LYRA_OPTIONMARKET'],
    PROVIDER
)

const OPTIMISM_LYRA_OPTIONTOKEN_CONTRACT = '0xCfDfF4E171133D55dE2e45c66a0E144a135D93f2'
const OPTIMISM_LYRA_OPTIONTOKEN_INTERACTION = new ethers.Contract(
    OPTIMISM_LYRA_OPTIONTOKEN_CONTRACT,
    ABIS['OPTIMISM']['LYRA']['LYRA_OPTIONTOKEN'],
    PROVIDER
)

$(document).ready(async function() {
    console.log("DEBUG::Lyra loaded.")
    /***********
    * ARBITRUM *
    ************/

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
            "strikeId": strikeId,
            "positionId": positionId,
            "iterations": iterations,
            "optionType": optionType,
            "amount": amount,
            "setCollateralTo": setCollateralTo,
            "minTotalCost": minTotalCost,
            "maxTotalCost": maxTotalCost,
            "referralCode": referralCode
        }
        console.log("transaction_debug::", transaction_debug)

        const optionMarketContract = await ARBITRUM_LYRA_OPTIONMARKET_INTERACTION.connect(SIGNER)

        const tx = await optionMarketContract.closePosition([
            strikeId,
            positionId,
            iterations,
            optionType,
            amount,
            setCollateralTo,
            minTotalCost,
            maxTotalCost,
            referralCode,

            // 0 - params.strikeId	: uint256	231
            // 1 - params.positionId	: uint256	7921
            // 2 - params.iterations	: uint256	3
            // 3 - params.optionType	: uint8	0
            // 4 - params.amount	: uint256	1000000000000000000
            // 5 - params.setCollateralTo	: uint256	0
            // 6 - params.minTotalCost	: uint256	4644766700520098715
            // 7 - params.maxTotalCost	: uint256	115792089237316195423570985008687907853269984665640564039457584007913129639935
            // 8 - params.referrer	: address	0x0000000000000000000000000000000000000000
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

    /***********
    * OPTIMISM *
    ************/
    // Lyra - Optimism - Check positions
    $("#check-balances-optimism-lyra-button").click(async function() {
        // balanceOfWei = await OPTIMISM_PERP_VAULT_INTERACTION.getBalanceByToken(
        tuppleResponse = await ARBITRUM_LYRA_OPTIONMARKET_INTERACTION.getOwnerPositions(
            $("#selected-account").text()
        )

        console.log("tuppleResponse::", typeof tuppleResponse, tuppleResponse)

        // balanceOf = ethers.utils.formatUnits(balanceOfWei, 18)
        // $("#usdc-optimism-perp-balance").text(balanceOf)
    })

    // Lyra - Optimism - Sell ETH CALL
    $("#close-position-optimism-lyra-button").click(async function() {
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
            "optionMarket": optionMarket,
            "strikeId": strikeId,
            "positionId": positionId,
            "iterations": iterations,
            "optionType": optionType,
            "amount": amount,
            "setCollateralTo": setCollateralTo,
            "minTotalCost": minTotalCost,
            "maxTotalCost": maxTotalCost,
            "referralCode": referralCode
        }
        console.log("transaction_debug::", transaction_debug)

        const optionMarketContract = await ARBITRUM_LYRA_OPTIONMARKET_INTERACTION.connect(SIGNER)

        const tx = await optionMarketContract.closePosition([
            optionMarket,
            strikeId,
            positionId,
            iterations,
            optionType,
            amount,
            setCollateralTo,
            minTotalCost,
            maxTotalCost,
            referralCode,

            // 0 - params.optionMarket	: address	0x1d42a98848e022908069c2c545aE44Cc78509Bc8
            // 1 - params.strikeId	: uint256	231
            // 2 - params.positionId	: uint256	7921
            // 3 - params.iterations	: uint256	3
            // 4 - params.setCollateralTo	: uint256	0
            // 5 - params.currentCollateral	: uint256	1407009431295292672
            // 6 - params.amount	: uint256	1000000000000000000
            // 7 - params.minTotalCost	: uint256	4644766700520098715
            // 8 - params.maxTotalCost	: uint256	115792089237316195423570985008687907853269984665640564039457584007913129639935
            // 9 - params.inputAmount	: uint256	379387823909808898048
            // 10 - params.inputAsset	: address	0x0000000000000000000000000000000000000000

            // Ex close 1 sETH contract :
            // ["0xc7f1A22c30aE981E6A74a0267CE6cBBF27D8ecD5", "61", "0", "1", "0", "0", "1000000000000000", "0", "72640965621474238", "73509", "0x7F5c764cBc14f9669B88837ca1490cCa17c31607"]
        ])

        console.log("tx::", tx)
    })
})
// Lyra contracts
const ARBITRUM_LYRA_OPTIONMARKET_CONTRACT = '0x919E5e0C096002cb8a21397D724C4e3EbE77bC15'
const ARBITRUM_LYRA_OPTIONMARKET_INTERACTION = new ethers.Contract(
    ARBITRUM_LYRA_OPTIONMARKET_CONTRACT,
    ABIS['ARBITRUM']['LYRA_OPTIONMARKET'],
    PROVIDER
)

$(document).ready(async function() {
    console.log("DEBUG::Lyra loaded.")
    
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
})
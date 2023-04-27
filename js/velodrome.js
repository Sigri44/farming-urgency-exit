// Velodrome contracts
const OPTIMISM_VELODROME_ROUTER_CONTRACT = '0x9c12939390052919aF3155f41Bf4160Fd3666A6f'
const OPTIMISM_VELODROME_ROUTER_INTERACTION = new ethers.Contract(
    OPTIMISM_VELODROME_ROUTER_CONTRACT,
    ABIS['OPTIMISM']['VELODROME_ROUTER'],
    PROVIDER
)

$(document).ready(async function() {
    console.log("DEBUG::Velodrome loaded.")

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

    // deposit (Gauge1) : https://optimistic.etherscan.io/tx/0x858cc79b2d6718be07648f972ec6f13a007f3ec0c73e5723fad4b8ca7fd5ad51
    // withdraw (Gauge2) : https://optimistic.etherscan.io/tx/0xd12a48e2955b9cd5f639f11dd274058e057c28d55ca3856ef13cabe192e7d9c8
    // addLiquidity (router) : https://optimistic.etherscan.io/tx/0x25b18e5022bd2ad6d0cdc3054b4dc01be6cf6b1f01a3d2d10478e97245f11e57
    // removeLiquidity (router) : https://optimistic.etherscan.io/tx/0x845f74d58cf44e99367de28d8059a3b6a4c8b6bfb83ff769a6c012d261ea0f04

    // Velodrome - Optimism - 
    $("#add-liquidity-optimism-velodrome-button").click(async function() {
        console.log("PROVIDER::", typeof PROVIDER, PROVIDER)
        const addLiquidity = OPTIMISM_VELODROME_ROUTER_INTERACTION.addLiquidity(

            // tokenA (address)
            // tokenA (address)
            // tokenB (address)
            // tokenB (address)
            // stable (bool)
            // stable (bool)
            // amountADesired (uint256)
            // amountADesired (uint256)
            // amountBDesired (uint256)
            // amountBDesired (uint256)
            // amountAMin (uint256)
            // amountAMin (uint256)
            // amountBMin (uint256)
            // amountBMin (uint256)
            // to (address)
            // to (address)
            // deadline (uint256)
            // deadline (uint256)
        )

        console.log("addLiquidity::", addLiquidity)
    })
})
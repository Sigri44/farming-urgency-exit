// Velodrome contracts
const OPTIMISM_VELODROME_ROUTER_CONTRACT = '0x9c12939390052919aF3155f41Bf4160Fd3666A6f'
const OPTIMISM_VELODROME_ROUTER_INTERACTION = new ethers.Contract(
    OPTIMISM_VELODROME_ROUTER_CONTRACT,
    ABIS['OPTIMISM']['VELODROME']['VELODROME_ROUTER'],
    PROVIDER
)

// Perp Vault tokens
const OPTIMISM_VELODROME_TOKENS = {
    'agEUR' : {
        'address' : '0x9485aca5bbBE1667AD97c7fE7C4531a624C8b1ED',
        'decimals' : 18,
    },
    'DAI' : {
        'address' : '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
        'decimals' : 18,
    },
    'LUSD' : {
        'address' : '0xc40F949F8a4e094D1b49a23ea9241D289B7b2819',
        'decimals' : 18,
    },
    'OP' : {
        'address' : '0x4200000000000000000000000000000000000042',
        'decimals' : 18,
    },
    'rETH' : {
        'address' : '0x9Bcef72be871e61ED4fBbc7630889beE758eb81D',
        'decimals' : 18,
    },
    'sETH' : {
        'address' : '0xE405de8F52ba7559f9df3C368500B6E6ae6Cee49',
        'decimals' : 18,
    },
    'sUSD' : {
        'address' : '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9',
        'decimals' : 18,
    },
    'USDC' : {
        'address' : '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
        'decimals' : 6,
    },
    'USDT' : {
        'address' : '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
        'decimals' : 6,
    },
    'USD+' : {
        'address' : '0x73cb180bf0521828d8849bc8CF2B920918e23032',
        'decimals' : 6,
    },
    'VELO' : {
        'address' : '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
        'decimals' : 18,
    },
    'WETH' : {
        'address' : '0x4200000000000000000000000000000000000006',
        'decimals' : 6,
    },
    'wstETH' : {
        'address' : '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb',
        'decimals' : 18,
    },
}

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
        const currentDate = new Date()
        const timestamp = currentDate.getTime()
        const deadline = timestamp + 300000 // + 5 minutes
        const tokenA = (address)
        const tokenB = (address)
        const liquidity = $("withdraw-optimism-velodrome-vault-amount").val() // amount of LP tokens
        const isStable = $("type-optimism-velodrome-select").val()
        const amountAMin = (uint256) // slippage
        const amountBMin = (uint256) // slippage
        const to = $("#selected-account").text()

        const removeLiquidity = OPTIMISM_VELODROME_ROUTER_INTERACTION.removeLiquidity({
            tokenA,
            tokenB,
            liquidity,
            stable,
            amountAMin,
            amountBMin,
            to,
            deadline,
        })



        console.log("removeLiquidity::", removeLiquidity)
    })
})
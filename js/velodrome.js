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

const OPTIMISM_VELODROME_GAUGE = {
    'sAMM-LUSD/DAI': {
        'gaugeAddress': '0x8b1ad293f4C1D4f66643D779637C72EAEfbb37DA',
        'pairAddress': '0xf12ba676f9045bd76f8280bf249cbe8d209276e2',
        'isStable': true,
        'tokensPair': {
            'tokenA': '0xc40F949F8a4e094D1b49a23ea9241D289B7b2819', // LUSD
            'tokenB': '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1' // DAI
        }
    },
    'sAMM-USDC/LUSD' : {
        'gaugeAddress': '0x631dCe3a422e1af1AD9d3952B06f9320e2f2ed72',
        'pairAddress': '0x207addb05c548f262219f6bfc6e11c02d0f7fdbe',
        'isStable': true,
        'tokensPair': {
            'tokenA': '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', // USDC
            'tokenB': '0xc40F949F8a4e094D1b49a23ea9241D289B7b2819' // LUSD
        }
    },
    'vAMM-wstETH/WETH': {
        'gaugeAddress': '0x150dc0e12d473347becd0f7352e9dae6cd30d8ab',
        'pairAddress': '0xc6C1E8399C1c33a3f1959f2f77349D74a373345c',
        'isStable': false,
        'tokensPair': {
            'tokenA': '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb', // wstETH
            'tokenB': '0x4200000000000000000000000000000000000006' // WETH
        }
    },
    'vAMM-WETH/rETH': {
        'gaugeAddress': '0x89c1a33011fab92e497963a6fa069aee5c1f5d44',
        'pairAddress': '0x985612ff2c9409174fedcff23d4f4761af124f88',
        'isStable': false,
        'tokensPair': {
            'tokenA': '0x4200000000000000000000000000000000000006', // WETH
            'tokenB': '0x9Bcef72be871e61ED4fBbc7630889beE758eb81D' // rETH
        }
    },
}

const ALLOWANCE_INFINITE = '115792089237316195423570985008687907853269984665640564039457584007913129639935'

// Generate gauge contract
async function generateLpContract(type, contractName) {
    return new ethers.Contract(
        OPTIMISM_VELODROME_GAUGE[contractName][type],
        ABIS['OPTIMISM']['VELODROME']['VELODROME_GAUGE'],
        PROVIDER
    )
}

// Hydrate gauge LP
async function hydrateGaugeTokens() {
    const selectGauge = document.querySelector('#gauge-optimism-velodrome-select')
    const selectGaugeLiquidity = document.querySelector('#gauge-liquidity-optimism-velodrome-select')

    for (const token in OPTIMISM_VELODROME_GAUGE) {
        const option = document.createElement('option')
        option.value = token
        option.text = token
        selectGauge.appendChild(option)
        // selectGaugeLiquidity.appendChild(option)
    }

    for (const token in OPTIMISM_VELODROME_GAUGE) {
        const option = document.createElement('option')
        option.value = token
        option.text = token
        // selectGauge.appendChild(option)
        selectGaugeLiquidity.appendChild(option)
    }
}

// Hydrate liquidity tokens
async function hydrateLiquidityTokens() {
    const selectTokenA = document.querySelector('#tokena-optimism-velodrome-select')
    const selectTokenB = document.querySelector('#tokenb-optimism-velodrome-select')

    for (const token in OPTIMISM_VELODROME_TOKENS) {
        const option = document.createElement('option')
        option.value = token
        option.text = token
        selectTokenA.appendChild(option)
        // selectTokenB.appendChild(option)
    }
    
    for (const token in OPTIMISM_VELODROME_TOKENS) {
        const option = document.createElement('option')
        option.value = token
        option.text = token
        // selectTokenA.appendChild(option)
        selectTokenB.appendChild(option)
    }
}

$(document).ready(async function() {
    console.log("DEBUG::Velodrome loaded.")

    // Init vTokensList
    // await hydrateLiquidityTokens()
    await hydrateGaugeTokens()

    // deposit (Gauge1) : https://optimistic.etherscan.io/tx/0x858cc79b2d6718be07648f972ec6f13a007f3ec0c73e5723fad4b8ca7fd5ad51
    // withdraw (Gauge2) : https://optimistic.etherscan.io/tx/0xd12a48e2955b9cd5f639f11dd274058e057c28d55ca3856ef13cabe192e7d9c8
    // addLiquidity (router) : https://optimistic.etherscan.io/tx/0x25b18e5022bd2ad6d0cdc3054b4dc01be6cf6b1f01a3d2d10478e97245f11e57
    // removeLiquidity (router) : https://optimistic.etherscan.io/tx/0x845f74d58cf44e99367de28d8059a3b6a4c8b6bfb83ff769a6c012d261ea0f04

    // Withdraw (Unstake)
    $("#withdraw-optimism-velodrome-button").click(async function() {
        const contractName = $("#gauge-optimism-velodrome-select").val()
        const OPTIMISM_VELODROME_GAUGE_INTERACTION = await generateLpContract('gaugeAddress', contractName)
        console.log('OPTIMISM_VELODROME_GAUGE_INTERACTION::', typeof OPTIMISM_VELODROME_GAUGE_INTERACTION, OPTIMISM_VELODROME_GAUGE_INTERACTION)
        const withdrawLP = await OPTIMISM_VELODROME_GAUGE_INTERACTION.withdrawAll()

        console.log("withdrawLP::", withdrawLP)
    })

    // Allowance remove liquidity
    $("#allowance-remove-liquidity-optimism-velodrome-button").click(async function() {
        const contractName = $("#gauge-liquidity-optimism-velodrome-select").val()
        const contractGaugeLP = await generateLpContract('pairAddress', contractName)
        const contractSigned = await contractGaugeLP.connect(SIGNER)
        const allowanceLP = await contractSigned.approve({
            OPTIMISM_VELODROME_ROUTER_CONTRACT,
            ALLOWANCE_INFINITE
        })

        console.log("allowanceLP::", allowanceLP)
    })

    // Velodrome - Optimism - 
    $("#remove-liquidity-optimism-velodrome-button").click(async function() {
        // DEBUG : FAKE Price
        const fakePrice = 0.70
        const price = fakePrice

        const currentDate = new Date()
        const timestamp = currentDate.getTime()
        const deadline = timestamp + 300000 // + 5 minutes
        const gauge = $("#gauge-liquidity-optimism-velodrome-select").val()
        const tokenA = OPTIMISM_VELODROME_GAUGE[gauge]['tokensPair']['tokenA']
        const tokenB = OPTIMISM_VELODROME_GAUGE[gauge]['tokensPair']['tokenB']
        const quantityTokenA = $("#quantity-token-a-optimism-velodrome-select").val()
        const quantityTokenB = $("#quantity-token-b-optimism-velodrome-select").val()
        const fakeLiquidity = 0.128
        // const liquidity = $("withdraw-optimism-velodromevelodrome-vault-amount").val() // amount of LP tokens
        const liquidity = fakeLiquidity
        // const slippage = Number(row[0].cells[3].getElementsByTagName('input')[0].value)
        const slippage = Number(1)
        const isStable = OPTIMISM_VELODROME_GAUGE[gauge]['isStable']
        const amountAMin = (price - ((price * slippage) / 100)) * quantityTokenA // slippage
        const amountBMin = (price - ((price * slippage) / 100)) * quantityTokenB // slippage
        const to = $("#selected-account").text()
        
         // DEBUG transaction
         console.log("transaction_debug::", {
            "tokenA": tokenA,
            "tokenB": tokenB,
            "liquidity": liquidity,
            "isStable": isStable,
            "amountAMin": amountAMin,
            "amountBMin": amountBMin,
            "to": to,
            "deadline": deadline
        })

        const routerContract = await OPTIMISM_VELODROME_ROUTER_INTERACTION.connect(SIGNER)

        const removeLiquidity = await routerContract.removeLiquidity({
            tokenA,
            tokenB,
            liquidity,
            isStable,
            amountAMin,
            amountBMin,
            to,
            deadline,
        })

        console.log("removeLiquidity::", removeLiquidity)
    })

    // Swap

})
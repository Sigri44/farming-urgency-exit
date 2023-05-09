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
        'isStable': 1,
        'tokensPair': {
            'tokenA': {
                'address': '0xc40F949F8a4e094D1b49a23ea9241D289B7b2819', // LUSD
                'decimals': 18
            },
            'tokenB': {
                'address': '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // DAI
                'decimals': 18
            }
        }
    },
    'sAMM-USDC/LUSD' : {
        'gaugeAddress': '0x631dCe3a422e1af1AD9d3952B06f9320e2f2ed72',
        'pairAddress': '0x207addb05c548f262219f6bfc6e11c02d0f7fdbe',
        'isStable': 1,
        'tokensPair': {
            'tokenA': {
                'address': '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', // USDC
                'decimals': 6
            },
            'tokenB': {
                'address': '0xc40F949F8a4e094D1b49a23ea9241D289B7b2819', // LUSD
                'decimals': 18
            }
        }
    },
    'vAMM-wstETH/WETH': {
        'gaugeAddress': '0x150dc0e12d473347becd0f7352e9dae6cd30d8ab',
        'pairAddress': '0xc6C1E8399C1c33a3f1959f2f77349D74a373345c',
        'isStable': 0,
        'tokensPair': {
            'tokenA': {
                'address': '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb', // wstETH
                'decimals': 18
            },
            'tokenB': {
                'address': '0x4200000000000000000000000000000000000006', // WETH
                'decimals': 18
            }
        }
    },
    'vAMM-WETH/rETH': {
        'gaugeAddress': '0x89c1a33011fab92e497963a6fa069aee5c1f5d44',
        'pairAddress': '0x985612ff2c9409174fedcff23d4f4761af124f88',
        'isStable': 0,
        'tokensPair': {
            'tokenA': {
                'address': '0x4200000000000000000000000000000000000006', // WETH
                'decimals': 18
            },
            'tokenB': {
                'address': '0x9Bcef72be871e61ED4fBbc7630889beE758eb81D', // rETH
                'decimals': 18
            }
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
    const selectGaugeLiquidity = document.querySelector('#gauge-liquidity-optimism-velodrome-select')

    for (const token in OPTIMISM_VELODROME_GAUGE) {
        const option = document.createElement('option')
        option.value = token
        option.text = token
        selectGaugeLiquidity.appendChild(option)
    }
}

// Hydrate balances
async function hydrateBalances() {
    console.log("DEBUG:: Velodrome balances hydrated - In progress")
    // Clean table
    document.querySelector("#velodrome-balances tbody").innerHTML = "";

    for (const pair in OPTIMISM_VELODROME_GAUGE) {
        const contractGauge = OPTIMISM_VELODROME_GAUGE[pair]['gaugeAddress']
        const contractPair = OPTIMISM_VELODROME_GAUGE[pair]['pairAddress']
        const stakedBalance = await getErc20Balance(contractGauge, 18)
        const unstakedBalance =  await getErc20Balance(contractPair, 18)

        if (stakedBalance != 0.0 ||unstakedBalance != 0.0) {
            addVelodromeBalanceRow(pair, stakedBalance, unstakedBalance)
        }
    }
    console.log("DEBUG:: Velodrome balances hydrated - Finished !")
}

function addVelodromeBalanceRow(pair, stakedBalance, unstakedBalance) {
    // Pair
    var x = document.createElement("tr")
    var a = document.createElement("td")
    var anode = document.createTextNode(pair)
    a.appendChild(anode)
    x.appendChild(a)

    // Staked balances
    a = document.createElement("td")
    anode = document.createTextNode(stakedBalance)
    a.appendChild(anode)
    x.appendChild(a)

    // Unstaked balances
    a = document.createElement("td")
    anode = document.createTextNode(unstakedBalance)
    a.appendChild(anode)
    x.appendChild(a)
    
    // col button
    a = document.createElement("td")
    anode = document.createElement('button')
    anode.setAttribute('type', 'button')
    anode.setAttribute('class', 'btn btn-dark withdraw-optimism-velodrome-button')
    anode.innerText = 'Withdraw / Unstake all'
    a.appendChild(anode)
    x.appendChild(a)

    document.querySelector("#velodrome-balances tbody").appendChild(x)
}

$(document).ready(async function() {
    console.log("DEBUG::Velodrome loaded.")

    // Init vTokensList
    await hydrateGaugeTokens()

    // Check all balances
    $("#check-balances-optimism-velodrome-button").click(async function() {
        await hydrateBalances() 
    })

    // Check LP Quantity
    $("#check-lp-quantity-optimism-velodrome-button").click(async function() {
        const WALLET_ADDRESS = $("#selected-account").text()
        const contractName = $("#gauge-liquidity-optimism-velodrome-select").val()

        const OPTIMISM_VELODROME_GAUGE_INTERACTION = await generateLpContract('pairAddress', contractName)
        const getLpLiquidity = await OPTIMISM_VELODROME_GAUGE_INTERACTION.balanceOf(
            WALLET_ADDRESS
        )

        const getLpLiquidityFormatted = Number(ethers.utils.formatEther(getLpLiquidity))

        $("#quantity-withdraw-optimism-velodrome").val(getLpLiquidityFormatted)
    })

    // Allowance remove liquidity
    $("#allowance-remove-liquidity-optimism-velodrome-button").click(async function() {
        const contractName = $("#gauge-liquidity-optimism-velodrome-select").val()
        const contractGaugeLP = await generateLpContract('pairAddress', contractName)
        const OPTIMISM_VELODROME_GAUGE_INTERACTION = await contractGaugeLP.connect(SIGNER)
        console.log('OPTIMISM_VELODROME_GAUGE_INTERACTION::', typeof OPTIMISM_VELODROME_GAUGE_INTERACTION, OPTIMISM_VELODROME_GAUGE_INTERACTION)

        const allowanceLP = await OPTIMISM_VELODROME_GAUGE_INTERACTION.approve(
            OPTIMISM_VELODROME_ROUTER_CONTRACT,
            ALLOWANCE_INFINITE
        )

        // console.log("allowanceLP::", allowanceLP)
    })

    // Velodrome - Optimism - 
    $("#remove-liquidity-optimism-velodrome-button").click(async function() {
        const currentDate = new Date()
        const timestamp = currentDate.getTime() / 1000 + 300 // convert ms to s & + 5 minutes
        const deadline = parseInt(timestamp.toString())
        const gauge = $("#gauge-liquidity-optimism-velodrome-select").val()
        const tokenA = OPTIMISM_VELODROME_GAUGE[gauge]['tokensPair']['tokenA']['address']
        const tokenB = OPTIMISM_VELODROME_GAUGE[gauge]['tokensPair']['tokenB']['address']
        const decimalsA = OPTIMISM_VELODROME_GAUGE[gauge]['tokensPair']['tokenA']['decimals']
        const decimalsB = OPTIMISM_VELODROME_GAUGE[gauge]['tokensPair']['tokenB']['decimals']
        const quantityTokenA = $("#quantity-token-a-optimism-velodrome-select").val()
        const quantityTokenB = $("#quantity-token-b-optimism-velodrome-select").val()
        const liquidity = $("#quantity-withdraw-optimism-velodrome").val() // amount of LP tokens
        const isStable = OPTIMISM_VELODROME_GAUGE[gauge]['isStable']
        // const amountAMin = (price - ((price * slippage) / 100)) * quantityTokenA
        const amountAMin = ethers.utils.parseUnits(quantityTokenA, decimalsA)
        // const amountBMin = (price - ((price * slippage) / 100)) * quantityTokenB
        const amountBMin = ethers.utils.parseUnits(quantityTokenB, decimalsB)
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

        const removeLiquidity = await routerContract.removeLiquidity(
            tokenA,
            tokenB,
            ethers.BigNumber.from(isStable),
            ethers.utils.parseUnits(liquidity, 18),
            amountAMin,
            amountBMin,
            to,
            deadline,
        )

        console.log("removeLiquidity::", removeLiquidity)
    })

    // Velodrome - Optimism - Withdraw LP
    async function withdrawOptimismVelodromeLp(button) {
        const row = button.parent().parent()
        console.log("row::", row)
        const contractName = row[0].cells[0].textContent
        const contractGaugeLP = await generateLpContract('gaugeAddress', contractName)
        const OPTIMISM_VELODROME_GAUGE_INTERACTION = await contractGaugeLP.connect(SIGNER)

        console.log('OPTIMISM_VELODROME_GAUGE_INTERACTION::', typeof OPTIMISM_VELODROME_GAUGE_INTERACTION, OPTIMISM_VELODROME_GAUGE_INTERACTION)
        const withdrawLP = await OPTIMISM_VELODROME_GAUGE_INTERACTION.withdrawAll()

        console.log("withdrawLP::", withdrawLP)
    }
    // Velodrome - Optimism - Close position on click
    $('#velodrome-balances').on('click', '.withdraw-optimism-velodrome-button', function() {
        const button = $(this)
        withdrawOptimismVelodromeLp(button)
    })
})
// const PERP_METADATA_URI = 'https://metadata.perp.exchange/v2/optimism.json'
const PERP_METADATA_URI = './perp_optimism_metadata.json'
let PERPV2_METADATA

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

$(document).ready(async function() {
    console.log("DEBUG::PerpV2 loaded.")

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
})
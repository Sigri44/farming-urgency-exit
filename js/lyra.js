// Lyra contracts
// ETH market (Newport) - Option Market // ETH
const ARBITRUM_LYRA_OPTIONMARKET_CONTRACT = '0x919E5e0C096002cb8a21397D724C4e3EbE77bC15'
const ARBITRUM_LYRA_OPTIONMARKET_INTERACTION = new ethers.Contract(
    ARBITRUM_LYRA_OPTIONMARKET_CONTRACT,
    ABIS['ARBITRUM']['LYRA']['LYRA_OPTIONMARKET'],
    PROVIDER
)

// ETH market (Newport) - Option Token
const ARBITRUM_LYRA_OPTIONTOKEN_CONTRACT = '0xe485155ce647157624c5e2a41db45a9cc88098c3'
const ARBITRUM_LYRA_OPTIONTOKEN_INTERACTION = new ethers.Contract(
    ARBITRUM_LYRA_OPTIONTOKEN_CONTRACT,
    ABIS['ARBITRUM']['LYRA']['LYRA_OPTIONTOKEN'],
    PROVIDER
)

// Shared Protocol addresses - Option Market // ETH
const OPTIMISM_LYRA_OPTIONMARKET_CONTRACT = '0xCCE7819d65f348c64B7Beb205BA367b3fE33763B'
const OPTIMISM_LYRA_OPTIONMARKET_INTERACTION = new ethers.Contract(
    OPTIMISM_LYRA_OPTIONMARKET_CONTRACT,
    ABIS['OPTIMISM']['LYRA']['LYRA_OPTIONMARKET'],
    PROVIDER
)

// sETH Market (Avalon) - Option Token
const OPTIMISM_LYRA_OPTIONTOKEN_CONTRACT = '0xCfDfF4E171133D55dE2e45c66a0E144a135D93f2'
const OPTIMISM_LYRA_OPTIONTOKEN_INTERACTION = new ethers.Contract(
    OPTIMISM_LYRA_OPTIONTOKEN_CONTRACT,
    ABIS['OPTIMISM']['LYRA']['LYRA_OPTIONTOKEN'],
    PROVIDER
)

const OPTION_TYPE = [
    "LONG_CALL",
    "LONG_PUT",
    "SHORT_CALL_BASE",
    "SHORT_CALL_QUOTE",
    "SHORT_PUT_QUOTE"
]

// Hydrate Arbitrum balances
async function hydrateArbitrumPositions() {
    console.log("DEBUG:: Lyra Arbitrum positions hydrated - In progress")
    // Clean table
    document.querySelector("#lyra-arbitrum-positions tbody").innerHTML = ""

    const listPositions = await ARBITRUM_LYRA_OPTIONTOKEN_INTERACTION.getOwnerPositions(
        $("#selected-account").text()
    )

    console.log("listPositions::", typeof listPositions, listPositions)

    for (const id in listPositions) {
        const positionId = listPositions[id][0]
        const strikeId = listPositions[id][1]
        const optionType = listPositions[id][2]
        const amount = ethers.utils.formatEther(listPositions[id][3])
        const collateral = Number(ethers.utils.formatEther(listPositions[id][4])).toFixed(6)
        // const state = listPositions[id][5]

        addArbitrumPositionRow(positionId, strikeId, optionType, amount, collateral)
    }
    console.log("DEBUG:: Lyra Arbitrum positions hydrated - Finished !")
}

function addArbitrumPositionRow(positionId, strikeId, optionType, amount, collateral) {
    // positionId
    var x = document.createElement("tr")
    var a = document.createElement("td")
    var anode = document.createTextNode(positionId)
    a.appendChild(anode)
    x.appendChild(a)

    // strikeId
    a = document.createElement("td")
    anode = document.createTextNode(strikeId)
    a.appendChild(anode)
    x.appendChild(a)

    // optionType
    a = document.createElement("td")
    anode = document.createTextNode(OPTION_TYPE[optionType])
    a.appendChild(anode)
    x.appendChild(a)

    // amount
    a = document.createElement("td")
    anode = document.createTextNode(amount)
    a.appendChild(anode)
    x.appendChild(a)

    // collateral
    a = document.createElement("td")
    anode = document.createTextNode(collateral)
    a.appendChild(anode)
    x.appendChild(a)

    // minTotalCost
    a = document.createElement("td")
    anode = document.createElement('input')
    anode.setAttribute('type', 'number')
    anode.setAttribute('value', '0')
    a.appendChild(anode)
    x.appendChild(a)

    //maxTotalCost
    a = document.createElement("td")
    anode = document.createElement('input')
    anode.setAttribute('type', 'number')
    anode.setAttribute('value', '0')
    a.appendChild(anode)
    x.appendChild(a)

    //inputAmount
    a = document.createElement("td")
    anode = document.createElement('input')
    anode.setAttribute('type', 'number')
    anode.setAttribute('value', '0')
    a.appendChild(anode)
    x.appendChild(a)
    
    // Button
    a = document.createElement("td")
    anode = document.createElement('button')
    anode.setAttribute('type', 'button')
    anode.setAttribute('class', 'btn btn-dark close-position-arbitrum-lyra-button')
    anode.innerText = 'Close position'
    a.appendChild(anode)
    x.appendChild(a)

    document.querySelector("#lyra-arbitrum-positions tbody").appendChild(x)
}

// Hydrate Optimism balances
async function hydrateOptimismPositions() {
    console.log("DEBUG:: Lyra Optimism positions hydrated - In progress")
    // Clean table
    document.querySelector("#lyra-optimism-positions tbody").innerHTML = ""

    const listPositions = await OPTIMISM_LYRA_OPTIONTOKEN_INTERACTION.getOwnerPositions(
        $("#selected-account").text()
    )

    console.log("listPositions::", typeof listPositions, listPositions)

    for (const id in listPositions) {
        const positionId = listPositions[id][0]
        const strikeId = listPositions[id][1]
        const optionType = listPositions[id][2]
        const amount = ethers.utils.formatEther(listPositions[id][3])
        const collateral = Number(ethers.utils.formatEther(listPositions[id][4])).toFixed(6)
        // const state = listPositions[id][5]

        addOptimismPositionRow(positionId, strikeId, optionType, amount, collateral)
    }
    console.log("DEBUG:: Lyra Optimism positions hydrated - Finished !")
}

function addOptimismPositionRow(positionId, strikeId, optionType, amount, collateral) {
    // positionId
    var x = document.createElement("tr")
    var a = document.createElement("td")
    var anode = document.createTextNode(positionId)
    a.appendChild(anode)
    x.appendChild(a)

    // strikeId
    a = document.createElement("td")
    anode = document.createTextNode(strikeId)
    a.appendChild(anode)
    x.appendChild(a)

    // optionType
    a = document.createElement("td")
    anode = document.createTextNode(OPTION_TYPE[optionType])
    a.appendChild(anode)
    x.appendChild(a)

    // amount
    a = document.createElement("td")
    anode = document.createTextNode(amount)
    a.appendChild(anode)
    x.appendChild(a)

    // collateral
    a = document.createElement("td")
    anode = document.createTextNode(collateral)
    a.appendChild(anode)
    x.appendChild(a)

    // minTotalCost
    a = document.createElement("td")
    anode = document.createElement('input')
    anode.setAttribute('type', 'number')
    anode.setAttribute('value', '0')
    a.appendChild(anode)
    x.appendChild(a)

    //maxTotalCost
    a = document.createElement("td")
    anode = document.createElement('input')
    anode.setAttribute('type', 'number')
    anode.setAttribute('value', '0')
    a.appendChild(anode)
    x.appendChild(a)

    //inputAmount
    a = document.createElement("td")
    anode = document.createElement('input')
    anode.setAttribute('type', 'number')
    anode.setAttribute('value', '0')
    a.appendChild(anode)
    x.appendChild(a)
    
    // Button
    a = document.createElement("td")
    anode = document.createElement('button')
    anode.setAttribute('type', 'button')
    anode.setAttribute('class', 'btn btn-dark close-position-optimism-lyra-button')
    anode.innerText = 'Close position'
    a.appendChild(anode)
    x.appendChild(a)

    document.querySelector("#lyra-optimism-positions tbody").appendChild(x)
}

$(document).ready(async function() {
    console.log("DEBUG::Lyra loaded.")
    /***********
    * ARBITRUM *
    ************/
    // Lyra - Arbitrum - Check positions
    $("#check-positions-arbitrum-lyra-button").click(async function() {
        await hydrateArbitrumPositions()
    })

    // Lyra - Arbitrum - Close position
    async function closePositionArbitrumLyraLp(button) {
        const row = button.parent().parent()
        console.log("row::", row)
        const strikeId = row[0].cells[1].textContent
        const positionId = row[0].cells[0].textContent
        const iterations = 1 // no need to optimize iterations as amount does not change
        const optionType =  OPTION_TYPE.indexOf(row[0].cells[2].textContent)
        const amount = Number(row[0].cells[3].textContent)
        const setCollateralTo = "0"
        const minTotalCost = row[0].cells[5].getElementsByTagName('input')[0].value
        let maxTotalCost = row[0].cells[6].getElementsByTagName('input')[0].value
        const referrer = "0x0000000000000000000000000000000000000000"

        // Set max int value if maxTotalCost is not define
        if (maxTotalCost == 0) {
            maxTotalCost = MAX_INT
        } else {
            maxTotalCost = ethers.utils.parseEther(maxTotalCost)
        }

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
            "referrer": referrer
        }
        console.log("transaction_debug::", transaction_debug)

        const optionMarketContract = await ARBITRUM_LYRA_OPTIONMARKET_INTERACTION.connect(SIGNER)

        const tx = await optionMarketContract.closePosition([
            strikeId,
            positionId,
            iterations,
            optionType,
            ethers.utils.parseEther(amount.toString()),
            ethers.utils.parseEther(setCollateralTo.toString()),
            ethers.utils.parseEther(minTotalCost.toString()),
            maxTotalCost,
            referrer
        ])

        console.log("tx::", tx)
    }
    // Lyra - Arbitrum - Close position on click
    $('#lyra-arbitrum-positions').on('click', '.close-position-arbitrum-lyra-button', function() {
        const button = $(this)
        closePositionArbitrumLyraLp(button)
    })

    /***********
    * OPTIMISM *
    ************/
    // Lyra - Optimism - Check positions
    $("#check-positions-optimism-lyra-button").click(async function() {
        console.log("DEBUG::button started")
        await hydrateOptimismPositions()
    })

    // Lyra - Optimism - Close position
    async function closePositionOptimismLyraLp(button) {
        const row = button.parent().parent()
        console.log("row::", row)
        const optionMarket = OPTIMISM_LYRA_OPTIONMARKET_CONTRACT // ETH
        const strikeId = row[0].cells[1].textContent
        const positionId = row[0].cells[0].textContent
        const iterations = 1 // no need to optimize iterations as amount does not change
        const setCollateralTo = 0
        const currentCollateral = row[0].cells[4].textContent
        const amount = row[0].cells[3].textContent
        const minTotalCost = Number(row[0].cells[5].getElementsByTagName('input')[0].value)
        const maxTotalCost = Number(row[0].cells[6].getElementsByTagName('input')[0].value)
        const inputAmount = Number(row[0].cells[7].getElementsByTagName('input')[0].value)
        const inputAsset = "0x7F5c764cBc14f9669B88837ca1490cCa17c31607" // USDC

        // Debug transaction
        const transaction_debug = {
            "optionMarket": optionMarket,
            "strikeId": strikeId,
            "positionId": positionId,
            "iterations": iterations,
            "setCollateralTo": setCollateralTo,
            "currentCollateral": currentCollateral,
            "amount": amount,
            "minTotalCost": minTotalCost,
            "maxTotalCost": maxTotalCost,
            "inputAmount": inputAmount,
            "inputAsset": inputAsset
        }
        console.log("transaction_debug::", transaction_debug)

        const optionMarketContract = await OPTIMISM_LYRA_OPTIONMARKET_INTERACTION.connect(SIGNER)

        const tx = await optionMarketContract.closePosition([
            optionMarket,
            strikeId,
            positionId,
            iterations,
            ethers.utils.parseUnits(setCollateralTo.toString(), 18),
            ethers.utils.parseUnits(currentCollateral.toString(), 18),
            ethers.utils.parseUnits(amount.toString(), 18),
            ethers.utils.parseUnits(minTotalCost.toString(), 18),
            ethers.utils.parseUnits(maxTotalCost.toString(), 18),
            ethers.utils.parseUnits(inputAmount.toString(), 18),
            inputAsset
        ])

         console.log("tx::", tx)
    }
    // Lyra - Optimism - Close position on click
    $('#lyra-optimism-positions').on('click', '.close-position-optimism-lyra-button', function() {
        const button = $(this)
        closePositionOptimismLyraLp(button)
    })
})
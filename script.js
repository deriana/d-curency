const usdInput = document.getElementById('usd');
const eurInput = document.getElementById('eur');
const idrInput = document.getElementById('idr');
const resultElement = document.getElementById('result');

usdInput.addEventListener('input', function() {
    convert('usd');
});

eurInput.addEventListener('input', function() {
    convert('eur');
});

idrInput.addEventListener('input', function() {
    convert('idr');
});

function convert(fromCurrency) {
    let amount = parseFloat(getInputValue(fromCurrency));

    if (isNaN(amount)) {
        clearResults();
        return;
    }

    let toCurrencies = ['usd', 'eur', 'idr'];
    let exchangeRates = {
        usd: { eur: 0.85, idr: 14225 },
        eur: { usd: 1.18, idr: 16664 },
        idr: { usd: 0.000070, eur: 0.000060 }
    };

    let result = {};

    toCurrencies.forEach((toCurrency) => {
        if (toCurrency !== fromCurrency) {
            result[toCurrency] = amount * exchangeRates[fromCurrency][toCurrency];
        }
    });

    displayResults(result);
}

function displayResults(results) {
    let resultHTML = '';
    for (let currency in results) {
        resultHTML += `${results[currency].toFixed(2)} ${currency} | `;
    }

    resultElement.innerHTML = resultHTML.slice(0, -2);
}

function clearResults() {
    resultElement.innerHTML = '';
}

function getInputValue(currency) {
    switch (currency) {
        case 'usd':
            return usdInput.value;
        case 'eur':
            return eurInput.value;
        case 'idr':
            return idrInput.value;
        default:
            return '';
    }
}

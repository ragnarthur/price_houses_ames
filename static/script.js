// Função para converter metros quadrados para pés quadrados
function convertToSquareFeet(squareMeters) {
    return squareMeters * 10.7639;
}

document.getElementById('prediction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const features = {
        overall_qual: parseFloat(document.getElementById('overall-qual').value),
        gr_liv_area: convertToSquareFeet(parseFloat(document.getElementById('gr-liv-area').value)),
        total_bsmt_sf: convertToSquareFeet(parseFloat(document.getElementById('total-bsmt-sf').value)),
        first_flr_sf: convertToSquareFeet(parseFloat(document.getElementById('first-flr-sf').value)),
        bsmt_fin_sf1: convertToSquareFeet(parseFloat(document.getElementById('bsmt-fin-sf1').value)),
        lot_area: convertToSquareFeet(parseFloat(document.getElementById('lot-area').value)),
        second_flr_sf: convertToSquareFeet(parseFloat(document.getElementById('second-flr-sf').value)),
        garage_cars: parseFloat(document.getElementById('garage-cars').value),
        garage_area: convertToSquareFeet(parseFloat(document.getElementById('garage-area').value)),
        year_built: parseFloat(document.getElementById('year-built').value),
        full_bath: parseFloat(document.getElementById('full-bath').value)
    };

    console.log(features); // Log para verificar se as informações estão corretas

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(features)
    })
    .then(response => response.json())
    .then(data => {
        const priceInDollars = parseFloat(data.prediction).toFixed(2);
        const conversionRate = 5.30; // Exemplo de taxa de conversão
        const priceInReais = (parseFloat(data.prediction) * conversionRate).toFixed(2);

        const formattedPriceInDollars = priceInDollars.replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(".", ".");
        const formattedPriceInReais = priceInReais.replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(".", ".");

        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `
            <p>Preço Previsto: $${formattedPriceInDollars} dólares</p>
            <p>Preço Previsto: R$${formattedPriceInReais} reais</p>
        `;
        resultElement.style.display = 'block'; // Show the result box
        resultElement.classList.add('fade-in'); // Add animation class
    })
    .catch(error => {
        const resultElement = document.getElementById('result');
        resultElement.innerText = 'Erro ao prever o preço. Tente novamente.';
        resultElement.style.display = 'block'; // Show the error message
        resultElement.classList.add('fade-in'); // Add animation class
        console.error('Erro:', error);
    });
});

document.getElementById('new-search').addEventListener('click', function() {
    document.getElementById('prediction-form').reset();
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';
    resultElement.style.display = 'none'; // Hide the result box
    resultElement.classList.remove('fade-in'); // Remove animation class
    this.style.display = 'none';
});

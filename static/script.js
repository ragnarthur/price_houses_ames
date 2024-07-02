// Função para converter metros quadrados para pés quadrados
function convertToSquareFeet(squareMeters) {
    return squareMeters * 10.7639;
}

document.getElementById('prediction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Mostrar o spinner
    document.getElementById('loading-spinner').style.display = 'block';

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
        full_bath: parseFloat(document.getElementById('full-bath').value),
        number_of_floors: parseFloat(document.getElementById('number-of-floors').value)
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
        // Simular um delay de 2 segundos
        setTimeout(() => {
            const priceInDollars = parseFloat(data.prediction).toFixed(2);
            const conversionRate = 5.30; // Exemplo de taxa de conversão
            const priceInReais = (parseFloat(data.prediction) * conversionRate).toFixed(2);

            const formattedPriceInDollars = priceInDollars.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            const formattedPriceInReais = priceInReais.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

            const resultElement = document.getElementById('result');
            resultElement.innerHTML = `
                <p>Preço Previsto: $${formattedPriceInDollars} dólares</p>
                <p>Preço Previsto: R$${formattedPriceInReais} reais</p>
            `;
            resultElement.style.display = 'block'; // Mostrar o resultado

            // Esconder o spinner
            document.getElementById('loading-spinner').style.display = 'none';
        }, 2000); // Delay de 2 segundos
    })
    .catch(error => {
        // Simular um delay de 2 segundos
        setTimeout(() => {
            const resultElement = document.getElementById('result');
            resultElement.innerText = 'Erro ao prever o preço. Tente novamente.';
            resultElement.style.display = 'block'; // Mostrar a mensagem de erro

            // Esconder o spinner
            document.getElementById('loading-spinner').style.display = 'none';
            console.error('Erro:', error);
        }, 2000); // Delay de 2 segundos
    });
});

document.getElementById('new-search').addEventListener('click', function() {
    document.getElementById('prediction-form').reset();
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').style.display = 'none'; // Esconder a caixa de resultado
    this.style.display = 'none';
});

document.getElementById('number-of-floors').addEventListener('change', function() {
    var secondFloor = document.querySelector('.second-floor');
    if (this.value == '2') {
        secondFloor.style.display = 'block';
    } else {
        secondFloor.style.display = 'none';
    }
});

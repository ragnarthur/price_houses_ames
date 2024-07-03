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
        full_bath: parseFloat(document.getElementById('full-bath').value),
        number_of_floors: parseFloat(document.getElementById('number-of-floors').value)
    };

    const year_built = features.year_built;

    console.log(features); // Log para verificar se as informações estão corretas

    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(features)
    })
    .then(response => response.json())
    .then(data => {
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
            resultElement.style.display = 'block';
            document.getElementById('loading-spinner').style.display = 'none';
            document.getElementById('chart-container').style.display = 'block';

            // Atualizar gráfico de valorização
            const years = [];
            const appreciationValues = [];
            let currentValue = parseFloat(priceInDollars);
            const annualIncreaseRate = 0.03;

            for (let year = year_built; year <= new Date().getFullYear(); year++) {
                years.push(year);
                appreciationValues.push(currentValue.toFixed(2));
                currentValue *= (1 + annualIncreaseRate);
            }

            const ctxAppreciation = document.getElementById('appreciationChart').getContext('2d');
            new Chart(ctxAppreciation, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Valorização do Imóvel (em dólares)',
                        data: appreciationValues,
                        borderColor: '#ff5733',
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#000',
                                font: {
                                    size: 14
                                }
                            }
                        }
                    }
                }
            });

        }, 2000);
    })
    .catch(error => {
        const resultElement = document.getElementById('result');
        resultElement.innerText = 'Erro ao prever o preço. Tente novamente.';
        resultElement.style.display = 'block';
        document.getElementById('loading-spinner').style.display = 'none';
        console.error('Erro:', error);
    });
});

document.getElementById('new-search').addEventListener('click', function() {
    document.getElementById('prediction-form').reset();
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('chart-container').style.display = 'none';
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

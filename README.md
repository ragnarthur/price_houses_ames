# House Price Prediction in Ames, Iowa

This project is a web application that predicts house prices in the city of Ames, Iowa, using Machine Learning techniques. The project covers from data acquisition and processing to the creation and implementation of the prediction model.

## Table of Contents

- [Project Description](#project-description)
- [Dataset Acquisition](#dataset-acquisition)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contribution](#contribution)
- [License](#license)

## Project Description

The project uses a dataset from the city of Ames, Iowa, which contains various house features to predict their prices. Features include lot area, total living area, year built, number of bathrooms, among others.

The city of Ames is located in the state of Iowa, USA, and is known for being home to Iowa State University. The dataset used in this project was originally compiled by Professor Dean De Cock for use in data science competitions.

## Dataset Acquisition

The dataset was obtained from Kaggle. You can access and download the dataset from the following link:

[Ames Housing Dataset](https://www.kaggle.com/c/house-prices-advanced-regression-techniques/data)

## Installation

### Prerequisites

Make sure you have Python 3.6+ installed on your machine. Additionally, you will need the following Python packages:

- Flask
- pandas
- scikit-learn
- numpy
- Bootstrap (for web page styling)

### Installation Steps

1. Clone this repository:

    ```sh
    git clone https://github.com/your-username/house-price-prediction.git
    cd house-price-prediction
    ```

2. Create and activate a virtual environment:

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install the dependencies:

    ```sh
    pip install -r requirements.txt
    ```

4. Run the Flask application:

    ```sh
    flask run
    ```

5. Access the application in your browser at `http://127.0.0.1:5000`.

## Usage

1. Fill in the form fields with the characteristics of the house you want to predict.
2. Click the "Predict Price" button.
3. The result will be displayed in both dollars and reais, converted with a fixed exchange rate.

## Scripts

The project contains the following scripts:

- `data_preprocessing.py`: Performs data preprocessing.
- `model_training.py`: Trains the Machine Learning model.
- `feature_importance.py`: Calculates feature importance.
- `app.py`: Main script that runs the Flask application.

### Project Structure

house-price-prediction/
│
├── data/
│ ├── raw/ # Raw data
│ ├── processed/ # Processed data
│ └── options.json # Dropdown options
│
├── scripts/
│ ├── data_preprocessing.py
│ ├── model_training.py
│ ├── feature_importance.py
│
├── static/
│ ├── style.css
│ └── script.js
│
├── templates/
│ └── index.html
│
├── app.py
├── requirements.txt
└── README.md


## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

# Previsão de Preços de Imóveis em Ames, Iowa

Este projeto é uma aplicação web que prevê os preços de imóveis na cidade de Ames, Iowa, utilizando técnicas de Machine Learning. O projeto abrange desde a aquisição e processamento de dados até a criação e implementação do modelo de previsão.

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Aquisição do Dataset](#aquisição-do-dataset)
- [Instalação](#instalação)
- [Uso](#uso)
- [Scripts](#scripts)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Descrição do Projeto

O projeto utiliza um conjunto de dados da cidade de Ames, Iowa, que contém várias características de imóveis para prever seus preços. As características incluem área do lote, área total de acabamento, ano de construção, número de banheiros, entre outras.

A cidade de Ames está localizada no estado de Iowa, EUA, e é conhecida por ser a sede da Universidade Estadual de Iowa. O dataset utilizado neste projeto foi originalmente compilado pelo professor Dean De Cock para uso em competições de ciência de dados.

## Aquisição do Dataset

O dataset foi obtido a partir do Kaggle. Você pode acessar e baixar o dataset através do seguinte link:

[Ames Housing Dataset](https://www.kaggle.com/c/house-prices-advanced-regression-techniques/data)

## Instalação

### Pré-requisitos

Certifique-se de ter o Python 3.6+ instalado em sua máquina. Além disso, você precisará dos seguintes pacotes Python:

- Flask
- pandas
- scikit-learn
- numpy
- Bootstrap (para estilização da página web)

### Passos de Instalação

1. Clone este repositório:

    ```sh
    git clone https://github.com/seu-usuario/previsao-precos-imoveis.git
    cd previsao-precos-imoveis
    ```

2. Crie e ative um ambiente virtual:

    ```sh
    python -m venv venv
    source venv/bin/activate  # No Windows: venv\Scripts\activate
    ```

3. Instale as dependências:

    ```sh
    pip install -r requirements.txt
    ```

4. Execute o aplicativo Flask:

    ```sh
    flask run
    ```

5. Acesse a aplicação no navegador em `http://127.0.0.1:5000`.

## Uso

1. Preencha os campos do formulário com as características do imóvel que você deseja prever.
2. Clique no botão "Prever Preço".
3. O resultado será exibido em dólares e reais, convertidos com uma taxa de conversão fixa.

## Scripts

O projeto contém os seguintes scripts:

- `data_preprocessing.py`: Realiza o pré-processamento dos dados.
- `model_training.py`: Treina o modelo de Machine Learning.
- `feature_importance.py`: Calcula a importância das características.
- `app.py`: Script principal que executa o aplicativo Flask.

### Estrutura do Projeto

previsao-precos-imoveis/
│
├── data/
│ ├── raw/ # Dados brutos
│ ├── processed/ # Dados processados
│ └── options.json # Opções para os dropdowns
│
├── scripts/
│ ├── data_preprocessing.py
│ ├── model_training.py
│ ├── feature_importance.py
│
├── static/
│ ├── style.css
│ └── script.js
│
├── templates/
│ └── index.html
│
├── app.py
├── requirements.txt
└── README.md


## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

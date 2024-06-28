from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)

# Carregar o modelo treinado
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/search')
def index():
    return render_template('index.html')

@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    input_data = pd.DataFrame([[
        data['overall_qual'],
        data['gr_liv_area'],
        data['total_bsmt_sf'],
        data['first_flr_sf'],
        data['bsmt_fin_sf1'],
        data['lot_area'],
        data['second_flr_sf'],
        data['garage_cars'],
        data['garage_area'],
        2024 - data['year_built'],  # Calculando a idade da casa
        data['full_bath']
    ]], columns=['Overall Qual', 'Gr Liv Area', 'Total Bsmt SF', '1st Flr SF', 'BsmtFin SF 1', 'Lot Area', '2nd Flr SF', 'Garage Cars', 'Garage Area', 'HouseAge', 'Full Bath'])
    
    prediction = model.predict(input_data)
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)

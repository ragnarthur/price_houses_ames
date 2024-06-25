import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import numpy as np
import matplotlib.pyplot as plt

# Carregar o dataset
file_path = r'C:\Users\arthu\OneDrive\Desktop\projeto_preco_casas\data\raw\AmesHousing.csv'
data = pd.read_csv(file_path)

# Colunas que queremos excluir
columns_to_exclude = ['Id', 'Alley', 'PoolQC', 'Fence', 'MiscFeature']
columns_present = [col for col in columns_to_exclude if col in data.columns]
data = data.drop(columns=columns_present)

# Analisar e tratar valores ausentes
for col in data.columns:
    if data[col].dtype == "object":
        data[col] = data[col].fillna(data[col].mode()[0])
    else:
        data[col] = data[col].fillna(data[col].mean())

# Criar nova característica: Idade da Casa, se a coluna YearBuilt existir
if 'YearBuilt' in data.columns:
    data['HouseAge'] = 2024 - data['YearBuilt']
    data = data.drop(columns=['YearBuilt'])

# Codificar variáveis categóricas
data = pd.get_dummies(data)

# Separar características e rótulo
X = data.drop(columns=['SalePrice'])
y = data['SalePrice']

# Treinar um modelo para calcular a importância das características
model = RandomForestRegressor()
model.fit(X, y)

# Calcular a importância das características
importances = model.feature_importances_
indices = np.argsort(importances)[::-1]

# Plotar a importância das características
plt.figure(figsize=(12, 8))
plt.title("Importância das Características")
plt.bar(range(X.shape[1]), importances[indices], align="center")
plt.xticks(range(X.shape[1]), X.columns[indices], rotation=90)
plt.tight_layout()
plt.show()

# Listar as características mais importantes
important_features = [(X.columns[indices[f]], importances[indices[f]]) for f in range(X.shape[1])]
for feature, importance in important_features[:20]:  # Exibir as 20 características mais importantes
    print(f"{feature}: {importance}")

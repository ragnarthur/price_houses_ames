import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Carregar o dataset
file_path = r'C:\Users\arthu\OneDrive\Desktop\projeto_preco_casas\data\raw\AmesHousing.csv'
data = pd.read_csv(file_path)

# Colunas que queremos excluir
columns_to_exclude = ['Id', 'Alley', 'PoolQC', 'Fence', 'MiscFeature']

# Verificar a existência das colunas antes de excluí-las
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

# Escalar características numéricas
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Dividir os dados em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Salvar os conjuntos de dados processados
pd.DataFrame(X_train).to_csv(r'C:\Users\arthu\OneDrive\Desktop\projeto_preco_casas\data\processed\X_train.csv', index=False)
pd.DataFrame(X_test).to_csv(r'C:\Users\arthu\OneDrive\Desktop\projeto_preco_casas\data\processed\X_test.csv', index=False)
y_train.to_csv(r'C:\Users\arthu\OneDrive\Desktop\projeto_preco_casas\data\processed\y_train.csv', index=False)
y_test.to_csv(r'C:\Users\arthu\OneDrive\Desktop\projeto_preco_casas\data\processed\y_test.csv', index=False)

print("Dados pré-processados e salvos com sucesso!")

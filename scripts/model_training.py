import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import GridSearchCV, train_test_split, cross_val_score
import pickle
import os

# Carregar o dataset original
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
if 'Year Built' in data.columns:
    data['HouseAge'] = 2024 - data['Year Built']
    data = data.drop(columns=['Year Built'])

# Codificar variáveis categóricas
data = pd.get_dummies(data)

# Usar apenas as colunas mais importantes (ajustar os nomes conforme necessário)
important_columns = ['Overall Qual', 'Gr Liv Area', 'Total Bsmt SF', '1st Flr SF', 'BsmtFin SF 1', 'Lot Area', '2nd Flr SF', 'Garage Cars', 'Garage Area', 'HouseAge', 'Full Bath']

# Certificar-se de que todas as colunas estão presentes
missing_columns = [col for col in important_columns if col not in data.columns]
if missing_columns:
    print(f"Colunas ausentes: {missing_columns}")
else:
    X = data[important_columns]
    y = data['SalePrice']

    # Dividir os dados em treino e teste
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Definir o modelo e os hiperparâmetros a serem otimizados
    model = GradientBoostingRegressor()
    param_grid = {
        'n_estimators': [100, 200, 300],
        'learning_rate': [0.01, 0.1, 0.2],
        'max_depth': [3, 4, 5],
        'min_samples_split': [2, 5, 10]
    }

    # Realizar Grid Search para otimização de hiperparâmetros
    grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=5, scoring='neg_mean_absolute_error', n_jobs=-1)
    grid_search.fit(X_train, y_train)

    # Melhor modelo após Grid Search
    best_model = grid_search.best_estimator_
    print(f'Melhores Hiperparâmetros: {grid_search.best_params_}')

    # Avaliar o modelo
    y_pred = best_model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    print(f'Mean Absolute Error: {mae}')

    # Realizar validação cruzada
    cv_scores = cross_val_score(best_model, X_train, y_train, cv=5, scoring='neg_mean_absolute_error')
    mean_cv_score = -cv_scores.mean()
    print(f'Mean Cross-Validation Score (MAE): {mean_cv_score}')

    # Criar o diretório 'app' se não existir
    os.makedirs(r'C:\Users\arthu\OneDrive\Desktop\projeto_preco_casas\app', exist_ok=True)

    # Salvar o modelo treinado
    with open(r'C:\Users\arthu\OneDrive\Desktop\projeto_preco_casas\app\model.pkl', 'wb') as f:
        pickle.dump(best_model, f)

    print("Modelo treinado e salvo com sucesso!")

import pandas as pd

# Carregar o dataset
file_path = r'C:\Users\arthu\OneDrive\Desktop\projeto_preco_casas\data\raw\AmesHousing.csv'
data = pd.read_csv(file_path)

# Colunas de interesse
columns_of_interest = ['Overall Qual', 'Full Bath', 'Year Built']

# Extrair opções únicas
options = {col: sorted(data[col].unique().tolist()) for col in columns_of_interest}

# Salvar opções em um arquivo JSON
import json
with open(r'C:\Users\arthu\OneDrive\Desktop\projeto_preco_casas\data\processed\options.json', 'w') as f:
    json.dump(options, f)

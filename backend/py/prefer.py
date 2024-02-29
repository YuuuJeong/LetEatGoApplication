import sys
import time
import numpy as np
import pandas as pd

sys.path.append("/opt/homebrew/lib/python3.9/site-packages")

def load_data(file_path):
    r_cols = ['userId', 'sex', 'foodId', 'survey', 'like', 'made', 'view']
    ratings = pd.read_csv(file_path, names=r_cols, encoding='latin-1').iloc[1:]
    ratings = ratings[['userId', 'foodId', 'survey', 'like', 'made', 'view']].astype(float)
    return ratings

def calculate_totalview(ratings):
    totalview = []
    for user_id in range(1, len(ratings) + 1):
        total_view_sum = ratings[ratings['userId'] == ratings['userId'][user_id]]['view'].sum()
        totalview.append(total_view_sum if total_view_sum != 0 else 1)
    ratings = ratings.assign(totalview=totalview)
    return ratings

def calculate_rateview(ratings):
    ratings['rateview'] = ratings['view'] / ratings['totalview']
    ratings.loc[ratings['totalview'] <= 5, 'rateview'] *= 0.5
    return ratings

def calculate_rate(ratings, a, b, c, d):
    ratings['rate'] = a * ratings['survey'] + b * ratings['like'] + c * ratings['made'] + d * ratings['rateview']
    return ratings[['userId', 'foodId', 'rate']].astype(float)

def main():
    start_time = time.time()

    file_path = "../csv/prefer.csv"
    a, b, c, d = 1, 1, 1, 2

    ratings = load_data(file_path)
    ratings = calculate_totalview(ratings)
    ratings = calculate_rateview(ratings)
    ratings = calculate_rate(ratings, a, b, c, d)

    df = ratings.pivot_table(index='userId', columns='foodId', values='rate').fillna(0)
    df = pd.DataFrame(df)

    result = df.sum().nlargest(5, keep='first')
    items = list(map(int, result.index))

    for item in out:
        print(item)

    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Execution time: {elapsed_time:.2f} seconds")

if __name__ == '__main__':
    main()

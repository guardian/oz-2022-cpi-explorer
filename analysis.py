#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
since_date = "2010-01-01"
#%%
# Components by index

df = pd.read_csv('cpi.csv')

df[['series1','category','city']] = df['series'].str.split(" ; ", expand=True)
cols = list(df.columns)
df = df[['date','value','category','city']]
df['city'] = df['city'].str.replace(" ;","")
df['city'] = df['city'].str.strip()
df['category'] = df['category'].str.strip()
unique_cats = list(df['category'].unique())
exp_class = pd.read_csv("expenditure_classes.csv")
exp_class_list = list(exp_class['expenditure_class'])
exp_class_list.append("All groups CPI")
# exp_class_list.remove("Tobacco")
# removes = [
#     "All groups CPI excluding 'volatile items'",
#     "All groups CPI excluding Alcohol and tobacco",
#     "All groups CPI excluding Clothing and footwear",
#     "All groups CPI excluding Communication",
#     "All groups CPI excluding Education",
#     "All groups CPI excluding Food and non-alcoholic beverages",
#     "All groups CPI excluding Furnishings, household equipment and services",
#     "All groups CPI excluding Health",
#     "All groups CPI excluding Housing",
#     "All groups CPI excluding Housing and Insurance and financial services",
#     "All groups CPI excluding Insurance and financial services",
#     "All groups CPI excluding Medical and hospital services",
#     "All groups CPI excluding Recreation and culture",
#     "All groups CPI excluding Transport",
#     "All groups CPI excluding food and energy",
#     "All groups CPI including deposit and loan facilities (indirect charges)"
#     ]

short = df[df['category'].isin(exp_class_list)]

short = short[short['date'] >= since_date]

# Split by cities

cities = list(short['city'].unique())

for city in cities:
    temp = short[short['city'] == city]
    temp = temp.drop_duplicates(subset=['date','category','value'])
    temp_pvt = temp.pivot(index='date',columns='category', values='value')
    temp_pvt.to_csv(f'inflation-explorer/assets/{city}-index.csv')
    
#%%    

# Components by year-on-year change

df = pd.read_csv('cpi-pct.csv')

df[['series1','category','city']] = df['series'].str.split(" ; ", expand=True)
cols = list(df.columns)
df = df[['date','value','category','city']]
df['city'] = df['city'].str.replace(" ;","")
df['city'] = df['city'].str.strip()
df['category'] = df['category'].str.strip()
unique_cats = list(df['category'].unique())
exp_class = pd.read_csv("expenditure_classes.csv")
exp_class_list = list(exp_class['expenditure_class'])
exp_class_list.append("All groups CPI")
# exp_class_list.remove("Tobacco")

short = df[df['category'].isin(exp_class_list)]

short = short[short['date'] >= since_date]

# Split by cities

cities = list(short['city'].unique())

for city in cities:
    temp = short[short['city'] == city]
    temp = temp.drop_duplicates(subset=['date','category','value'])
    temp_pvt = temp.pivot(index='date',columns='category', values='value')
    temp_pvt.to_csv(f'inflation-explorer/assets/{city}-pct_year.csv')
    
#%%

current = short[short['date'] == since_date]
current_gp = current.groupby(['category']).count()

current.to_csv('current-pct-change.csv', index=False)
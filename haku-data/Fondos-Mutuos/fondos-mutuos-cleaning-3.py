import json
import pandas as pd 
import csv 
import math

"""
This script adds 5 datapoints to the fondos-mutuos dataset:
    - total cumulative return
    - cumulative return period
    - anualized cumulative return
    - CAGR (compound anual growth rate)
    - Sharpe Ratio (Cagr - risk free rate) / stdev 
    - Risk Category (low - high)
"""

file = open('haku-data/fondos-mutuos-data-2.json') 

# Load json file to a python list object
fondos_mutuos_list = json.load(file)  


def highest_return(fund):
    yearly_returns = []

    for key in fund:
        if "Rentabilidad" in key and fund[key] is not None:
            yearly_returns.append(fund[key])

    if len(yearly_returns) > 0:
        max_return = max(yearly_returns)
        fund["Highest Return"] = max_return
    
    else:
         fund["Highest Return"] = None  

    return fund 


def lowest_return(fund):
    yearly_returns = []

    for key in fund:
        if "Rentabilidad" in key and fund[key] is not None:
            yearly_returns.append(fund[key])

    if len(yearly_returns) > 0:  
        lowest_return = min(yearly_returns)
        fund["Lowest Return"] = lowest_return
    
    else:
        fund["Lowest Return"] = None 

    return fund


def arithmetic_mean(fund):

    fund_years = 0 

    sum_returns = 0

    for key in fund:
        if "Rentabilidad" in key and fund[key] is not None:
            sum_returns += fund[key] 

            if "2024" in key:
                fund_years += 0.5
            else: 
                fund_years += 1

    if fund_years > 0:
        arithmetic_mean = sum_returns / fund_years
        fund["Avg Return (Arithmetic)"] = arithmetic_mean

    else:
        fund["Avg Return (Arithmetic)"] = None

    return fund


def standard_dev(fund):

    mean = fund["Avg Return (Arithmetic)"]

    fund_years = 0 

    sum_diff_squares = 0

    for key in fund:
        if "Rentabilidad" in key and fund[key] is not None:
            fund_years += 1

            squared_diff = (fund[key] - mean)**2

            sum_diff_squares += (squared_diff)
    
    if fund_years > 1:
        stdev = math.sqrt(sum_diff_squares/fund_years)
        fund["Standard Deviation of Returns"] = stdev
    
    else:
        fund["Standard Deviation of Returns"] = None

    
def cagr_cumulative_return(fund, starting_investment=100): 
    """
    This function calculates the cagr and cumulative return of a fund and adds them to its dictionary. 
        Input: fund dictionary object {}
        Output: fund dict with cagr and cumulative return figures ---> {cumulative-return : x, cagr : y}
    """

    asset_value = starting_investment

    has_return_data = False 

    fund_keys = list(fund.keys())
    fund_keys.reverse()

    fund_years = 0 

    for key in fund_keys: 
        if "Rentabilidad" in key and fund[key] is not None: 
            asset_value *= 1 + fund[key]
            if "2024" in key:
                fund_years += 0.5  
            else: 
                fund_years += 1
            has_return_data = True

    if has_return_data:
        cumulative_return = ((asset_value - starting_investment) / starting_investment)
        cumulative_return_anualized = cumulative_return / fund_years

        fund["Total Cumulative Return"] = cumulative_return

        fund["Cumulative Return Period"] = fund_years

        fund["Annualized Cumulative Return"] = cumulative_return_anualized

        cagr = (asset_value / starting_investment)**(1/fund_years) - 1
        fund["CAGR"] = cagr

    
    else: 
        fund["Total Cumulative Return"] = None
        fund["Cumulative Return Period"] = None
        fund["Annualized Cumulative Return"] = None 
        fund["CAGR"] = None 

    return fund


def sharpe_ratio(fund, risk_free_rate=0.02):
    """
    Function calculates sharpe ratio. 
    Input: dictionary object with "CAGR" and "Standard Dev" data
    Output: new key with sharpe raitoi
    """
    cagr = fund.get("CAGR")

    stdev = fund.get("Standard Deviation of Returns")

    if cagr is not None and stdev is not None and stdev != 0:
        sharpe_ratio = (cagr - risk_free_rate) / stdev 
        fund["Sharpe Ratio"] = sharpe_ratio

    else: 
        fund["Sharpe Ratio"] = None

    return fund 


# Run script & Update Dataset 
if __name__ == "__main__":
 
    # Add highest return column
    for fund in fondos_mutuos_list:
        highest_return(fund)

    # Add lowest return column
    for fund in fondos_mutuos_list:
        lowest_return(fund)
 
    # Add arithmetic mean return column
    for fund in fondos_mutuos_list:
        arithmetic_mean(fund)

    # Add Return's Standard Dev Column 
    for fund in fondos_mutuos_list:
        standard_dev(fund)

    # Add Cumulative Return & CAGR metrics to data 
    for fund in fondos_mutuos_list:
        cagr_cumulative_return(fund)
    
    # Add Sharpe Ratio 
    for fund in fondos_mutuos_list:
        sharpe_ratio(fund)

     # Add fund risk category based on standard deviation of historic returns 
    for fund in fondos_mutuos_list:
        std_dev = fund.get("Standard Deviation of Returns")
    
        if std_dev is not None:
            if std_dev > 0.20:
                risk = "High"
            elif std_dev > 0.15:
                risk = "Medium High"
            elif std_dev > 0.10:
                risk = "Medium"
            elif std_dev > 0.05:
                risk = "Medium Low"
            else:
                risk = "Low"
            
            fund["Risk"] = risk
        else:
            fund["Risk"] = None

    # Drop rows with a value of NaN for CAGR 
    
    # Save list of dicts to JSON file
    with open("haku-data/fondos-mutuos-data-3.json", "w") as json_file:
        json.dump(fondos_mutuos_list, json_file, indent = 4)

    # Save list of dicts to CSV table
    with open('haku-data/fondos-mutuos-table-3.csv', 'w', newline='') as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=fondos_mutuos_list[0].keys())
        writer.writeheader()
        writer.writerows(fondos_mutuos_list)

# string manipulation tests


return_value = '4.58%'

return_value_string = 'VAC + 6.625%'

cleaned_value = float(return_value.strip().replace('%','')) / 100

print(type(cleaned_value))


def clean_interest_rate(interest_rate): 
    if isinstance(interest_rate, str) and '%' in interest_rate and '+' not in interest_rate:  # 
        try:
            return float(interest_rate.strip().replace('%','')) / 100
        except ValueError: # handle edge cases like: "7..09%" or "N/A%" or "%"
            return interest_rate
    return interest_rate
    
    
# test function: 
print(clean_interest_rate(return_value))

print(clean_interest_rate(return_value_string))


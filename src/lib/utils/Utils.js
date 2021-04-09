
export function toCurrency(value, sign = true) {
    if (value == undefined) return '';
    
    return (sign ? '€' : '') + Number(value).toFixed(2).replace(/\./g, ',');
}

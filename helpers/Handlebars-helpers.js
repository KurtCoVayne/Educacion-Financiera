const register = function (Handlebars) {
    var helpers = {
        math: function (lvalue, operator, rvalue, _options) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);

            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        },
        ifCond:  function (v1, operator, v2, options) {

            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        },
        numberFormat: function (value, options) {
            // Helper parameters
            var dl = options.hash['decimalLength'] || 2;
            var ts = options.hash['thousandsSep'] || '.';
            var ds = options.hash['decimalSep'] || ',';
        
            // Parse to float
            var value = parseFloat(value);
        
            // The regex
            var re = '\\d(?=(\\d{3})+' + (dl > 0 ? '\\D' : '$') + ')';
        
            // Formats the number with the decimals
            var num = value.toFixed(Math.max(0, ~~dl));
        
            // Returns the formatted number
            return (ds ? num.replace('.', ds) : num).replace(new RegExp(re, 'g'), '$&' + ts);
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null); 
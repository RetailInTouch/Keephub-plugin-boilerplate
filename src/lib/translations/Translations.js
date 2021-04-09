import nl from './languages/nl.json';
import en from './languages/en.json';

class Translations {

    constructor() {

        this.language = 'nl';

        this.data = {
            nl: nl,
            en: en
        }
    }

    init = ({language}) => {
        if (this.data.hasOwnProperty(language)) {
            this.language = language;
        }
    }

    get = (key, params = null, lang = this.language) => {

        if (this.data.hasOwnProperty(lang) && this.data[lang].hasOwnProperty(key)) {
            
            let text = this.data[lang][key];

            if (params) {
                Object.keys(params).forEach((key) => {
                    text = text.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
                });
                return text;
            } else {
                return text;
            }
            
        } else {
            return key;
        }
    }

    override = (data) => {
        const ingore = ['__v', '_id', 'id', 'createdAt', 'updatedAt'];

        let override_data = {};

        Object.keys(data).forEach((key) => {
            if (typeof data[key] === 'object' && !ingore.includes(key)) {
  
                Object.keys(data[key]).forEach((lang) => {
 
                    if (!ingore.includes(lang)) {

                        if (override_data[lang] === undefined) {
                            override_data[lang] = {};
                        }

                        override_data[lang][key] = data[key][lang];
                    }
                    
                });
         
            }  
        });

        this.data = {
            ...this.data,
            ...override_data
        }


    }

}

export default new Translations();
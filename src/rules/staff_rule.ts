import { test_data } from '../utils/test_data'

export const descriptor_set = {
    name: {
        type: "string",
        required: true,
        validator: (rule, value) => !test_data.find(item => item === value)
    },
    sex: {
        type: "string",
        validator: (rule, value) => true,
    },
    age: {
        type: "number",
        asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
                if (value < 18) {
                    reject("too young");
                } else if (value > 65) {
                    reject("too old");
                } else {
                    resolve();
                }
            });
        }
    }
}

export const descriptor_list = {
    sex: {
        type: "string",
        required: true,
        validator: (rule, value) => value === 'male' || value === 'female'
    },
    age_from: {
        type: "string",
        required: true,
        validator: (rule, value) => Number(value) !== NaN 
    },
    age_to: {
        type: "string",
        required: true,
        validator: (rule, value) => Number(value) !== NaN 
    }
}
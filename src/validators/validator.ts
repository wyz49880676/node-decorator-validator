import schema from 'async-validator';

export const validator_sync = (descriptor, parameter, callback) => {
    const validator = new schema(descriptor);
    validator.validate(parameter, callback)
}
export const validator_async = (descriptor, parameter) => {
    const validator = new schema(descriptor);
    return validator.validate(parameter)
}



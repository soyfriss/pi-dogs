const breedValidations = {
    VALID_RANGE_HEIGHT: [5, 200],
    VALID_RANGE_WEIGHT: [0.5, 150],
    NO_RANGE: [0, 0],
    MAX_LENGTH_NAME: 35,
    MAX_LENGTH_IMAGE: 500,
    FIELD_REQUIRED: 'Field is required',
    EMPTY_ITEM_IN_LIST: "One or more items are empty",
    TEMPERAMENT_NOT_IN_LIST: "Temperament not in list",
    INVALID_DATA: 'Field has invalid data',
    VALIDATION_ERRORS: 'Validation errors',
    INCORRECT_TYPE: 'Type is incorrect',
    INVALID_RANGE: 'Field has an invalid range',
    MAX_LENGTH_EXCEEDED: 'The maximum length of the field has been exceeded',
    DUPLICATED_NAME: 'The breed already exists',
    THE_DOG_API_BASE_URL: 'https://api.thedogapi.com/v1'
}

module.exports = breedValidations;

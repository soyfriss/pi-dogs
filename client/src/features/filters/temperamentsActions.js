import { getTemperaments } from '../../common/integrations/api.js';
import { sortByNameAsc } from '../../common/utils/sortByName.js';
import * as actionTypes from '../../common/constants/actionTypes.js';
import * as errors from '../../common/constants/errors.js';

export function fetchTemperaments() {
    return async function (dispatch) {
        try {
            await dispatch({ type: actionTypes.FETCH_TEMPERAMENTS_REQUESTED });

            const response = await getTemperaments();

            if (!response.ok) {
                return dispatch({
                    type: actionTypes.FETCH_TEMPERAMENTS_FAILED,
                    payload: response.error
                });
            }

            const temperaments = response.data.sort(sortByNameAsc());
            dispatch({ type: actionTypes.FETCH_TEMPERAMENTS_SUCCEEDED, payload: temperaments });

        } catch (error) {
            // console.log('fetchTemperaments error: ', error);
            dispatch({
                type: actionTypes.FETCH_TEMPERAMENTS_FAILED,
                payload: {
                    message: errors.DEFAULT_ERROR_MESSAGE,
                    status: errors.DEFAULT_ERROR_STATUS
                }
            });
        }
    }
}

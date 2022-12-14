import * as STATE from "./bootstrapInitialStates";
import * as CONST from "./bootstrapConstants";

const initialState = {
    ...STATE.alertState
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case CONST.SET_ALERT:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}
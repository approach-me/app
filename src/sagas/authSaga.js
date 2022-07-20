import { call } from "redux-saga/effects"
import { registerUserService } from "../services/auth"

export function* registerUserSaga(userRegisterRequest) {
    try {
        const { email, password } = userRegisterRequest.payload
        yield call(registerUserService , email, password)
    } catch (e) {
        yield put({type: REGISTER_USER_REQUEST_FAILED, payload: e}); // TODO: Handle this case later
    }


}
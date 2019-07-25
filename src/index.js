import { app } from "hyperapp"
import {httpError} from "./api/endpoints";
import {requestApi} from "./api/requests";

const success = (state, res) => ({...state, res})

export const throwError = (state) => [
    state,
    requestApi(httpError, {
        options: {
            body: {
                ...state
            },
            action: success
        }
    })
]
const testView = (state) => (<div>
    <div style={{display: state.error ? "fixed" : "none", zIndex:"100", top: "0", width:"500px"}}>{state.error.message}</div>
    <button onclick={throwError}>Do http</button>
</div>)

app({
    init: {
        error: false
    },
    view: testView,
    node: document.getElementById("app")
})

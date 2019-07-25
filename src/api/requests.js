import { Http } from "./http"

//Name the actions so default will show in Redux
const defaultHttpSuccess = (state, response) => ({...state, ...response})
const hideModalAction = (state) => ({...state, showProgressModal: false})
const defaultHttpError = (state, response) => ({
    // Trying to check if the login work
    ...state,
    showProgressModal: false,
    error: {
        message: decodeURIComponent(escape(response.statusText)),
        code: response.status
    }
})
const defaultProps = {
    options: {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include",
        method: "GET"
    },
    error: defaultHttpError,
    action: defaultHttpSuccess
}

export const requestApi = (endpoint, opts = {}) => {
    return Http({
        ...opts,
        url: `${BaseURL}/${endpoint.path}`,
        options: {...defaultProps.options, method: endpoint.method, ...opts.options,
            ...(endpoint.method !=="GET") && {body: JSON.stringify(opts.options.body)}
        },
        action: [ opts.action || defaultProps.action, hideModalAction],
        error: [opts.error || defaultProps.error, hideModalAction]
    })
}



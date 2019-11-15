import { createStore } from 'redux'
const stateInitial = {
    /** Search normal */
    keyWord: "Hola bb",
    filer: "",
    nameFile: "",
    csvData: null,
    state1: "",
    state2: "",
    state3: "",
    state4: "",
    encode: "",
    loader: true
}


const reducerSearch = (state = stateInitial, action) => {

    if (action.type == "Change_File") {
        console.log("El file desde REDUX " + action.input)
        return {
            ...state,
            filer: action.input,
            nameFile: action.input1,
            loader: true


        }
    } else if (action.type == "Change_state1") {
        return {
            ...state,
            state1: action.state1,
            encode: "",
            state4: "",

            loader: true


        }
    } else if (action.type == "Change_state2") {
        return {
            ...state,
            state2: action.state2,
            state1: "",
            encode: "",
            state4: "",
            loader: true

        }

    }
    else if (action.type == "Change_state3") {
        return {
            ...state,
            state3: action.state3,
            state2: "",
            state1: "",
            encode: "",
            state4: "",
            loader: true
        }

    }
    else if (action.type == "Change_encode") {
        return {
            ...state,
            encode: action.encode,
            state3: "",
            state2: "",
            state1: "",
            state4: action.state4,

        }

    }

    else if (action.type == "Change_loader") {
        return {
            ...state,
            state3: "",
            state2: "",
            state1: "",
            state4: "",
            loader: action.loader
        }

    }

    return state

}


export default createStore(reducerSearch)
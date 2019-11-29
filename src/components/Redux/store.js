import { createStore } from 'redux'
const stateInitial = {
    /** Search normal */
    keyWord: "tabla.csv",
    filer: null,
    nameFile: "",
    csvData: null,
    state1: "",
    state2: "",
    state3: "",
    state4: "",
    encode: "",
    table: false,
    loader: true,
    fileJson: [
        {
            Item: 1,
            FacturaNro: "melosky",
            FechaFactura: "",
            Marca: "",
            NombreComercial: "",
            Referencia: "",
            Tipo: "--",
            Clase: "--",
            Modelo: "--",
            SubPartidaArancelaria: "--",
            Valor: "--",
            Unidad: "--",
            Cantidad: "--",
            CantidadDeclarar: "--",
            PesoSistema: "--",
            Preinspeccion: "--",
            ConservarDatos: "--",
            Carpeta: "--",
            Embarque: "--",
            CertificadoOrigen: "--",
            NroRegistro: ""
        }

    ]

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
    else if (action.type == "Change_state4") {
        return {
            ...state,
            state3: "",
            state2: "",
            state1: "",
            encode: "",
            state4: action.state4,
            loader: false

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

    else if (action.type == "File_Table") {
        console.log("desde redux file table")
        return {
            ...state,
            fileJson: action.input
        }

    }

    else if (action.type == "Enable_Table") {
        return {
            ...state,
            table: action.input
        }

    }

    return state

}


export default createStore(reducerSearch)
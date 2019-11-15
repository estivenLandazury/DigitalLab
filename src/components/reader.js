import React, { Component } from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import ReactFileReader from 'react-file-reader';
import '../customcss/reader.css'
import { CSVLink } from "react-csv"

import { connect } from 'react-redux';
import { Line, Circle } from 'rc-progress';



class Reader extends Component {


    constructor(props) {
        {/* Este método es el primero que se ejecuta antes del render*/ }

        {/* Con el método super heredo todas la funcionalidades de react*/ }
        super(props);



        {/* State me indica el estado en el que están los datos en la aplicación react
    especificamente en este componente*/}
        this.state = {
            csvData: null,
            nameFile: "",
            file: "cosota",
            URl: "172.19.15.44:5000/"
        }
    }

    componentDidMount() {
        let val = "VGFibGUNCkN1c3RvbWVyIFBPIE5PLiAsVmVzc2VsIE5hbWUgLFBheW1lbnQgVGVybSAsLER1ZSAsRGF0ZSAsKG1tL2RkL3l5eXkpICwsRGF0ZSBTaGlwcGVkIA0KNjUyMTMgLEpQTyBDQVBSSUNPUk5VUyBWLjkyMVMgLEIvTCA5MCBEQVlTICwsLDA4LzI4LzIwMTkgLCwsMDUvMzAvMjAxOSANCk1hcmtzICYgTm9zLiAsRGVzY3JpcHRpb24gLCxRdWFudGl0eSAsLFVuaXQgLFVuaXQgUHJpY2UgLCxFeHQuIFByaWNlIA0KLCwsLCwsLCxVLlMuRE9MTEFSUyANCiwsLCwsLCwsDQpJTlZFU0EgQ1JBIDQ4ICwiUE9MWVZJTllMIEFMQ09IT0wgIiJLVVJBUkFZICIsIlBPVkFMIiIgIiwsLCwsLA0KTk8gMjYgU1VSIDE4MSAsLCwsLCwsLA0KT0YuMzE0QSAsRVhDRVZBTCBSUy0yMTE3ICggLDE1MCBCQUdTICwsIjMsNzUwICIsS0cgLCQ1LjAwICwsIjE4LDc1MC4wMCAiDQoiRVZOSUdBRE8sICIsLCwsLCwsLA0KQU5USU9RVUlBICwsLCwsLCwsDQpDT0xPTUJJQSAsLCwsLCwsLA0KU1VSIEFNRVJJQ0EgLCwsLCwsLCwNCkJZIFNFQSBGSU5BTCAsLCwsLCwsLA0KREVTVElOQVRJT04gLCwsLCwsLCwNCkNBUlRBR0VOQSBQT1JUICwsLCwsLCwsDQosUEFDS0lORzogMjUgS0dTIC8gQkFHICggLDE1MCBCQUdTICwsLCwsLA0KLENPVU5UUlkgT0YgT1JJR0lOOiBVU0EgLCwsLCwsLA0KLCwsLCwsLCwNCiwsLCwsLCwsDQosLCwsLCwsLA0KLCwsLCwsLCwNCiwsRk9CIFZBTFVFOiAsLCwsLCwiJDE4LDc1MC4wMCAiDQosLCwsLCwsLA0KLCwsLCwsLCwNCg0KDQpUYWJsZQ0KRGF0ZSAobW0vZGQveXl5eSkgLDA1LzMwLzIwMTkgDQosDQosDQosDQpDb250cmFjdCBOby4gLEZYODIwMiANCg0KDQo="
        let vt = atob(val)

        console.log(val)
        console.log(vt)
    }




    handleFiles = files => {

        var reader = new FileReader();
        this.props.cambiarFile(files[0], files[0].name)

        reader.onload = (e) => {


            // Use reader.result
            this.setState({
                /*csvData: reader.results*/

            })



        }
        console.log("heyyy" + this.props.keyWord)


        reader.readAsText(files[0]);

    }


    sendServer() {
        const that = this

        const data = new FormData();
        data.append('file', this.props.filer);
        /** ----------------------Fetch1 Almacena datos en servidor--------------------------- */
        fetch(that.state.URl + 'upload', {
            method: 'POST',
            body: data,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => response.json())

            .then(function (responseJson) {

                if (responseJson["results"] === "success") {
                    that.props.cambiarState1("success")

                    /** ----------------------Fetch2 Almacena datos en  el bucket de S3 en AWS --------------------------- */
                    let options = {
                        method: 'POST',
                        body: JSON.stringify({ "name": that.props.nameFile }),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },

                    }
                    fetch(that.state.URl + 'send', options)
                        .then((response) => response.json())
                        .then((responseJson) => {



                            if (responseJson["results"] === "success") {
                                that.props.cambiarState2("success")
                                console.log("textract " + that.props.nameFile)
                                let options = {
                                    method: 'POST',
                                    body: JSON.stringify({ "name": that.props.nameFile }),
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Access-Control-Allow-Origin': '*'
                                    },

                                }
                                /** ---------------------- Fetch3 Consulta el Textract de Aws para digitalizar la Factura --------------------------- */

                                fetch(that.state.URl + 'textract', options)
                                    .then((response) => response.json())
                                    .then((responseJson) => {

                                        if (responseJson["results"] === "success") {
                                            that.props.cambiarState3("success")


                                            fetch(that.state.URl + 'files', options)
                                                .then((response) => response.json())
                                                .then((responseJson) => {

                                                    if (responseJson["encoded"] !== "") {

                                                        let vt = atob(responseJson["encoded"])

                                                        that.props.cambiarEncode(vt, "success")


                                                        console.log(responseJson["encoded"])

                                                    }


                                                }).catch(error => console.log(error))


                                            console.log("Ya estamos con Textract")


                                        }



                                    }).catch(error => console.log(error))






                            }

                        }).catch(error => console.log(error))
                    console.log("careVerga")
                }


            }).catch(error => console.log(error))

        if (this.props.state1 === "success") {
            console.log("care verga")
        }



    }


    loaderbar() {

        if (this.props.state1 === "success") {
            return <div>
                <h1 className="loader"> Loading... 25%</h1>
                <div className="loader2"></div>

            </div>
        }

        if (this.props.state2 === "success") {
            return <div>
                <h1 className="loader"> Loading.. 50%</h1>

                <div className="loader2"></div>
            </div>

        }
        if (this.props.state3 === "success") {
            return <div>
                <h1 className="loader"> Loading... 75%</h1>
                <div className="loader2"></div>

            </div>

        }
        if (this.props.state4 === "success") {
            return <div>
                <h1 className="loader"> Complete 100%</h1>
                <div className="loader2"></div>
                {this.cambiarLoad()}


            </div>

        }

        if (this.props.state4 === "") {
            return <div>

            </div>

        }


    }

    cambiarLoad() {
        this.props.cambiarLoader("")
    }








    render() {
        /*  const sampleData = `Model,mpg,cyl,disp,hp,drat,wt,qsec,vs,am,gear,carb
  Mazda RX4,21,6,160,110,3.9,2.62,16.46,0,1,4,4
  Mazda RX4 Wag,21,6,160,110,3.9,2.875,17.02,0,1,4,4
  Datsun 710,22.8,4,108,93,3.85,2.32,18.61,1,1,4,1
  Hornet 4 Drive,21.4,6,258,110,3.08,3.215,19.44,1,0,3,1
  Hornet Sportabout,18.7,8,360,175,3.15,3.44,17.02,0,0,3,2
  Valiant,18.1,6,225,105,2.76,3.46,20.22,1,0,3,1
  Duster 360,14.3,8,360,245,3.21,3.57,15.84,0,0,3,4
  Merc 240D,24.4,4,146.7,62,3.69,3.19,20,1,0,4,2
  Merc 230,22.8,4,140.8,95,3.92,3.15,22.9,1,0,4,2
  Merc 280,19.2,6,167.6,123,3.92,3.44,18.3,1,0,4,4
  Merc 280C,17.8,6,167.6,123,3.92,3.44,18.9,1,0,4,4
  Merc 450SE,16.4,8,275.8,180,3.07,4.07,17.4,0,0,3,3
  Merc 450SL,17.3,8,275.8,180,3.07,3.73,17.6,0,0,3,3
  Merc 450SLC,15.2,8,275.8,180,3.07,3.78,18,0,0,3,3
  Cadillac Fleetwood,10.4,8,472,205,2.93,5.25,17.98,0,0,3,4
  Lincoln Continental,10.4,8,460,215,3,5.424,17.82,0,0,3,4
  Chrysler Imperial,14.7,8,440,230,3.23,5.345,17.42,0,0,3,4
  Fiat 128,32.4,4,78.7,66,4.08,2.2,19.47,1,1,4,1
           `;
  */

        const sampleData = ``;
        return (

            <div >

                <div className="card">
                    <div className="card-header">
                        <h1 className="Title_principal"> Digital Lab</h1>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            Invoice scanning</h5>
                        <p className="card-text">
                            Our digitization service is a good ally to launch a global electronic invoice project.</p>

                        <ReactFileReader
                            multipleFiles={false}
                            fileTypes={[".pdf,.csv,.jpg,.png"]}
                            handleFiles={this.handleFiles}>
                            <button className='btn btn-primary'>Upload</button>
                        </ReactFileReader>



                        <button className='btn btn-primary' id="consult" onClick={this.sendServer.bind(this)}>consultar</button>

                    </div>



                </div>

                {this.loaderbar()}


                <div className="Container-Titel">
                    <h1 className="TitleTable"> The digitized file is (Download): </h1>
                    <CSVLink data={"" + this.state.csvData} separator={";"} filename={this.props.nameFile}
                    >

                        <h1 className="h1-Title"> {this.props.nameFile}</h1>
                    </CSVLink>
                </div>



                <div className="container center-h center-v">

                    <CsvToHtmlTable
                        data={sampleData || this.props.encode}
                        csvDelimiter=","
                        tableClassName="table table-striped table-responsive table-hover"
                    />
                </div>






            </div >
        );
    }

}


const mapStateProps = state => ({
    keyWord: state.keyWord,
    filer: state.filer,
    csvData: state.csvData,
    nameFile: state.nameFile,
    state1: state.state1,
    state2: state.state2,
    state3: state.state3,
    state4: state.state4,
    encode: state.encode,
    loader: state.loader



})

const mapDispatchToProps = dispactch => ({

    cambiarFile(e, e1) {
        dispactch({
            type: "Change_File",
            input: e,
            input1: e1


        })
    },

    cambiarState1(e) {
        dispactch({
            type: "Change_state1",
            state1: e
        })

    }
    ,
    cambiarState2(e) {
        dispactch({
            type: "Change_state2",
            state2: e
        })

    }
    ,
    cambiarState3(e) {
        dispactch({
            type: "Change_state3",
            state3: e
        })

    }

    ,
    cambiarState4(e) {
        dispactch({
            type: "Change_File4",
            state4: e
        })

    },


    cambiarEncode(e, e1) {
        dispactch({
            type: "Change_encode",
            encode: e,
            state4: e1
        })

    }
    ,

    cambiarLoader(e) {
        dispactch({
            type: "Change_loader",
            loader: e
        })

    }

})

export default connect(mapStateProps, mapDispatchToProps)(Reader); 

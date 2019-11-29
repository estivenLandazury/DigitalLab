import React, { Component } from 'react';


import SearchBar from './search'
import ProductTable from './ProductTable'
import { connect } from 'react-redux';

class Products extends React.Component {

    constructor(props) {
        super(props);

        //  this.state.products = [];
        this.state = {
            del: false,

            prueba: [
                {
                    Item: 1,
                    FacturaNro: 21896 + "",
                    FechaFactura: "2019/12/24",
                    Marca: "Gato",
                    NombreComercial: "San Andresito",
                    Referencia: 368741,
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
                },
                {
                    Item: 2,
                    FacturaNro: 29894 + "",
                    FechaFactura: "2019/09/03",
                    Marca: "China",
                    NombreComercial: "San Victorino",
                    Referencia: 458741,
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
                    NroRegistro: ''
                }
            ]


        };
        this.state.filterText = "";

        this.state.products = [
            {
                id: 1,
                category: 'Sporting Goods',
                price: '49.99',
                qty: 12,
                name: 'football'
            }, {
                id: 2,
                category: 'Sporting Goods',
                price: '9.99',
                qty: 15,
                name: 'baseball'
            }, {
                id: 3,
                category: 'Sporting Goods',
                price: '29.99',
                qty: 14,
                name: 'basketball'
            }, {
                id: 4,
                category: 'Electronics',
                price: '99.99',
                qty: 34,
                name: 'iPod Touch'
            }, {
                id: 5,
                category: 'Electronics',
                price: '399.99',
                qty: 12,
                name: 'iPhone 5'
            }, {
                id: 6,
                category: 'Electronics',
                price: '199.99',
                qty: 23,
                name: 'nexus 7'
            }
        ];

    }

    /** send text input field search */
    handleUserInput(filterText) {
        console.log(" handleUserInput " + filterText)

        this.setState({ filterText: filterText });
    };


    /** Cantida de filas  */
    handleRowDel(product) {
        const that = this
        console.log(" handleRowDel " + this.props.fileJson.indexOf(product))

        var index = this.props.fileJson.indexOf(product);
        this.props.fileJson.splice(index, 1);
        this.props.cambiarFileTable(this.props.fileJson);
        this.setState(this.props.fileJson);




    };


    /** Add rolls to table */
    handleAddEvent(evt) {
        console.log("Hola handleAddEvent ")

        var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        var product = {
            Item: id,
            FacturaNro: '',
            FechaFactura: "",
            Marca: "",
            NombreComercial: "",
            Referencia: '',
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
            NroRegistro: "--"
        }
        this.props.fileJson.push(product);
        this.setState(this.props.fileJson);

    }
    /*** Onchange fot cells */
    handleProductTable(evt) {
        console.log("Hola handleProductTable " + evt.target.id + " " + evt.target.name + " " + evt.target.value)
        var item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        var products = this.props.fileJson.slice();
        var newProducts = products.map(function (product) {

            for (var key in product) {
                if (key == item.name && product.Item == item.id) {
                    product[key] = item.value;

                }
            }
            return product;
        });
        //this.setState({ products: newProducts });
        this.props.cambiarFileTable(newProducts)
        this.setState({ prueba: newProducts });

        //  console.log(this.state.products);
    };
    render() {

        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div classname="col-sm">
                            <h1 className="filter-text"> Filtrar por No.Factura</h1>
                        </div>
                        <div className="col-sm">
                            <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
                        </div>

                    </div>
                </div>

                <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.props.fileJson} filterText={this.state.filterText} />
            </div>
        );

    }

}

const mapStateProps = state => ({
    fileJson: state.fileJson



})

const mapDispatchToProps = dispactch => ({
    cambiarFileTable(e) {
        dispactch({
            type: "File_Table",
            input: e
        })

    },
})

export default connect(mapStateProps, mapDispatchToProps)(Products)

import React, { Component } from 'react';
import ProductRow from './ProductRow'

class ProductTable extends React.Component {

  exportTableCSV(filename) {

    var csv = [];
    var rows = document.querySelectorAll("table tr");

  }

  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    console.table("listaaaaaa " + this.props.products)
    var product = this.props.products.map(function (product) {
      if (product.FacturaNro.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.Item} />)
    });
    return (
      <div className="container">


        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Añadir Fila</button>
        <table className="table table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>FacturaNro</th>
              <th>FechaFactura</th>
              <th>Marca</th>
              <th>NombreComercial</th>
              <th> Referencia</th>
              <th>Tipo</th>
              <th>Clase</th>
              <th>Modelo</th>
              <th>SubPartidaArancelaria</th>
              <th>Valor</th>
              <th>Unidad</th>
              <th>Cantidad</th>
              <th>CantidadDeclarar</th>
              <th>PesoSistema</th>
              <th>Preinspeccion</th>
              <th>ConservarDatos</th>
              <th> Carpeta</th>
              <th>Embarque</th>
              <th>CertificadoOrigen</th>
              <th>NroRegistro</th>
              <th>category</th>

            </tr>
          </thead>

          <tbody>
            {product}

          </tbody>

        </table>
      </div>
    );

  }

}
export default ProductTable 
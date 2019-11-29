import React, { Component } from 'react';

import EditableCell from './EditCell'
import '../customcss/row.css'


class ProductRow extends React.Component {
    onDelEvent() {
        this.props.onDelEvent(this.props.product);

    }
    render() {

        return (
            <tr className="eachRow">
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    "type": "FacturaNro",
                    value: this.props.product.FacturaNro,
                    id: this.props.product.Item
                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "FechaFactura",
                    value: this.props.product.FechaFactura,
                    id: this.props.product.Item
                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "Marca",
                    value: this.props.product.Marca,
                    id: this.props.product.Item
                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "NombreComercial",
                    value: this.props.product.NombreComercial,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "Referencia",
                    value: this.props.product.Referencia,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "Tipo",
                    value: this.props.product.Tipo,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "Clase",
                    value: this.props.product.Clase,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "Modelo",
                    value: this.props.product.Modelo,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "SubPartidaArancelaria",
                    value: this.props.product.SubPartidaArancelaria,
                    id: this.props.product.Item

                }} />

                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "Valor",
                    value: this.props.product.Valor,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "Unidad",
                    value: this.props.product.Unidad,
                    id: this.props.product.Item

                }} />

                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "Cantidad",
                    value: this.props.product.Cantidad,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "CantidadDeclarar",
                    value: this.props.product.CantidadDeclarar,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "PesoSistema",
                    value: this.props.product.PesoSistema,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "PesoSistema",
                    value: this.props.product.PesoSistema,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "Preinspeccion",
                    value: this.props.product.Preinspeccion,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "ConservarDatos",
                    value: this.props.product.ConservarDatos,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "Carpeta",
                    value: this.props.product.Carpeta,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "Embarque",
                    value: this.props.product.Embarque,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "CertificadoOrigen",
                    value: this.props.product.CertificadoOrigen,
                    id: this.props.product.Item

                }} />
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "NroRegistro",
                    value: this.props.product.NroRegistro,
                    id: this.props.product.Item

                }} />
                <td className="del-cell">
                    <button type="button" onClick={this.onDelEvent.bind(this)} value="Eliminar" className="btn btn-danger">Eliminar</button>
                </td>
            </tr>
        );

    }

}
export default ProductRow 
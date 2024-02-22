export interface NotaDto{
    id:number;
    fecha:string;
    tipoNota:string;
    idProveedor:number;
    idCliente:number;
    numeroDocumento:string;
    razonSocial:string;
    idTipoComprobante:number;
    descripcion:string;
    idProducto:string;
    detalle:string;
    cantidad:number;
    precio:number;
    impTotal:number;
}

export interface NotaReporte{
    idProducto:number;
    detalleProducto:string;
    cantidad:number;
    importeTotal:number;
    precio:number;
}

export interface NotaCreate{
    fecha:string;
    tipoNota:string;
    idProveedor:number;
    idTipoComprobante:number;
    idCliente:number;
    idProducto:number;
    cantidad:number;
    precio:number;
    impTotal:number;
    state:number;
}

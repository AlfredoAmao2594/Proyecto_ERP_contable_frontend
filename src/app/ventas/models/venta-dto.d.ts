export interface VentaListDto{

    id: number;
    fecha: string;
    idTipoComprobante: number;
    descripcion: string;
    idCliente: number;
    idTipoDocumento: number;
    descripcionDocumento:string;
    numeroDocumento: string;
    razonSocial: string;
    baseImponible: number;
    igv: number;
    importeTotal: number;
}

export interface Venta{
    id:number;
    fecha: string;
    idtipoComprobante: number;
    idCliente: number;
    baseImponible: number;
    igv: number;
    importeTotal: number;
}
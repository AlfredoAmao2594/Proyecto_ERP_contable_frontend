export interface CompraListDto{

    id: number;
    fecha: string;
    idTipoComprobante: number;
    descripcion: string;
    idProveedor: number;
    idTipoDocumento: number;
    descripcionDocumento:string;
    numeroDocumento: string;
    razonSocial: string;
    baseImponible: number;
    igv: number;
    importeTotal: number;
}

export interface Compra{
    id:number;
    fecha: string;
    idtipoComprobante: number;
    idProveedor: number;
    baseImponible: number;
    igv: number;
    importeTotal: number;
}
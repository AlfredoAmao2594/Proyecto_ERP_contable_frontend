export interface ProveedorDto{
    id:number;
    idTipoDocumento:number;
    descripcion:string;
    numeroDocumento:string;
    razonSocial:string;
    pais:string;
    ciudad:string;
    direccion:string;
}

export interface Proveedor{
    idTipoDocumento:number;
    numeroDocumento:string;
    razonSocial:string;
    pais:string;
    ciudad:string;
    direccion:string;
}
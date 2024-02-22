export interface ClienteDtp{
    id:number;
    idTipoDocumento:number;
    descripcion:string;
    numeroDocumento:string;
    razonSocial:string;
    pais:string;
    ciudad:string;
    direccion:string;
}

export interface Cliente{
    idTipoDocumento:number;
    numeroDocumento:string;
    razonSocial:string;
    pais:string;
    ciudad:string;
    direccion:string;
}
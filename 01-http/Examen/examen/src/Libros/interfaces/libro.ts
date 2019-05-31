export interface Libro {
    id?: number,
    ICBN: number,
    nombre:string,
    numeroPaginas: number,
    edicion: number,
    fechaPublicacion:Date,
    nombreEditorial: string,
    autorId: number
}
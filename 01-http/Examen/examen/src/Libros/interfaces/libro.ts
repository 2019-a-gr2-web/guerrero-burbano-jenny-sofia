export interface Libro {
    id?: number,
    ICBN: number,
    numeroPaginas: number,
    edicion: number,
    fechaPublicacion:Date,
    nombreEditorial: string,
    autorId: number
}
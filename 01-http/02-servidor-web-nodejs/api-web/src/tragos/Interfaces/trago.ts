export interface Trago {
    id?: number;
    nombre: string;
    tipo: 'Ron' | 'Vodka' | 'Whiskey' | 'Puntas' | 'Cerveza';
    gradosAlcohol: number;
    fechaCaducidad: Date;
    precio: number;
}

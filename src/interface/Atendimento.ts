export interface Atendimento {
    id?: number;
    data: string;     // Para a data no formato YYYY-MM-DD
    hora?: string;    // Para a hora no formato HH:MM:SS (opcional)
    servico: string;
    cliente: string;
    status: string;
}

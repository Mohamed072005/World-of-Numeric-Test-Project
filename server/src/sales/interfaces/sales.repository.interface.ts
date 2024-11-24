import { Sales } from "../sales.schema";

export interface SalesRepositoryInterface {
    getTheTotalSalse(selectedTime: string | null): Promise<number>
}
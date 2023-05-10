export interface MedalCount{
    Discipline: string;
    Country: string;
    Medal_Count: number;
    Gold: number;
    Silver: number;
    Bronze: number;
}

export interface StoredStatus {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
}

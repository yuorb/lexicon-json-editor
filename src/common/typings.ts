export type Specs = {
    "BSC": string;
    "CTE": string;
    "CSV": string;
    "OBJ": string;
};

export type Root = {
    root: string;
    refers?: string;
    stems?: [
        Specs | string,
        Specs | string,
        Specs | string,
    ];
    notes?: string;
    see?: string;
};

export class Station {
    available_bikes: number;
    name: string;
    status: StationStatus;
    number: number;
    position: { latitude: number, longitude: number };
    contract_name: string;

    constructor(available_bikes: number, name: string, number: number) {
        this.available_bikes = available_bikes;
        this.name = name;
        this.number = number;
    }

    public static fromSOAP(data: any): Station {
        const res = new Station(data.AvailableBikes, data.Name, data.StationNumber);
        res.status = data.Status;
        res.contract_name = data.ContractName;
        if ((data.Latitude !== null && data.Latitude !== undefined) && (data.Longitude !== null && data.Longitude !== undefined)) {
            res.position = {latitude: parseFloat(data.Latitude), longitude: parseFloat(data.Longitude)};
        }
        return res;
    }
}

export enum StationStatus {
    UNKNOWN = "UNKNOWN",
    OPEN = "OPEN",
    CLOSED = "CLOSED",
}

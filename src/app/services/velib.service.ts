import {Injectable} from "@angular/core";
import {Client, NgxSoapService} from "ngx-soap";
import {Station} from "../models/station";

/**
 * This class contains all functions used to manage users
 */
@Injectable()
export class VelibService {
    private readonly client: Promise<Client>;

    constructor(private soap: NgxSoapService) {
        this.client = this.soap.createClient('/Velib/?singleWsdl', {}, '/Velib/');
    }

    public async getCities(): Promise<string[]> {
        const client = await this.client;
        return (await ((<any>client).GetCities({}).toPromise())).result.GetCitiesResult.string;
    }

    public async getStationsOf(city: string): Promise<Station[]> {
        const client = await this.client;
        const stations_data = (await ((<any>client).GetVelibStationsInCity({city: city}).toPromise()))
            .result.GetVelibStationsInCityResult.Station;
        const res = [];
        for (const station_data of stations_data) {
            const station = Station.fromSOAP(station_data);
            // station.contract_name = city;
            res.push(station);
        }
        return Promise.resolve(res);
    }

    async retrieveDataFor(station: Station): Promise<Station> {
        const client = await this.client;
        const station_data = (await ((<any>client).GetStationData(
            {station_number: station.number, contract_name: station.contract_name}
        ).toPromise())).result.GetStationDataResult;
        const update = Station.fromSOAP(station_data);
        station.status = update.status;
        station.available_bikes = update.available_bikes;
        return station;
    }
}

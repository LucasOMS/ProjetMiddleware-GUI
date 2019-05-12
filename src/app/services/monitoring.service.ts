import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {Client, NgxSoapService} from "ngx-soap";

const httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
};

/**
 * This class contains all functions used to manage users
 */
@Injectable()
export class MonitoringService {


    private readonly client: Promise<Client>;

    constructor(private soap: NgxSoapService) {
        this.client = this.soap.createClient('/Monitoring/?singleWsdl', {}, '/Monitoring/');
    }


    async getNumberOfRequest(): Promise<number> {
        const client = await this.client;
        return (await ((<any>client).NumberOfRequest({}).toPromise())).result.NumberOfRequestResult;
    }

    async getMeanTime(): Promise<number> {
        const client = await this.client;
        return (await ((<any>client).MeanRequestTime({}).toPromise())).result.MeanRequestTimeResult;
    }
}

import {Injectable} from "@angular/core";
import {Client, NgxSoapService} from "ngx-soap";
import {User} from "../models/user";
import * as shajs from 'sha.js';

/**
 * This class contains all functions used to manage users
 */
@Injectable()
export class MonitoringService {

    private readonly HASH_ALGORITHM: string = 'sha256';

    private readonly client: Promise<Client>;

    constructor(private soap: NgxSoapService) {
        this.client = this.soap.createClient('/Monitoring/?singleWsdl', {}, '/Monitoring/');
    }


    async getNumberOfRequest(userConnected: User): Promise<number> {
        const client = await this.client;
        return (await ((<any>client).NumberOfRequest(
            {
                userIdHashed: shajs(this.HASH_ALGORITHM).update(userConnected.userId).digest('hex')
            }).toPromise())).result.NumberOfRequestResult;
    }

    async getMeanTime(userConnected: User): Promise<number> {
        const client = await this.client;
        return (await ((<any>client).MeanRequestTime(
            {
                userIdHashed: shajs(this.HASH_ALGORITHM).update(userConnected.userId).digest('hex')
            }).toPromise())).result.MeanRequestTimeResult;
    }
}

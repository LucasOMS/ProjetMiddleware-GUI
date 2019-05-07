import {Injectable} from "@angular/core";
import {Client, NgxSoapService} from "ngx-soap";

/**
 * This class contains all functions used to manage users
 */
@Injectable()
export class VelibService {
    private client: Promise<Client>;

    constructor(private soap: NgxSoapService) {
        this.client = this.soap.createClient('/VelibService/?singleWsdl', {}, '/VelibService/');
    }

    public async getCities(): Promise<string[]> {
        return (await ((<any>await this.client).GetCities().toPromise())).result.GetCitiesResult.string;
    }
}

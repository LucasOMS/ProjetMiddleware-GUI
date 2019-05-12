import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import * as firebase from "firebase";
import {isNullOrUndefined} from "util";

export class Monitoring {

    constructor(number_requests: number, mean_request_time: number) {
        this._number_requests = number_requests;
        this._mean_request_time = mean_request_time;
    }

    private _number_requests: number;

    get number_requests(): number {
        return this._number_requests;
    }

    set number_requests(value: number) {
        this._number_requests = value;
    }

    private _mean_request_time: number;

    get mean_request_time(): number {
        return this._mean_request_time;
    }

    set mean_request_time(value: number) {
        this._mean_request_time = value;
    }

    public static fromJSON(data): Monitoring {
        return new Monitoring(data.number_request, data.mean_request_time);
    }
}


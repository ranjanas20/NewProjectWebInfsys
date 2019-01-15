import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Environment } from "./environment.service";

import {HttpClient} from '@angular/common/http'
import { ResponseModel } from "../model/response.model";

@Injectable({
    providedIn: 'root',
})
export class StatusService{
    constructor(private env:Environment, private http: HttpClient ){ }

    getStatus(){
        return this.http.get<ResponseModel>(this.env.REST_URL + '/status' )
       .pipe(
        map(
        (response: ResponseModel)=>{
            const data = response.data;
            return data;
        })
        );
    }
}

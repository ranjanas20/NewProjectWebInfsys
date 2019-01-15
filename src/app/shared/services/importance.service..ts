import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Environment } from "./environment.service";

import {HttpClient} from '@angular/common/http'
import { ResponseModel } from "../model/response.model";

@Injectable({
    providedIn: 'root',
})
export class ImportanceService{
    constructor(private env:Environment, private http: HttpClient ){ }

    getImportance(){
        return this.http.get<ResponseModel>(this.env.REST_URL + '/importance' )
       .pipe(
        map(
        (response: ResponseModel)=>{
            const data = response.data;
            return data;
        })
        );
    }
}

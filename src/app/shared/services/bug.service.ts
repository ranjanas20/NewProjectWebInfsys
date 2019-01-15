import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Environment } from "./environment.service";

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { BugModel } from "../model/bug.model";
import { ResponseModel } from "../model/response.model";
import { BugListResponseModel } from "../model/buglistresponse.model";
import { Observable, Subject } from 'rxjs';
import { BugsCountModel } from '../model/bugscount.model';

@Injectable()
export class BugService{

    bugsCount: Subject<number> = new Subject();

    constructor(private env:Environment, private http: HttpClient ){ }

    addBug(bug: BugModel){
        const cheaders = new HttpHeaders({'Content-Type':'application/json'});
        return  this.http.post<ResponseModel>(this.env.REST_URL + '/bug',
                                bug,
                                { headers: cheaders }
                                );

    }

    updateBug(bug: BugModel){
        const cheaders = new HttpHeaders({'Content-Type':'application/json'});
        return  this.http.put<ResponseModel>(this.env.REST_URL + '/bug',
                                bug,
                                { headers: cheaders }
                                );

    }
    
  deleteBug(bugId: number){
    const cheaders = new HttpHeaders({'Content-Type':'application/json'});
    return  this.http.delete( this.env.REST_URL + '/bug/' + bugId,
                            { headers: cheaders }
                            );
    }

    getBug(bugId: number){
        return this.http.get<ResponseModel>(this.env.REST_URL + '/bug/'+bugId, {
            observe: 'body',
            responseType: 'json'
        } )
       .pipe(
        map(
        (response: ResponseModel)=>{
            return response;
        })
        );
    }

    getBugsPagewise(pageNo: number, pageSize: number, sortField: string, sortOrder:string): Observable<BugListResponseModel> {
        return this.http.get<BugListResponseModel>(this.env.REST_URL + '/pagewisebugs', {
            observe: 'body',
            responseType: 'json',
            params: new HttpParams().set("pageNo", pageNo.toString())
            .set("pageSize", pageSize.toString())
            .set("sortField", sortField.toString())
            .set("sortOrder", sortOrder.toString())
        }).pipe( 
            map( (resp: BugListResponseModel) => { return resp; } )
        );
    }

    getBugsCount(){
        return this.http.get<ResponseModel>(this.env.REST_URL + '/bugscount' )
       .pipe(
        map(
        (response: ResponseModel)=>{
            const data = response.data;
            this.bugsCount.next(data);
            return data;
        })
        );
    }

    getAllBugsCount(){
        return this.http.get<ResponseModel>(this.env.REST_URL + '/allbugscount' )
       .pipe(
        map(
        (response: ResponseModel)=>{
            return response.data;
        })
        );
    }
}

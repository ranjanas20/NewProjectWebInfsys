import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class Environment{
    public REST_URL: string = "http://localhost:8080";

}

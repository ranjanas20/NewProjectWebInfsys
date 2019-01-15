
import { BugModel } from "./bug.model";

export class BugListResponseModel{
    success: boolean;
    respCode: string;
    respMessage: string;
    pageNumber: number;
    totalPages: number;
    data: BugModel[]; 
}
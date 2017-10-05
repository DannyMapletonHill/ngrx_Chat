import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AllUserData} from "../../../shared/to/all-user-data";
import {Http, Headers} from "@angular/http";
import {Message} from "../../../shared/model/message";
import {SendNewMessageActionPayload} from "../store/actions";
import {commonHttpHeaders} from "./commonHttpHeaders";

@Injectable()
export class ThreadsService {

   constructor(private http: Http) { }


    loadUserThreads(userId:number): Observable<AllUserData> {
        return this.http.get('/api/threads', commonHttpHeaders(userId))
            .map(res => res.json());
    }


    saveNewMessage(payload: SendNewMessageActionPayload): Observable<any> {

       return this.http.post(`/api/threads/${payload.threadId}`,
           JSON.stringify({text: payload.text}),
            commonHttpHeaders(payload.participantId));

    }

    loadNewMessagesForUser(): Observable<Message[]> {
        return null
    }

}











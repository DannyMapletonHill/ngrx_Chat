import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ThreadsService } from "app/services/threads.service";



@Injectable()
export class ServerNotificationsEffectService {
    constructor(private threadsService: ThreadsService){}
    

    newMessages$ = Observable.interval(3000)
        .switchMap(() => this.threadsService.loadNewMessagesForUser())
}
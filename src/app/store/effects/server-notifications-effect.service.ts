import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ThreadsService } from "app/services/threads.service";
import { Effect } from "@ngrx/effects";
import { NewMessagesReceivedAction } from "app/store/actions";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { UiState } from "app/store/ui-state";



@Injectable()
export class ServerNotificationsEffectService {
    constructor(private threadsService: ThreadsService,
                private store: Store<ApplicationState> ){}
    

    @Effect() newMessages$ = Observable.interval(3000)    
        .withLatestFrom(this.store.select((appState)=> appState.uiState))
        .map(([any, uiState]) => uiState)  // both interval and uistate to simply take uistate
        .filter(uiState => !!uiState.userId) // when userId is not null
        .switchMap(uiState => this.threadsService.loadNewMessagesForUser(uiState.userId))
        .withLatestFrom(this.store.select(appState => appState.uiState))
        .map(([unreadMessages, uiState]) => new NewMessagesReceivedAction({
            unreadMessages,
            currentThreadId: uiState.currentThreadId,
            currentUserId: uiState.userId  }))
    }
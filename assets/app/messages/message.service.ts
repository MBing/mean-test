import { Headers, Http, Response } from "@angular/http";
import { EventEmitter, Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { Message } from "./message.model";
import { ErrorService } from "../errors/error.service";

// to use the Http module, you need your class to have metadata, this is not a Component,
// so you use 'Injectable' to provide you with metadata to be able to work with it.
@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService) {}

    addMessage(message: Message) {
        // this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        // only sets up an observable, not doing a request,
        // but allows us to subscribe to it and holds the request
        // no one has yet subscribed to it, so why would you send a request?
        // TODO: Change localhost when deploying to live domain
        return this.http.post('http://localhost:3000/message' + token, body, {headers: headers})
                        .map((resp: Response) => {
                            const result = resp.json();
                            const message =  new Message(
                                result.obj.content,
                                result.obj.user.firstName,
                                result.obj._id,
                                result.obj.user._id);
                            this.messages.push(message);
                            return message;
                        })
                        .catch((error: Response) => {
                            this.errorService.handleError(error.json());
                            return Observable.throw(error.json())
                        });
        /* the response.json() will give the json from message.js back that looks like:
            {
                message: 'Saved Message',
                obj: result
             }
        */
    }

    // TODO: Change localhost when deploying to live domain
    getMessages() {
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(
                        message.content,
                        message.user.firstName,
                        message._id,
                        message.user._id));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message)
    }

    updateMessage(message: Message) {
        // this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        // only sets up an observable, not doing a request,
        // but allows us to subscribe to it and holds the request
        // no one has yet subscribed to it, so why would you send a request?
        // TODO: Change localhost when deploying to live domain
        return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, {headers: headers})
            .map((resp: Response) => resp.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    deleteMessage(message: Message) {
        // optimistic delete from front end
        this.messages.splice(this.messages.indexOf(message), 1);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        // only sets up an observable, not doing a request,
        // but allows us to subscribe to it and holds the request
        // no one has yet subscribed to it, so why would you send a request?
        // TODO: Change localhost when deploying to live domain
        return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
            .map((resp: Response) => resp.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }
}

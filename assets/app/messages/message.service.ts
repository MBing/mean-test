import { Headers, Http, Response } from "@angular/http";
import { EventEmitter, Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { Message } from "./message.model";

// to use the Http module, you need your class to have metadata, this is not a Component,
// so you use 'Injectable' to provide you with metadata to be able to work with it.
@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http) {}

    addMessage(message: Message) {
        // this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        // only sets up an observable, not doing a request,
        // but allows us to subscribe to it and holds the request
        // no one has yet subscribed to it, so why would you send a request?
        return this.http.post('http://localhost:3000/message', body, {headers: headers})
                        .map((resp: Response) => {
                            const result = resp.json();
                            const message =  new Message(result.obj.content, 'Dummy', result.obj._id, null);
                            this.messages.push(message);
                            return message;
                        })
                        .catch((err: Response) => Observable.throw(err.json()));
        /* the response.json() will give the json from message.js back that looks like:
            {
                message: 'Saved Message',
                obj: result
             }
        */
    }

    getMessages() {
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(message.content, 'Dummy', message._id, null));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((err: Response) => Observable.throw(err.json()));
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message)
    }

    updateMessage(message: Message) {
        // this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        // only sets up an observable, not doing a request,
        // but allows us to subscribe to it and holds the request
        // no one has yet subscribed to it, so why would you send a request?
        return this.http.patch('http://localhost:3000/message/' + message.messageId, body, {headers: headers})
            .map((resp: Response) => resp.json())
            .catch((err: Response) => Observable.throw(err.json()));
    }

    deleteMessage(message: Message) {
        // optimistic delete from front end
        this.messages.splice(this.messages.indexOf(message), 1);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        // only sets up an observable, not doing a request,
        // but allows us to subscribe to it and holds the request
        // no one has yet subscribed to it, so why would you send a request?
        return this.http.delete('http://localhost:3000/message/' + message.messageId)
            .map((resp: Response) => resp.json())
            .catch((err: Response) => Observable.throw(err.json()));
    }
}

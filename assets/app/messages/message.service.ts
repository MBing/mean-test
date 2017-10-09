import { Headers, Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { Message } from "./message.model";

// to use the Http module, you need your class to have metadata, this is not a Component,
// so you use 'Injectable' to provide you with metadata to be able to work with it.
@Injectable()
export class MessageService {
    private messages: Message[] = [];

    constructor(private http: Http) {}

    addMessage(message: Message) {
        this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        // only sets up an observable, not doing a request,
        // but allows us to subscribe to it and holds the request
        // no one has yet subscribed to it, so why would you send a request?
        return this.http.post('http://localhost:3000/message', body, {headers: headers})
                        .map((resp: Response) => resp.json())
                        .catch((err: Response) => Observable.throw(err.json()));
        /* the response.json() will give the json from message.js back that looks like:
            {
                message: 'Saved Message',
                obj: result
             }
        */
    }

    getMessages() {
        return this.messages;
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}

import { NgModule } from "@angular/core";
import { MessageComponent } from "./message.component";
import { MessageListComponent } from "./message-list.component";
import { MessageInputComponent } from "./message-input.component";
import { MessagesComponent } from "./messages.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MessageService } from "./message.service";

@NgModule({
    declarations: [
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

    ],
    providers: [MessageService]
})
export class MessageModule {

}

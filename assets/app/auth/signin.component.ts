import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    myForm: FormGroup;

    onSubmit() {
        console.log(this.myForm);
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[^@]+@[^@]+\\.[a-zA-Z]{2,}")
            ]),
            password: new FormControl(null, Validators.required)
        })
    }
}

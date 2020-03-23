import { FormControl } from '@angular/forms';

export class dateValidator {

    static isValid(control: FormControl): any {
        var now = new Date();

        if (control.value > now.toISOString()) {
            console.log(now + '------' + control.value)
            return {
                "no future date allowed": true
            };
        }
        return null;
    }
}
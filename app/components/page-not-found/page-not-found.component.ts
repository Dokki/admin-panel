import {Component} from '@angular/core';

@Component({
    selector: 'page-not-found',
    template: `
<div class="error-template">
        <h1>404</h1>
        <p><strong>Sorry, an error has occured, Requested page not found!</strong></p>
        </div>
    `,
    styles: ['.error-template {text-align: center;} h1 {padding: 40px 0 15px}']
})
export class PageNotFoundComponent { }

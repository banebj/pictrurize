import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        BrowserAnimationsModule, 
        ToastrModule.forRoot({
            closeButton: true,
            disableTimeOut: true,
            positionClass: 'toast-top-center',
            autoDismiss: false
        })
    ],
    exports: [
        CommonModule,
        NgbModule,
    ]
})
export class SharedLibsModule {}

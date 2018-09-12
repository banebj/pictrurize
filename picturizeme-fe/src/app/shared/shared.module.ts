import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import { SharedLibsModule } from './shared-libs.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        SharedLibsModule,
    ],
    declarations: [
    ],
    providers: [
        DatePipe,
        // {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
    ],
    exports: [
        SharedLibsModule,
        DatePipe,
        FormsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule {}

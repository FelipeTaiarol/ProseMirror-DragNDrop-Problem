import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter, trigger, transition, style, animate, ViewEncapsulation, ViewChild, ElementRef, ChangeDetectorRef, Renderer } from '@angular/core';

@Component({
    selector: 'ruum-task',
    template: `
        <div>
            <div>{{id}}</div>
            <div>{{description}}</div>
       </div>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent{
    id: string;
    description: string;
}

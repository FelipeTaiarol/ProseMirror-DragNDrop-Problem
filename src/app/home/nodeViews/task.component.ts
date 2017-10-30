import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter, trigger, transition, style, animate, ViewEncapsulation, ViewChild, ElementRef, ChangeDetectorRef, Renderer } from '@angular/core';

@Component({
    selector: 'ruum-task',
    template: `
        <div class="task">
            <div>{{id}}</div>
            <div>{{description}}</div>
       </div>
    `,
    styles: [`
        .task{
            background: red;
            color: white;
            width: 200px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent{
    id: string;
    description: string;
}

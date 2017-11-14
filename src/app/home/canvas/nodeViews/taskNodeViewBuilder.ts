import { Injectable, Injector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { TaskComponent } from './../../tasks/task.component';

@Injectable()
export class TaskNodeViewBuilder{
    constructor(private injector: Injector){}

    buildNodeView(){
        return (node, view, getPos) => {
            const componentRef = this.buildComponent(node);         
            return {
                dom: componentRef.location.nativeElement,
                setSelection: (anchor, head) => {
                },
                stopEvent: event => { 
                    const isDrop = event.type === 'drop';
                    let stopEvent;
                    if(isDrop){
                        stopEvent = false;
                    }else{
                        const isOnComponent = event.target === componentRef.location.nativeElement;
                        if(isOnComponent){
                            const isDragging = event.type.indexOf('drag') !== -1;
                            const isMouseDown = event.type === "mousedown";
                            stopEvent = !(isDragging || isMouseDown);
                        }else{
                            stopEvent = true;
                        }
                    }
                    console.log(`stop ${event.type}? ${stopEvent}`);
                    return stopEvent;
                },
                update: newNode => {
                    return false;
                },
                ignoreMutation: mutation => {
                    return true;
                },
                destroy: () => {
                    componentRef.destroy();
                }
            }
        }
    }

    private buildComponent(node): ComponentRef<TaskComponent>{
        const taskRef =  (<ComponentFactoryResolver>this.injector.get(ComponentFactoryResolver)).resolveComponentFactory<TaskComponent>(TaskComponent).create(this.injector);
        taskRef.instance.id = node.attrs.id;
        taskRef.instance.description = node.attrs.description;
        taskRef.changeDetectorRef.detectChanges();
        return taskRef;
    }

    private getTaskFromNodeAttrs(attrs){
        return {
            id: attrs.id,
            sectionId: attrs.sectionId,
            description: attrs.description
        }
    }
}
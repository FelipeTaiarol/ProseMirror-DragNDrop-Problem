import { Injectable, Injector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { TaskComponent } from './task.component';

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
                stopEvent: () => { 
                    return true;
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
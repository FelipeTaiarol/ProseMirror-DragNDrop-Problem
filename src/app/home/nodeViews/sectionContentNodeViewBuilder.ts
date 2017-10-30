import { Injectable, Injector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { SectionsService } from './../sections.service';

@Injectable()
export class SectionContentNodeViewBuilder{
    constructor(private injector: Injector, private sectionsService: SectionsService ){}

    buildNodeView(){
        return (node, view, getPos) => {
            const sectionId: string = node.attrs.sectionId || node.attrs.id.replace('_content', '');
            const instance = this.buildComponent(sectionId);
            return {
                dom: instance.sectionContent,
                contentDOM: instance.proseMirrorContent,
                selectNode: () => {                                                         
                },
                stopEvent: () => {                                     
                    const isDragging = event.type.indexOf('drag') !== -1;
                    const isMouseDown = event.type === "mousedown";
                    const isDrop = event.type === 'drop';
                    const shouldStop = !isDragging && !isMouseDown && !isDrop;
                    if(shouldStop){
                        console.log('stop', event);
                    }
                    return shouldStop;
                },
                ignoreMutation: mutation => {                  
                    return true;
                },
                update: node => {
                    return false;
                },
                destroy: () => {
                    instance.subscription.unsubscribe();
                }
            }
        }
    }

    private buildComponent(sectionId: string){
        const proseMirrorContent = document.createElement('div');
        proseMirrorContent.setAttribute('class', 'prose-mirror-content');
        const sectionContent = document.createElement('div');
        sectionContent.setAttribute('class', 'section-collapsable-content');
        sectionContent.appendChild(proseMirrorContent);
        const subscription = this.sectionsService.isCollapsed(sectionId).subscribe(isCollapsed => {
            if(isCollapsed){
                sectionContent.setAttribute('style', 'display: none;');
            }else{
                sectionContent.removeAttribute('style');
            }
        });
        return {proseMirrorContent, sectionContent, subscription};
    }
}
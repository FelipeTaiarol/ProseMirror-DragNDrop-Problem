import { Component, ElementRef, ViewChild } from '@angular/core';
import { EditorView } from 'prosemirror-view';
const {Plugin, EditorState} = require("prosemirror-state");
import { canvasSchema } from './canvas.schema';
import { initialDoc } from './initialDoc';
const {keymap} = require("prosemirror-keymap")
const {baseKeymap} = require("prosemirror-commands")
import { buildKeymap } from 'prosemirror-example-setup';
import { SectionContentNodeViewBuilder } from './nodeViews/sectionContentNodeViewBuilder';
import { TaskNodeViewBuilder } from './nodeViews/taskNodeViewBuilder';

@Component({
  selector: 'home',
  styles: [`
    
  `],
  template: `
    <h1>Prosemirror</h1>
    <div #editor></div>
  `
})
export class HomeComponent {
  @ViewChild('editor')
  editorDOM: ElementRef;

  constructor(private sectionContentNodeViewBuilder: SectionContentNodeViewBuilder,
              private taskNodeViewBuilder: TaskNodeViewBuilder){}

  ngOnInit(){
    const doc = canvasSchema.nodeFromJSON(initialDoc);
    const initialState =  EditorState.create({
      doc: doc, 
      plugins: [
        keymap(buildKeymap(canvasSchema)),
        keymap(baseKeymap),
      ]
    });
    this.buildEditor(initialState);
  }
  
  private buildEditor(state){
      const editorView = new EditorView(this.editorDOM.nativeElement, {
          state: state,
          dispatchTransaction: transaction => {
              const newState = editorView.state.apply(transaction);
              editorView.updateState(newState);
          },
          nodeViews: {
            task: this.taskNodeViewBuilder.buildNodeView(),
            sectionContent: this.sectionContentNodeViewBuilder.buildNodeView()
          }
      });
      return editorView;
  }
}



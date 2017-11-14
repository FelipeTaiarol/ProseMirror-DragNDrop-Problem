import { Component, ElementRef, ViewChild } from '@angular/core';
import { EditorView } from 'prosemirror-view';
const {Plugin, EditorState} = require("prosemirror-state");
import { canvasSchema } from './canvas.schema';
import { initialDoc } from './initialDoc';
const {keymap} = require("prosemirror-keymap")
const {baseKeymap} = require("prosemirror-commands")
import { buildKeymap } from 'prosemirror-example-setup';
import { TaskNodeViewBuilder } from './nodeViews/taskNodeViewBuilder';

@Component({
  selector: 'canvas-test',
  template: `
    <div class="canvas">
       <div #editor></div>
    </div>
  `,
  styles: [`
      .canvas{
        width: 1024px;
        height: 800px;
      }
  `]
})
export class CanvasComponent {
  @ViewChild('editor')
  editorDOM: ElementRef;

  constructor(private taskNodeViewBuilder: TaskNodeViewBuilder){}

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
              window['currentCanvasState'] = newState;
          },
          nodeViews: {
            task: this.taskNodeViewBuilder.buildNodeView()
          }
      });
      return editorView;
  }
}



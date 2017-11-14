import { Component, ElementRef, ViewChild } from '@angular/core';
import { EditorView } from 'prosemirror-view';
const {Plugin, EditorState} = require("prosemirror-state");
import { canvasSchema } from './canvas/canvas.schema';
import { initialDoc } from './canvas/initialDoc';
const {keymap} = require("prosemirror-keymap")
const {baseKeymap} = require("prosemirror-commands")
import { buildKeymap } from 'prosemirror-example-setup';
import { TaskNodeViewBuilder } from './canvas/nodeViews/taskNodeViewBuilder';

@Component({
  selector: 'home',
  styles: [``],
  template: `
    <h1>Prosemirror</h1>
    <canvas-test></canvas-test>
  `
})
export class HomeComponent {}



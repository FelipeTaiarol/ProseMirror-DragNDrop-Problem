const {Schema} = require("prosemirror-model");

const nodes = {
    doc: {
        content: '(section)*'
    },

    section: {
        selectable: false,
        defining: true,
        isolating: true,
        attrs: {
            id: {}
        },
        content: 'sectionHeader sectionContent',
        parseDOM: [{
            tag: "div",
            /** not sure if this is the way to do it */
            getAttrs: dom => {
                let id = dom.getAttribute("id");
                if(id){
                    id = id.replace(/^canvas-/, '');
                }
                return {id: id};
            }
        }],
        toDOM: node => ["div", {"id": 'canvas-' + node.attrs.id, class: 'canvas-section'}, 0]
    },

    sectionHeader: {
        selectable: false,
        defining: true,
        isolating: true,
        attrs: {
          id: {default: null},
          sectionId: {default: null},
          text: {default: null},
          dueDate: {default: null},
          index: {default: null}
        },
        toDOM(node){ return ['div', 0]; }
    },

    sectionContent: {
        selectable: false,
        defining: true,
        isolating: true,
        content: "(paragraph | heading | component | list)*",
        attrs: {
            id: {default: null},
            sectionId: {default: null}
        },
        toDOM: node => ["div", {id: node.attrs.id}, 0]
    },

    paragraph: {
        content: "inline*",
        parseDOM: [{tag: "p"}],
        toDOM() { return ["p", 0] }
    },

    heading: {
        attrs: {level: {default: 1}},
        content: "inline*",
        defining: true,
        parseDOM: [{tag: "h1", attrs: {level: 1}},
                    {tag: "h2", attrs: {level: 2}},
                    {tag: "h3", attrs: {level: 3}},
                    {tag: "h4", attrs: {level: 4}},
                    {tag: "h5", attrs: {level: 5}},
                    {tag: "h6", attrs: {level: 6}}],
        toDOM(node) { return ["h" + node.attrs.level, 0] }
    },

    text: {
        group: "inline"
    },

    hard_break: {
        inline: true,
        group: "inline",
        selectable: false,
        parseDOM: [{tag: "br"}],
        toDOM() { return ["br"] }
   },

    task:  {
        group: "component",
        selectable: true,
        draggable: true,
        attrs: { 
            id: {},
            description: {default: null},
        },
        toDOM: function(node){
            return ["ruum-task", { 
               /** style for testing without nodeView. */
                style: 'width: 200px; height: 20px; background: red; display: block',
                'data-id': node.attrs.id, 
                'data-description': node.attrs.description 
            }];
        },
        parseDOM: [{
            tag: "ruum-task", 
            getAttrs: function getAttrs(dom) {
                return {
                    id: dom.getAttribute("data-id"), 
                    description: dom.getAttribute("data-description")
                }
            }
        }]
    },
    

    orderedList: {
      attrs: {order: {default: 1}},
      parseDOM: [{tag: "ol", getAttrs(dom) {
        return {order: dom.hasAttribute("start") ? +dom.getAttribute("start") : 1}
      }}],
      toDOM(node) {
        return ["ol", {start: node.attrs.order == 1 ? null : node.attrs.order}, 0]
      },
      content: "listItem+", 
      group: 'list'
    },

    bulletList: {
      parseDOM: [{tag: "ul"}],
      toDOM() { return ["ul", 0] },
      content: "listItem+", 
      group: 'list'
    },

    listItem: {
      parseDOM: [{tag: "li"}],
      toDOM() { return ["li", 0] },
      defining: true,
      content: 'paragraph+'
    }
}

const marks = {
  link: {
    attrs: {
      href: {},
      title: {default: null}
    },
    inclusive: false,
    parseDOM: [{tag: "a[href]", getAttrs(dom) {
      return {href: dom.getAttribute("href"), title: dom.getAttribute("title")}
    }}],
    toDOM(node) { return ["a", node.attrs] }
  },

  em: {
    parseDOM: [{tag: "i"}, {tag: "em"},
               {style: "font-style", getAttrs: value => value == "italic" && null}],
    toDOM() { return ["em"] }
  },

  strong: {
    parseDOM: [{tag: "strong"},
               // This works around a Google Docs misbehavior where
               // pasted content will be inexplicably wrapped in `<b>`
               // tags with a font-weight normal.
               {tag: "b", getAttrs: node => node.style.fontWeight != "normal" && null},
               {style: "font-weight", getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null}],
    toDOM() { return ["strong"] }
  }
}

export const canvasSchema = new Schema({nodes, marks});
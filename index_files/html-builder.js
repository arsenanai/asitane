const singleTagsList = new Set(['hr', 'br', 'img']);
buildNode = (name, ...args) => {
  const C = singleTagsList.has(name) ? SingleTag : PairedTag;
  return new C(name, ...args);
};

function attrAsString(){
  return `${Object.keys(this.attributes)
  .map(el => ` ${el}="${this.attributes[el]}"`).join('')}`;
}

function Node(name, attributes = {}) {
  this.name = name;
  this.attributes = attributes;
  this.attrAsString = attrAsString;
}

function SingleTag(name, attributes) {
  Node.apply(this, [name, attributes]);
}

SingleTag.prototype.toString = function toStrin(){
  return `<${this.name} ${this.attrAsString()}>`;
}

function PairedTag(name, attributes, body='', children = []) {
  Node.apply(this, [name, attributes]);
  this.body = body;
  this.children = children;
}

PairedTag.prototype.toString = function toStrin(){
  const content = (this.children.length != 0) ? 
  this.children.map(child => child.toString()).join('') : this.body;
  return `<${this.name}${this.attrAsString()}>${content}</${this.name}>`;
}


// const test = buildNode('html', { class: 'header' }, 'body', []);
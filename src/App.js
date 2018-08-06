import React, { Component } from 'react';
import './App.css';
import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
	return `<a target="_blank" href="${href}">${text}</a>`;
}

marked.setOptions({
	renderer: renderer,
	breaks: true,
	tables: true,
	xhtml: true,
	smartypants: true
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			markdownValue: placeholder,
			previewValue: ""
		};
	}

	onTextChange = (e) => {
		const {value} = e.target;
		this.setState({
			markdownValue: value
		}, () => {
			this.previewValue();
		});
	};

	previewValue = () => {
		const rawMarkup = marked(this.state.markdownValue);
		this.setState({
			previewValue: rawMarkup
		});
	};

	componentDidMount() {
		this.previewValue();
	}

	render() {
		return (
			<div className="App">
				<textarea id="editor" value={this.state.markdownValue} onChange={this.onTextChange} style={{ margin: "0px", width: "606px", height: "230px"}}/>
				<div id="preview" dangerouslySetInnerHTML={{__html: this.state.previewValue}}/>
			</div>
		);
	}
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

export default App;

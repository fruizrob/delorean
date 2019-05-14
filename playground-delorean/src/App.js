import React, { Component, createRef } from "react";
import "./App.css";

import debuggerDelorean from "../../src/debugger";
import Layout from "./components/Layout";
import Console from "./components/Console";
import Output from "./components/Output";
import StatusBar from "./components/StatusBar";

import CodeMirror from "@uiw/react-codemirror";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/keymap/sublime";
import "codemirror/theme/neo.css";

import example1 from "../../example/input1";
import example2 from "../../example/input2";
import example3 from "../../example/input3";

global.delorean = require("../../src/delorean.js");
global.vm = require("../../unwinder/runtime/vm.js");

class App extends Component {
  state = {
    tabs: [
      {
        name: "simpleBug.js",
        input: example1
      },
      {
        name: "timeWastingLoop.js",
        input: example2
      },
      {
        name: "differentStages.js",
        input: example3
      }
    ],
    tabSelected: "",
    snapshots: [],
    dependencies: [],
    code: "// You can use Delorean here! :)",
    isRunning: false,
    readOnly: false,
    selected: false,
    selectedTarget: "",
  };

  constructor(props){
    super(props)
    this.consoleFeed = createRef();
    this.editor = createRef();
  }

  updateCode = ev => {
    if(typeof ev == 'string'){
      this.setState({
        code: ev,
      });
    } else {
      this.setState({
        code: ev.getValue(),
      });
    }
  };

  selectTab = ev => {
    if(!this.state.isRunning){
      let example = this.state.tabs.find(
        o => o.name === ev.currentTarget.firstChild.getAttribute("name")
      );
      this.updateCode(example.input);
      this.selectTabColor(ev);
    } else {
      alert('Sorry, you need stop this execution before change the code! :)')
    }
  };

  selectTabColor = ev => {
    if (this.state.selected) {
      this.state.selectedTarget.classList.remove("selected");
    } else {
      this.setState({
        selected: true
      });
    }
    ev.currentTarget.classList.add("selected");
    this.setState({
      selectedTarget: ev.currentTarget
    });
  };

  updateSnapshots = snapshots => {
    this.setState({
      snapshots
    });
  };

  updateDependencies = dependencies => {
    this.setState({
      dependencies
    });
  };

  toggleIsRunning = () => {
    this.setState({
      isRunning: !this.state.isRunning,
      readOnly: !this.state.readOnly
    });
  };

  executeCode = () => {
    try {
      this.toggleIsRunning();
      debuggerDelorean.init(this.state.code);
      this.updateDependencies(global.heap.dependencies);
      this.updateSnapshots(global.heap.snapshots);
    } catch (error) {
      console.error(error);
    }
  };

  invokeContinuation = ev => {
    this.consoleFeed.current.state.logs = [];
    let kont = ev.currentTarget.attributes["kont"].value;
    debuggerDelorean.invokeContinuation(kont);
  };
  
  stopExecution = () => {
    this.consoleFeed.current.state.logs = [];
    this.editor.current.editor.setOption('readOnly', false);
    global.heap = {
      dependencies: {},
      snapshots: []
    };
    global.continuations = {};
    global.snapshotCounter = 0;
    this.toggleIsRunning();
    this.setState({
      snapshots: [],
      dependencies: []
    });
  };

  render() {
    var options = {
      theme: "neo",
      tabSize: 2,
      keyMap: "sublime",
      mode: "js",
      lineNumbers: true,
      readOnly: this.state.readOnly
    };
    return (
      <Layout>
        <StatusBar
          tabs={this.state.tabs}
          selectTab={this.selectTab}
          executeCode={this.executeCode}
          stopExecution={this.stopExecution}
          isRunning={this.state.isRunning}
        />
        <div className="playground-container">
          <div className="left-panel">
            <div className="editor-container">
              <CodeMirror
                ref={this.editor}
                value={this.state.code}
                options={options}
                onChange={this.updateCode}
              />
            </div>
            <Console 
              ref={this.consoleFeed} 
            />
          </div>
          <div className="right-panel">
            <Output
              snapshots={this.state.snapshots}
              dependencies={this.state.dependencies}
              invokeContinuation={this.invokeContinuation}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default App;

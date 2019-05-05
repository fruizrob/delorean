import React, { Component } from 'react'
import { Hook, Console, Decode } from 'console-feed'

class ConsoleContainer extends Component {
  state = {
    logs: []
  }

  componentDidMount() {
    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
  }

  render() {
    return (
      <div className="consolefeed-container" style={{ backgroundColor: '#242424' }}>
        <h2 className="console-title">Output  </h2>
        <div>
          <Console 
            logs={this.state.logs} 
            variant="dark"
          />
        </div>
      </div>
    )
  }
}

export default ConsoleContainer;
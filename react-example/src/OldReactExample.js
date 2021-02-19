import './App.css';
import 'overtime-visualizer';
import React, {Component} from 'react';

class OldReactExample extends Component {

  constructor(props) {
        super(props);

        this.visualizerRef = React.createRef();

    this.state = {
      overtime: [
                {name: 'Free overtime', color: '#F77', value: 10, priority: 1},
                {name: 'Valuable overtime', color: '#FF7', value: 15, priority: 2},
                {name: 'Premium overtime', color: '#77F', value: 20, priority: 3}
              
      ],
            subtract: 0
          
    }
      
  }

  inputChangeHandler(e) {
        this.setState({subtract: e.target.value});
      
  }

  render() {
    return (
          <div className="App">
                  <overtime-visualizer ref={this.visualizerRef} subtract={this.state.subtract} overtimeData={this.state.overtime} ></overtime-visualizer>
                          <hr/>
                                  <input type="number" onChange={this.inputChangeHandler.bind(this)}/>
            </div>
          
        ); 
      
  }

  componentDidMount() {
        this.visualizerRef.current.subtract = this.state.react;
        this.visualizerRef.current.overtimeData = this.state.overtime;
      
  }
}

export default OldReactExample;

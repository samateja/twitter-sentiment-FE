import React, { Component } from 'react';
import {XYPlot,XAxis,YAxis,VerticalGridLines, HorizontalGridLines,VerticalBarSeries} from 'react-vis';

import './App.css';
import '../../node_modules/react-vis/dist/style.css';


class App extends Component {
  state = {
      response: '',
      post: '',
      responseToPost: ''
    }

  handleSubmit = async e => {
      e.preventDefault();
      let string = this.state.post;

      if (string.match('#'))
        string = string.replace('#','');

      const response = await fetch('http://localhost:3001/api/results/'+ string);
      const body = await response.text();
      const parsedResponse = JSON.parse(body);
      const twitterData = parsedResponse.twData;
      const scores =  parsedResponse.dScores;

      if (response.status !== 200){
        throw Error(body.message);
      } else {
        this.setState({ twData : twitterData, dScores : scores });
      }
    };
    createBox = () => {
      let box = [];
      let data = this.state.twData;

      if (data ){
        let parsedData = JSON.parse(data);
        for (let i=0; i<parsedData.length;i++){
           box.push(<div className='card' key={i}>
                    <div className='card-content' key={i}> {parsedData[i]} </div>
                    </div>);
        }
      }
      return box;
    }

    getScores = () => {
       let scores = this.state.dScores;
       let data = [];
       if (scores){
          let finalData = JSON.parse(scores);
         data.push(
           {x:'very Negative',y:finalData.veryNegative},
           {x:'negative',y:finalData.negative},
           {x:'neutral',y:finalData.neutral},
           {x:'positive',y:finalData.positive},
           {x:'very Positive',y:finalData.veryPositive}
         );
       }
       return data;
     }
  render() {
    return (
      <div className="App">
        <div className="container">
          <h2> Twitter Sentiment Analysis </h2>
          <p> Enter Hastag to search tweets </p>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className = "col-md-10">
                  <input
                    type="text"
                    className="twitterText"
                    value={this.state.post}
                    placeholder = "Enter HashTag to search"
                    onChange={e => this.setState({ post: e.target.value })}
                  />
                </div>
                <div className = "col-md-2">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
            <div className="row">
                <div className="col-md-12">
                <XYPlot margin={{bottom: 70}} xType="ordinal" width={850} height={400}>
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis tickLabelAngle={-45} />
                  <YAxis />
                  <VerticalBarSeries
                    data={this.getScores()}
                  />
                </XYPlot>
                </div>
              <div className="col-md-12">
                {this.createBox()}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;

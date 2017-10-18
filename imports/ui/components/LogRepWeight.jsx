
import React from 'react';
import { Component } from 'react';


import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';


import TextField from 'material-ui/TextField';



class LogRepWeight extends Component {

  constructor(props) {
    super(props);

    this.state = {
      prevRepHint: ''
    }

  }

  componentWillMount(){
   
    let prevRepWeight = this.props._prevWorkoutRepWeight;
    if(prevRepWeight == undefined){
      this.setState({prevRepHint: 'weight'});
    }
    else{
      this.setState({prevRepHint: this.props._prevWorkoutRepWeight});
    }
  }

  _handleChange(event, date){


    this.props._editCurrentWorkoutRepWeight(this.props._exerciseNumber, this.props._repNumber, event.target.value);

 

  }

  _writeFailure(repValue){

    
    if(repValue == ""){
      return "f";
    }
    else{
      return "";
    }

  }


  render(){
    return(
      <Col md={3} sm={4} xs={6}>
        <TextField
          hintText={this.state.prevRepHint}
          value={this.props._currentWorkoutRepWeight}
          type="number"
          min="0"
          floatingLabelText={"Set " + (this.props._repNumber + 1) + " (x" + this.props._repCount + this._writeFailure(this.props._repCount) + ")"}
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this._handleChange.bind(this)}
        />
      </Col>

    );
  }
}


export default LogRepWeight;
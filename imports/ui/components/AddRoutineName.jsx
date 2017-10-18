
import React from 'react';
import { Component } from 'react';


import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';


import style from '../../../client/styles.js';


class AddRoutineName extends Component {

  constructor(props) {
    super(props);
    this.state = {routineName: ""};
  }

  _handleChange(event, index, value){
   
    this.setState({routineName: event.target.value});


    this.props._changeRoutineName(event.target.value);
  }

  render(){
    return(
      <Card>
        <CardHeader>
          <h2 style={style.logRoutineHeaderStyle}><b>Create a Workout Routine</b></h2>
          <TextField
            value={this.state.routineName}
            onChange={this._handleChange.bind(this)}
            floatingLabelText="Routine Name"
            hintText="My Fitness Plan"
            fullWidth={true}
          />
        </CardHeader>
      </Card>
    )
  }
}


export default AddRoutineName;
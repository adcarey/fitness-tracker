
import React from 'react';
import { Component } from 'react';


import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';


import style from '../../../client/styles.js';



class LogWorkoutDate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      controlledDate: new Date(),
    };
  }

  _handleChange(event, date){
    
    this.setState({
      controlledDate: date,
    });

    
    this.props._editCurrentWorkoutDate(date);
  }

  render(){
    return(
      <Card>
        <CardHeader>
           <h2 style={style.logRoutineHeaderStyle}><b>{this.props._routineName}</b></h2>
           <h4 style={style.logRoutineComponentStyle}>{this.props._workoutName}</h4>
           <div style={style.logRoutineComponentStyle}>
             <DatePicker
              hintText="Date of Workout"
              firstDayOfWeek={0}
              fullWidth={true}
              value={this.state.controlledDate}
              onChange={this._handleChange.bind(this)}
            />
          </div>
         </CardHeader>
      </Card>
    )
  }
}


export default LogWorkoutDate;
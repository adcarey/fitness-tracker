
import React from 'react';
import { Component } from 'react';
import style from '../../../client/styles.js';


import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class HomePage extends Component {

  render() {

    const buttonStyle = {
      margin: '10px'
    }

    return (
      <Container>
        <div>

          <Card> 
            <CardHeader title="Welcome to your daily workout tracker! Don't forget your workout again, save it to our database! Login to view old workouts or signup and get started!" titleStyle={style.homepageStyle} 
            /> 
            <CardActions>
              <Row>
                <center>
                  <RaisedButton style={buttonStyle} label="Signup" secondary={true} href="users/signup"/>
                  <RaisedButton style={buttonStyle} label="Login" primary={true} href="users/login"/>
                </center>
              </Row>
            </CardActions>
            <CardMedia>
              <img src="img/people.jpg" />
            </CardMedia>
          </Card>

        </div>
      </Container>
    );

  }

};

export default HomePage;





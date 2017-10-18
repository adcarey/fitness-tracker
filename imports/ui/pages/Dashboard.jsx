
import React from 'react';
import { Component } from 'react';
import {render} from 'react-dom';


import DashboardNav from '../components/DashboardNav';
import ProgressChart from '../components/ProgressChart';


class Dashboard extends Component {
  render() {
    return (
    <div>
      <DashboardNav />
      <ProgressChart />
    </div>
    );
  }
};

export default Dashboard;
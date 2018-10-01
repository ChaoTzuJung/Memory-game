import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Home from './screens/homeSceeen';
import Memo from './screens/memoSceeen';
import Exam from './screens/examSceeen';

class Routes extends Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar>
                    <Scene key="home" component={Home} />
                    <Scene key="memo" component={Memo} />
                    <Scene key="exam" component={Exam} />
                </Stack>
            </Router>
        );
    }
}

export default Routes;

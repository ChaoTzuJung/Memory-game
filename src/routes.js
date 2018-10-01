import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Home from './screens/homeScreen';
import Memo from './screens/memoScreen';

class Routes extends Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar>
                    <Scene key="home" component={Home} />
                    <Scene key="memo" component={Memo} />
                </Stack>
            </Router>
        );
    }
}

export default Routes;

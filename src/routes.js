import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Home from './screens/homeScreen';

class Routes extends Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar>
                    <Scene key="home" component={Home} />
                </Stack>
            </Router>
        );
    }
}

export default Routes;

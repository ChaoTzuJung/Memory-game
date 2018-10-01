// 看圖記憶的頁面
import _ from "lodash";
import React, { Component } from "react";
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Button,
    TouchableOpacity
} from "react-native";

import { Actions } from "react-native-router-flux";
import config from "../config";
import IconBox from "../components/iconBox";

const { QUESTION_COUNT, MEMO_TIME } = config;

class Memo extends Component {
    state = {
        questions: [1,2,3]
    };

    renderQuestions = () => {
        return this.state.questions.map((question, index) => (
            <View key={index} style={styles.question}>
                <IconBox
                    title="Color"
                    iconName="airplane"
                    iconColor="2196F3"
                />
                <IconBox
                    title="Shape"
                    iconName="ghost"
                    iconColor="#607D8B"
                />
            </View>
        ));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.desc}>
                    記住每一題的圖形和顏色
                </Text>
                <ScrollView style={styles.questionContainer}>
                    {this.renderQuestions()}
                </ScrollView>
                <View style={styles.timerContainer}>
                    <TouchableOpacity style={styles.skipButton}>
                        <Text style={styles.skipLabel}>跳過</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Memo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: "space-around"
    },
    question: {
        marginTop: 15,
        padding: 8,
        justifyContent: "space-around",
        backgroundColor: "#FFF",
        alignItems: "center",
        flexDirection: "row"
    },
    timerContainer: {
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    skipButton: {
        padding: 10,
        backgroundColor: "#29B6F6",
        position: "absolute",
        right: 15
    },
    skipLabel: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1.5
    },
    desc: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center",
        fontSize: 18
    },
    questionContainer: {
        marginLeft: 15,
        marginRight: 15
    }
});
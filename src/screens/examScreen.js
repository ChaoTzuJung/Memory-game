// 解題頁面
import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component, PureComponent } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Modal
} from "react-native";
import IconBox from "../components/iconBox";
import {
    createUniqRandomIcons,
    randomIconColor,
    randomIconName
} from "../utils/icons";
import config from "../config";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CountDownTimer from "../components/countDownTimer";
import { Actions } from "react-native-router-flux";

const { ANSWER_TIME, QUESTION_COUNT, SELECTION_COUNT } = config;

class Exam extends Component {
    // 接收前一個場景出的題目，到作答頁面，確定題目型別是正列
    static propTypes = {
        questions: PropTypes.array.isRequired
    };

    state = {
        items: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30], // 所有icon題目(30個)
        selected: [], // 已選的icon
        isFinished: false,
        score: 0
    };

    renderQuestions = () => {
        return this.state.items.map((item, index) => (
            <TouchableOpacity
                key={index}
                disabled={true}
                onPress={() => console.log(item)}
            >
                <Icon
                    name="airplane"
                    size={40}
                    color="#4CAF50"
                    style={{ padding: 12, opacity: 1 }}
                />
            </TouchableOpacity>
        ))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.desc}>
                    選出正確的{this.props.questions.length}個顏色圖形組合
                </Text>
                <View style={styles.content}>
                    {this.renderQuestions()}
                </View>
                <View style={styles.footer}>
                    {this.state.isFinished ? (
                        <View style={styles.resultContainer}>
                            <Text style={[styles.label, { color: "#EF5350" }]}>
                                答對了{this.state.score}題
                            </Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={[styles.label, { color: "#FFF" }]}>回首頁</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <CountDownTimer />
                    )}
                </View>
            </View>
        );
    }
}

export default Exam;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        justifyContent: "space-around",
        alignItems: "center"
    },
    content: {
        margin: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        backgroundColor: "#FFF"
    },
    footer: {
        height: 120,
        justifyContent: "center"
    },
    resultContainer: {
        flex: 1,
        justifyContent: "space-around"
    },
    button: {
        padding: 10,
        backgroundColor: "#29B6F6"
    },
    label: {
        fontSize: 20,
        fontWeight: "600",
        color: "#29B6F6",
        textAlign: "center"
    },
    desc: {
        marginTop: 10,
        fontSize: 20
    }
});
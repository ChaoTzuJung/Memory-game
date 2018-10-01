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
import {
    randomIconName, randomIconColor, createUniqRandomIcons
} from '../utils/icons';
import IconBox from "../components/iconBox";
import CountDownTimer from "../components/CountDownTimer";

const { QUESTION_COUNT, MEMO_TIME } = config;

class Memo extends Component {
    state = {
        questions: []
    };

    componentDidMount() {
        const questions = createUniqRandomIcons(QUESTION_COUNT); // return array and include object (key1:name, key2: color)
        this.setState({
            questions
        });
    }

    onTimerFinish = () => {
        Action.exam({
            questions: this.state.questions // 把問題的正解帶到下一頁
        }); 
    }

    handleSkip = () => {
        this.CountDownTimer.onTimesUp(); // 呼叫CountDownTimer下定義的onTimesUp方法，清除this.timer，並執行onFinish()
    }

    renderQuestions = () => {
        return this.state.questions.map((question, index) => (
            <View 
                key={index} 
                style={[
                    styles.question,
                    // just return 0 or 1
                    _.random(1) ? { flexDirection: "row-reverse" } : {}
                ]}>
                <IconBox
                    title="Color"
                    iconName={randomIconName()}
                    iconColor={question.color}
                />
                <IconBox
                    title="Shape"
                    iconName={question.name}
                    iconColor={randomIconColor()}
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
                <CountDownTimer 
                    seconds={MEMO_TIME} 
                    // 將ref這個callback指向CountDownTimer，就可以使用 this.CountDownTimer直接操作CountDownTimer這個DOM
                    ref={ref => {
                        this.CountDownTimer = ref;
                    }}
                    onFinish={this.onTimerFinish} // countdownTimer若執行time up 會呼叫 onFinish() 這個props
                />
                <View style={styles.timerContainer}>
                    <TouchableOpacity style={styles.skipButton} onPress={this.handleSkip}>
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
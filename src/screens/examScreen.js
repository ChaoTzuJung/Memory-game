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
        items: [], // 所有icon題目(30個)
        selected: [], // 已選的icon
        isFinished: false,
        score: 0
    };
    
    componentDidMount() {
        const icons = createUniqRandomIcons(SELECTION_COUNT, this.props.questions); //把之前題目出的5個正解加上25個隨宜icon混在一起成一個30大正列
        const items = icons.map(icon => ({...icon, clicked: false })) //把30個icon加上未被選取的狀態
        console.dir(items);
        const shuffleItems = _.shuffle(items) // createUniqRandomIcons方法所做出的排序會讓前面25個是亂數，會5個是解答，所以要透過shuffle打散
        this.setState({ items: shuffleItems })
    }

    // checkAnswer = targetIcon => {
    //     const { name, color } = targetIcon;
    //     const result = _.find(this.props.questions, { name, color });
    //     return result !== undefined;
    // };

    // 當點選後icon元件rerender完，要處理 "玩家選完答案 -> 遊戲結束"
    componentDidUpdate = (prevState, prevProps) => {
        // 遊戲結束判斷by規則
        if (
            prevState !== this.state && 
            // 玩家點擊題目數量 = 出題數量
            this.state.selected.length === this.props.questions.length &&
            this.state.isFinished === false
        ) {
            this.gameFinished();
        }
    }

    // 計分判斷
    calcScore = () => {
        let count = 0;
        for (let item of this.state.selected) {
            const isCorrect = this.checkAnswer(item);
            if (isCorrect) {
                count += 1;
            }
        }
        return count;
    };

    // gameFinished = async () => {
    //     const score = this.calcScore();
    //     this.setState({ isFinished: true, score });
    //     // 如果是新紀錄 -> 記錄最高分到 AsyncStorage
    //     const highestScore = await getItem(config.HIGHEST_SCORE_STORAGE);
    //     if (score > highestScore) {
    //         setItem(config.HIGHEST_SCORE_STORAGE, score);
    //         Alert.alert("破了新紀錄");
    //     }
    // };

    getOpacity = item => {
        if(this.state.isFinished) {
            const { name, color } = item;
            const isMatchAns = _.find(this.props.questions, { name, color }) !== undefined; // 有選對答案
            if(isMatchAns) {
                return item.clicked ? 0.7 : 1; // 有點選且正確就是0.7，沒點選仍保持1
            }
            return 0.2; // 遊藝結束時，點過且錯誤的icon變為 0.2 透明度
        }

        return item.clicked ? 0.7 : 1; // 有點選就是0.7，沒點過保持1
    }

    handleIconPressed = onPressIcon => {
        this.setState(state => {
            state.items[_.indexOf(state.items, onPressIcon)].clicked = true;
            state.selected = [...state.selected, onPressIcon]
            return state;
        })
        console.log(this.state.selected)
    }

    renderQuestions = () => {
        return this.state.items.map((item, index) => (
            <TouchableOpacity
                key={index}
                disabled={item.clicked}
                onPress={() => this.handleIconPressed(item)}
            >
                <Icon
                    name={item.name}
                    size={40}
                    color={item.color}
                    style={{ padding: 12, opacity: this.getOpacity(item) }}
                />
            </TouchableOpacity>
        ))
    }

    // onTimerFinished = () => {
    //     this.gameFinished();
    // };

    // handleEndButton = () => {
    //     Actions.home({ lastScore: this.state.score });
    // };

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
                            <TouchableOpacity
                                style={styles.button}
                                // onPress={this.handleEndButton}
                            >
                                <Text style={[styles.label, { color: "#FFF" }]}>回首頁</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <CountDownTimer
                            // seconds={ANSWER_TIME}
                            // onFinished={this.onTimerFinished}
                        />
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
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        padding: 10
    }
});

const IconBox = ({ title, iconName, iconColor })=> (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Icon name={iconName} size={40} color={iconColor} />
    </View>
)

export default IconBox;
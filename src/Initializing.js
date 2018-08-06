import React, { Component } from "react";
import { View, Text, StyleSheet,AsyncStorage } from "react-native";
import { goToAuth, goHome } from "./Navigation";

import { USER_KEY } from './Config'

export default class Initialising extends React.Component {
    async componentDidMount() {
        try {
            const user = await AsyncStorage.getItem(USER_KEY)
            console.log('user: ', user)
            if (user) {
                goHome()
            } else {
                goToAuth()
            }
        } catch (err) {
            console.log('error: ', err)
            goToAuth()
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Loading...</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    welcome: {
        fontSize: 24
    }
})
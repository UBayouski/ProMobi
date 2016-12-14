import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
export default class NoteScreen extends React.Component {
    render () {
        return (
                <View style={styles.container}>
                <Text>Create Note Screen!</Text>
                </View>
                );
    }
}
var styles = StyleSheet.create({
                               container: {
                               flex: 1,
                               justifyContent: 'center',
                               alignItems: 'center',
                               }
                               });

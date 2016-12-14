import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View
} from 'react-native';

export default class Button extends React.Component {
    render () {
        return (
<TouchableOpacity onPress={this.props.onPress}>
<View>
<Text>{this.props.customText || ' Button'}</Text>
</View>
</TouchableOpacity>
);
}
}
Button.propTypes = {
onPress: React.PropTypes.func.isRequired,
customText: React.PropTypes.string
};


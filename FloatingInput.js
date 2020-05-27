import React, { Component } from 'react'
import { View, Text, TextInput, Animated } from 'react-native';

class FloatingInput extends Component{

    static defaultProps = {
        floatColor: '#187FC0',
        isInvalid: false
    }

    state = {
        isFocused: false ,
        isFloating: this.props.value ? true : false,
        input: this.props.value? this.props.value : "",
        isValid: this.props.value ? true : false,
        float: this.props.value ? new Animated.Value(0) : new Animated.Value(1) 
    }


    handleInput = (text) => {
        this.setState({input: text})
    }

    handleFocus = () => {
        this.setState({isValid: false, isFloating: true, isFocused:true})
    }

    handleBlur = () => {
    
        this.setState({isFocused: false})

        if(!this.state.input){
            this.setState({isFloating: false})
        } else {
            this.setState({isValid: true})
        }
    }

    componentDidUpdate(){
        
        let isFloating = this.props.value || this.state.isFloating? true : false

        if(this.state.isFocused){
            isFloating = true
        }

        Animated.timing(this.state.float, {
            toValue: isFloating? 0 : 1,
            duration: 200,
        }).start()
    }

    render () {

        let isFloating = this.props.value || this.state.isFloating? true : false
        let isValid = this.props.value && this.state.isFocused? true : false
        let isRed = this.props.isInvalid

        if(this.props.value == '' || this.state.input && this.state.isFocused){
            isValid = false
        } else if(this.props.value && !this.state.isFocused){
            isValid = true
        }

        if(this.props.editable != undefined){
            isValid = true
        }

        if(this.state.isFocused){
            isFloating = true
            isValid = false
        }

        if(isRed){
            isFloating = true
            isRed = true
            isValid = false
        }
        
        let fLableColor = isRed? '#AD1717' : '#00B15C'

        fLableColor = this.state.isFocused ? this.props.floatColor : fLableColor

        const labelStyle = {
            position: 'absolute',
            zIndex: this.state.float.interpolate({
                inputRange: [0, 1],
                outputRange: [1000, -1],
            }),
            left: this.state.float.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 7]
            }),
            top: this.state.float.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 20]
            }),
            fontSize: this.state.float.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 20]
            }),
            color: isValid && isFloating ? '#00B15C' : this.state.float.interpolate({
                inputRange: [0, 1],
                outputRange: [fLableColor, '#aaa']
            }),
            backgroundColor: "#fff",
            borderRadius: 2,
            paddingLeft: 3,
            paddingRight: 3,
            ...this.props.labelStyle
        }

        let validColor = isFloating? this.props.floatColor: 'gray'
        let validWidth = isFloating ? 2 : 1

        validColor = isValid && isFloating ? '#00B15C' : validColor
        validWidth = isValid && isFloating ? 1 : validWidth

        validColor = isRed? '#AD1717' : validColor
        validColor = this.state.isFocused ? this.props.floatColor : validColor


        const inputStyle = {
            borderWidth: validWidth,
            borderColor: validColor,
            alignSelf: "stretch", 
            height: 45,
            padding:8,
            paddingLeft:12,
            borderRadius: 8,
            fontSize: 20,
            ...this.props.inputStyle
        }

        return (
            <View style={{paddingTop: 10, flex:1 ,...this.props.containerStyle}}>
                <Animated.Text style={labelStyle}>
                    {this.props.label}
                </Animated.Text>
                <TextInput onChangeText={(text)=>{
                    this.props.onChangeText(text)
                    this.handleInput(text)
                }}
                style = {inputStyle}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                value={this.props.value}
                keyboardType={this.props.keyboardType}
                />
                <Text style={{marginTop: 3, color:'#AD1717',opacity: isRed? 1 : 0, ...this.props.errorTextStyle}}>
                    {this.props.errorText}
                </Text>
            </View>
        )
    }
}


export default FloatingInput
# @wezyy1/rn-floating-label-input

[![Generic badge](https://img.shields.io/badge/npm-6.14.4-green.svg)](https://www.npmjs.com/package/@wezyy1/rn-floating-label-input)

This is a **React-Native floating label input component**, that visually combines an input label and the input itself into a single element. The floating label switches from placeholder mode to label when input is focused or has content in it.

**Error message is included.**

## Installation

Installation can be done by using the **npm install command**:
```bash
$ npm install @wezyy1/rn-floating-label-input
```

## Demo (Default Style)

![demo](https://amberyiyao.github.io/tryUploadImg/floating.gif)

## Basic Usage

```javascript

import React from 'react';
import { View } from 'react-native';
import FloatingInput from '@wezyy1/rn-floating-label-input'

export default class App extends React.Component{

    state = {
        isInvalid:false,
        email:'',

    }

    emailChange = (text) => {
        this.setState({
            email: text,
            isInvalid: !this.isEmailRightFormat(text)
        })
    }

    isEmailRightFormat = (text) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)){
            return true
        }
            return false
    }

    render(){
        return (
            <View style={{width:'100%'}}>
                <FloatingInput 
                    label="E-mail*" 
                    floatColor = "#187FC0" 
                    isInvalid={this.state.isInvalid} 
                    keyboardType="email-address" 
                    errorText="Please enter a correct email."
                    onChangeText={this.emailChange} 
                    value={this.state.email}
                />
            </View>
        )
    }
}

```

## API

### Props

|Property|Description|Type|Default|
|-|:-:|:-:|-:|
|label|The text of the input label.|String|  |
|floatColor|The color when the input field is focused.|String|'#187FC0'|
|isInvalid|If true, the label will be displayed in an error state and show error message(if has).|bool|false|
|keyboardType|keyboard type popup when the input is focused.|'default', 'number-pad', 'decimal-pad', 'numeric', 'email-address', 'phone-pad'|'default'|
|errorText| The error message shows up when the input is invalid. | String | |
|value| The value displayed the input field. | String | |
|onChangeText| Callback fired when the value is changed. This function will get the value of the input. | Function | |
|labelStyle| The style of the lable. | Style Object | |
|inputStyle| The style of the text input. | Style Object | |
|containerStyle| The style of the container. | Style Object | |
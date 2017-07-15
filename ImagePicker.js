//import liraries
import React from 'react';
import {
    View,
    Button,
    Image,
    ActivityIndicator,
    StyleSheet 
} from 'react-native';

import ImagePicker from 'react-native-image-picker'

const options = {
    title: 'Select image of your avatar',
    storageOption: {
        skipBackup: true,
        path: 'images'
    }
}

// create a component
class AvatarPicker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            avatar: null
        }

        this.onPickImage = this.onPickImage.bind(this)
        this.onReset = this.onReset.bind(this)
    }

    onPickImage() {
        ImagePicker.showImagePicker(options, response => {
            if (!response.didCancel && !response.error) {
                const source = { uri: response.uri }
                this.setState({
                    avatar: source
                })
            }
        })
    }

    onReset() {
        this.setState({
            avatar: null
        })
    }

    renderImageView() {
        return (
            <View>
                <Image 
                    style={styles.image}
                    source={this.state.avatar}
                />
                <Button 
                    onPress={this.onReset}
                    title="Remove"
                    color="#841584"
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.onPickImage}
                    title="Select your avatar"
                    color="#841584"
                />
                { this.state.avatar && this.renderImageView() }
            </View>
        )
    }

}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        height: 100,
        width: 100,
        resizeMode: 'contain'
    }
});

//make this component available to the app
export default AvatarPicker;
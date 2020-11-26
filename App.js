import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Dimensions, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as ScreenOrientation from 'expo-screen-orientation';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        const {width, height} = Dimensions.get('window');
        this.state = {width, height};
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', async () => {
            const {width, height} = Dimensions.get('window');
            console.log({width, height});
            this.setState({width, height});
        });
    }

    render() {
        const {width, height} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar style="auto"/>
                <Text>{`Screen width: ${width}`}</Text>
                <Text>{`Screen height: ${height}`}</Text>
                <View style={{height: 20}}/>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    componentDidMount() {
        this.changeScreenOrientation();
        this.unsubscribe = this.props.navigation.addListener('beforeRemove', async () => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    changeScreenOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    };

    render() {
        return (
            <View style={{
                flex: 1, alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>Details Screen</Text>
            </View>
        );
    }
}

const Stack = createStackNavigator();

export default class App extends React.Component {
    async componentDidMount() {
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="Details" component={DetailsScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, TouchableOpacity, View, Image } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function GyroComponent() {

    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);

    const _slow = () => Gyroscope.setUpdateInterval(1000);
    const _fast = () => Gyroscope.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(
            Gyroscope.addListener(gyroscopeData => {
                setData(gyroscopeData);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: `rgb(${String(x).slice(4, 6)},${String(y).slice(4, 6)},${String(z).slice(4, 6)})` }]}>
            {/* <Text style={styles.text}>Gyroscope:</Text>
            <Text style={styles.text}>x: {x}</Text>
            <Text style={styles.text}>y: {y}</Text>
            <Text style={styles.text}>z: {z}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
                    <Text>{subscription ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} style={styles.button}>
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View> */}
            <Image style={[styles.image, { transform: [{ rotateX: `${x}deg` }, { rotateZ: `${z}deg` }] }]} source={{ uri: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg' }} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width + 10,
        height: Dimensions.get('window').height + 10,
    }
})
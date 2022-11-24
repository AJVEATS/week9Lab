import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Accelerometer } from 'expo-sensors';

export default function accelComponent() {

    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const [subscription, setSubscription] = useState(null);
    const [color, setColor] = useState(null);

    useEffect(() => {
        if (x >= 2) {
            // console.log("x is larger than 2");
            setColor('blue')
        } else {
            setColor('black')
        }
    }, [x]);


    const _slow = () => Accelerometer.setUpdateInterval(1000);
    const _fast = () => Accelerometer.setUpdateInterval(16);

    if (x >= 2) {
        console.log("x is larger than 1");
        console.log(String(x));
    }

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(setData)
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
        <View style={[styles.container, { backgroundColor: `${color}` }]}>
            <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
            <Text style={styles.text}>x: {x}</Text>
            <Text style={styles.text}>y: {y}</Text>
            <Text style={styles.text}>z: {z}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
                    <Text style={styles.text}>{subscription ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
                    <Text style={styles.text}>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} style={styles.button}>
                    <Text style={styles.text}>Fast</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
})
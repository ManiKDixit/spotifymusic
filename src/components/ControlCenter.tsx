import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import TrackPlayer, { PlaybackState, State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
    const playbackState = usePlaybackState();

    const playBackState = playbackState.state || State.None;

    const skipToNext = async () => {
        await TrackPlayer.skipToNext();
    };

    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious();
    };

    const togglePlayback = async () => {
        const currentTrack = await TrackPlayer.getActiveTrackIndex();

        if (currentTrack !== null) {
            if (playBackState === State.Paused || playBackState === State.Ready) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={skipToPrevious}>
                <Icon style={styles.icon} name="skip-previous" size={40} />
            </Pressable>
            <Pressable onPress={togglePlayback}>
                <Icon
                    style={styles.icon}
                    name={playBackState === State.Playing ? 'pause' : 'play-arrow'}
                    size={75}
                />
            </Pressable>
            <Pressable onPress={skipToNext}>
                <Icon style={styles.icon} name="skip-next" size={40} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#FFFFFF',
    },
    playButton: {
        marginHorizontal: 24,
    },
});

export default ControlCenter;

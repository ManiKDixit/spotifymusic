import Slider from '@react-native-community/slider';
import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player'

const SongSlider = () =>  {
    const {position, duration} = useProgress()

    /////

    const [sliderValue, setSliderValue] = useState(position);

    const handleSlidingComplete = async (value: number) => {
        await TrackPlayer.seekTo(value);
    };

    const handleValueChange = (value: number) => {
        setSliderValue(value);
    };

  return (
    <View>
        <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor='#FFF'
        maximumTrackTintColor='#FFF'
        style={styles.sliderContainer}
        onSlidingComplete={handleSlidingComplete}
                onValueChange={handleValueChange}
        />
        <View style={styles.timeContainer}>
            <Text style={styles.time}>
                {new Date(position*1000).toISOString().substring(15, 19)}
            </Text>
            <Text style={styles.time}>
                {new Date((duration-position)*1000).toISOString().substring(15, 19)}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    sliderContainer: {
      width: 350,
      height: 40,
      marginTop: 25,
  
      flexDirection: 'row',
    },
    timeContainer: {
      width: 340,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    time: {
      color: '#fff',
    },
  });

export default SongSlider
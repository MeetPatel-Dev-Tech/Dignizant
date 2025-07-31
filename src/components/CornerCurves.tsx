import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ThinTopRightCurve = () => {
  return (
    <View style={styles.container}>
      <Svg height="220" width="220" viewBox="0 0 220 220">
        <Path
          d="M220,0 L220,110 Q110,110 110,0"
          fill="none"
          stroke="#3498db"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
  },
});

export default ThinTopRightCurve;

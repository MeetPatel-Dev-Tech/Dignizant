import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ThinTopRightCurve = () => {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        {/* Top-Right Curve */}
        <Path
          d="M 80 0 Q 100 0 100 20 L 100 0 Z" // Example path for a top-right curve
          fill="none"
          stroke="blue"
          strokeWidth="2"
        />

        {/* Bottom-Left Curve */}
        <Path
          d="M 0 80 Q 0 100 20 100 L 0 100 Z" // Example path for a bottom-left curve
          fill="none"
          stroke="red"
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ThinTopRightCurve;

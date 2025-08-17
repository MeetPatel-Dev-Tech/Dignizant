import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CustomHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.curvesContainer}>
        <Svg height="100" width="100">
          <Path
            d="M 0 0 Q 50 20 100 0"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="2"
          />
          <Path
            d="M 0 10 Q 50 30 100 10"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="2"
          />
        </Svg>
      </View>
      <View style={styles.headerContent}>
        <Image
          source={require('../../assets/images/Logo.png')} // Replace with your logo
          style={styles.logo}
        />

        <Text style={styles.rukkorText}>rukkor</Text>

        {/* Vertical line */}
        <View style={styles.verticalLine} />

        <View style={styles.taglineContainer}>
          <Text style={styles.boldText}>Simple software,</Text>
          <Text style={styles.tagline}>easy workdays</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginTop: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  curvesContainer: {
    position: 'absolute',
    top: -20,
    right: -20,
    zIndex: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    zIndex: 1,
  },
  logo: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  rukkorText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 4,
  },
  verticalLine: {
    width: 1,
    height: 30,
    backgroundColor: '#ccc',
    marginHorizontal: 15,
  },
  taglineContainer: {
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#333',
  },
  tagline: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomHeader;

import { Box } from 'SfccApiRnExample/src/atoms';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SizeBox = ({ size, selectedSize }) => {
  return (
    <Box
      style={[
        styles.sizeBox,
        { borderColor: selectedSize == size ? 'blue' : '#ccc' },
      ]}
    >
      <Text style={styles.sizeText}>{size}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeBox: {
    borderWidth: 1,
    width: 55,
    height: 30,
    borderRadius: 4, // Half of width or height to make it a circle
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  sizeText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SizeBox;

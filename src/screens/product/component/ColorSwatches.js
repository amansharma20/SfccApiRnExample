import { Box } from 'SfccApiRnExample/src/atoms';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ColorSwatches = ({ selectedColor, item }) => {
  if (!item?.variation_attributes) return;
  return (
    <Box
      style={[
        styles.colorBox,
        {
          borderColor:
            selectedColor == item?.variation_attributes?.values?.[0]?.value
              ? 'blue'
              : '#ccc',
        },
      ]}
    >
      <Image source={{ uri: item?.images?.[0]?.link }} />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorBox: {
    borderWidth: 1,
    width: 24,
    height: 24,
    borderRadius: 100, // Half of width or height to make it a circle
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

export default ColorSwatches;

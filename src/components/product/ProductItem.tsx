import { Box, Text } from "SfccApiRnExample/src/atoms";
import React from "react";
import {Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import CommonHeader from "../commonHeader/CommonHeader";

interface ProductItemProps {
  item: Record<string, any>; // Adjust the type to match your actual structure
}
const ProductItem:React.FC<ProductItemProps>= ({ item }) => {
     return (
    <Box
      // flex={1}
      marginHorizontal="s4"
      flexShrink={1}
      mb="s8"
      borderWidth={1}
      borderColor="border"
      borderRadius={8}
      flex={1}
      padding="s8">
      <TouchableOpacity>
        <Box alignItems="center">
          <Image
            source={{uri: item?.image?.dis_base_link}}
            style={styles.productImage}
            alt={item?.image?.alt}
          />
        </Box>
        <Text style={styles.productTitle} variant="bold18" numberOfLines={1}>
          {item.product_name}
        </Text>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingVertical="s2">
          <Box>
            <Text fontSize={14} fontWeight="600">
              $ {item?.price}
            </Text>
          </Box>
          <TouchableOpacity >
            <Box
              backgroundColor="purple"
              padding="s4"
              paddingHorizontal="s8"
              borderRadius={8}
              flexDirection="row"
              alignItems="center">
              <Text
                fontSize={14}
                color="white"
                // fontWeight="600"
                variant="bold16"
                marginRight="s4">
                Add
              </Text>
              {/* <Image
                source={Icons.addToCartIcon}
                style={{width: 24, height: 24, tintColor: 'white'}}
              /> */}
            </Box>
          </TouchableOpacity>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
export default ProductItem;


const styles = StyleSheet.create({
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 8,
    backgroundColor: 'white',
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    borderRadius: 14,
  },
});
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { commonApi } from 'SfccApiRnExample/src/api/CommanAPI';
import { useNavigation } from '@react-navigation/native';
import { Box, Text, theme } from 'SfccApiRnExample/src/atoms';
import CommonHeader from 'SfccApiRnExample/src/components/commonHeader/CommonHeader';
import axios from 'axios';
import { applicationProperties } from 'SfccApiRnExample/src/utils/application.properties';
import CarouselCards from 'SfccApiRnExample/src/components/imageCarousel/CarouselCards';
import Badge from 'SfccApiRnExample/src/assets/badge/Badge';
import SizeBox from './component/SizeBox';
import ColorSwatches from './component/ColorSwatches';
const ProductDetailsScreen = props => {
  const productId = props.route.params.productId;
  console.log('productId: ', productId);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(
    product?.variants?.[0]?.variation_values?.size,
  );
  const [selectedColor, setSelectedColor] = useState(null);
  const [imageCarousel, setImageCarousel] = useState([]);
  console.log('selectedColor: ', selectedColor);

  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    async function getProduct() {
      try {
        const response = await commonApi.get(
          `products/25604455M?expand=images%2Cprices%2Cavailability%2Cvariations%2Cpromotions&${applicationProperties.clientId}&all_images=true`,
        );
        if (response.data.status === 200) {
          setProduct(response?.data?.data);
          setImageCarousel(response?.data?.data?.image_groups[0]?.images);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log('An error occurred while fetching categories:', error);
        setIsLoading(false);
      }
    }
    getProduct();
  }, [productId]);

  const renderSizeBox = ({ item }) => {
    return (
      <Box flexDirection="row" marginRight="s8">
        <TouchableOpacity
          onPress={() => {
            setSelectedSize(item?.variation_values?.size);
          }}
        >
          <SizeBox
            selectedSize={selectedSize}
            size={item?.variation_values?.size}
          />
        </TouchableOpacity>
      </Box>
    );
  };

  const renderColorSwatch = ({ item }) => {
    if (item?.view_type != 'swatch') return;
    return (
      <Box flexDirection="row" marginRight="s8">
        <TouchableOpacity
          onPress={() => {
            setSelectedColor(
              item?.variation_attributes?.[0]?.values?.[0]?.value,
            );
          }}
        >
          <ColorSwatches selectedColor={selectedColor} item={item} />
        </TouchableOpacity>
      </Box>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title={product?.page_title} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: theme.spacing.paddingHorizontal,
              flexGrow: 1,
            }}
          >
            {product ? (
              <Box style={styles.productDetails}>
                <CarouselCards images={imageCarousel} />
                <Text variant="bold16" marginVertical="s4">
                  Description :{' '}
                </Text>
                <Text>{product?.page_description}</Text>
                <Text mt="s6" variant="regular16">
                  Price ${product?.price}
                </Text>
                <Box flexDirection="row">
                  <Text marginRight="s12">Availability</Text>
                  {product?.inventory?.orderable === true &&
                  product?.inventory?.stock_level >= 1 ? (
                    <Text color="green">In Stock</Text>
                  ) : (
                    <Text color="red">Not Available</Text>
                  )}
                </Box>
                <Text fontSize={20} fontWeight="bold">
                  Select Size: {selectedSize}
                </Text>
                <FlatList
                  horizontal
                  data={product?.variants}
                  renderItem={renderSizeBox}
                />
                <Text fontSize={20} fontWeight="bold">
                  Select Color:
                </Text>
                <FlatList
                  horizontal
                  data={product?.image_groups}
                  renderItem={renderColorSwatch}
                />
              </Box>
            ) : (
              <ActivityIndicator size="large" />
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  productList: {
    paddingHorizontal: 16,
  },

  backImage: {
    resizeMode: 'contain',
    width: '100%',
    height: 200,
  },
  item: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    fontSize: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'gray',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  wishListContainer: {
    width: '100%',
    height: 40,
    backgroundColor: theme.colors.red,
    borderRadius: theme.spacing.lml,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    color: 'white',
  },
});

export default ProductDetailsScreen;

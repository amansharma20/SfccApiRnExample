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

const ProductDetailsScreen = props => {
  const productId = props.route.params.productId;
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  console.log('productId: ', productId);

  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    async function getProduct() {
      try {
        const response = await commonApi.get(
          `products/${productId}?expand=images%2Cprices%2Cavailability%2Cvariations%2Cpromotions&${applicationProperties.clientId}`,
        );
        if (response.data.status === 200) {
          console.log('response.data: ', response.data.data);
          setProduct(response?.data?.data);
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
                <Image
                  style={styles.backImage}
                  source={{
                    uri: product?.image_groups[0]?.images?.[0]?.link,
                  }}
                />
                <Box></Box>
                <Text variant="bold16" marginVertical="s4">
                  Description :{' '}
                </Text>
                <Text>{product?.page_description}</Text>
                <Text
                  mt="s6"
                  variant="regular16"
                  // style={{fontWeight: 'bold'}}
                >
                  Price {product?.price}
                </Text>
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

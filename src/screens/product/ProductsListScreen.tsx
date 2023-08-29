import { commonApi } from 'SfccApiRnExample/src/api/CommanAPI';
import { Box ,Text} from 'SfccApiRnExample/src/atoms';
import CommonHeader from 'SfccApiRnExample/src/components/commonHeader/CommonHeader';
import ProductItem from 'SfccApiRnExample/src/components/product/ProductItem';
import { applicationProperties } from 'SfccApiRnExample/src/utils/application.properties';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet} from 'react-native';

export type Props = {
  props: string;
};

const ProductsListScreen: React.FC<Props> = (props) => {
const {cgid} = props.route.params ;
const [isLoading, setIsLoading] = useState(true);
const [products , setProducts] = useState([]);
interface RenderItemProps {
  item: Record<string, any>;
  index: number;
}
const renderItems=({item,index}:RenderItemProps)=>(
    <>
      <ProductItem item={item}  index={index} />
    </>
)

  useEffect(() => {
    setIsLoading(true);
    async function getProducts() {
      try {
        const response = await commonApi.get(
          `product_search?refine=cgid=${cgid}&expand=images%2Cprices%2Cavailability%2Cvariations&${applicationProperties.clientId}`,
        );
        if (response.data.status === 200) {
          setProducts(response?.data?.data?.hits);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log('An error occurred while fetching categories:', error);
        setIsLoading(false);
      }
    }
    getProducts();
  }, [cgid]);
  return (
  <Box flex={1} paddingHorizontal="paddingHorizontal" paddingTop="s8">
    <CommonHeader title='Products' />
     <FlatList
        data={products}
        renderItem={renderItems}
        // keyExtractor={item => item.nodeId.toString()}
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={
          isLoading ? <ActivityIndicator /> : <Text>EMPTY LIST</Text>
        }
      />
  </Box>
  );
};

export default ProductsListScreen;
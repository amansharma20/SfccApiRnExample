import { Box, Text } from 'SfccApiRnExample/src/atoms';
import React, { useCallback } from 'react';
import CategorySection from './categorySection/CategorySection';
import { FlatList } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  const ViewData =[
    'CategorySection'
  ];
  const renderHomeItems = useCallback(({item})=>{
  switch(item){
      case 'CategorySection':
        return <CategorySection />;
      default:
        return <></>;
  }
  },[]);
  return (
    <Box flex={1} backgroundColor='white'>
      <FlatList
      data={ViewData}
      renderItem={renderHomeItems}
      showsHorizontalScrollIndicator={false}
       contentContainerStyle={{
          paddingTop: insets.top,
        }}
      />
    </Box>
  );
};
export default HomeScreen;

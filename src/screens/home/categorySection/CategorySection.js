import { commonApi } from 'SfccApiRnExample/src/api/CommanAPI';
import { Box, Text, theme } from 'SfccApiRnExample/src/atoms';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  View,
  Button,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { applicationProperties } from 'SfccApiRnExample/src/utils/application.properties';
import { useNavigation } from '@react-navigation/native';
const CategorySection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const renderCategory = ({ item }) => {
    const subCategoriesExist = item?.categories?.length > 0;
    const expandStyle = {
      maxHeight: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200],
      }),
      opacity: animation,
    };

    const onPressHeader = () => {
      // console.log('onPressHeader: ');
      //   navigation.navigate('ProductsListScreen', {
      //     id: item?.id,
      //   });
    };
    return (
      <Box>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.8}
          onPress={() => console.log('Touchable Pressed')}
        >
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name} </Text>
            <Text>{subCategoriesExist ? '-' : '+'}</Text>
          </View>
          {subCategoriesExist && (
            <>
              <Animated.View style={[styles.expandedView, { expandStyle }]}>
                <FlatList
                  data={item?.categories}
                  renderItem={renderSubCategory}
                  keyExtractor={item => item.id.toString()}
                  scrollEnabled={false}
                />
              </Animated.View>
            </>
          )}
        </TouchableOpacity>
      </Box>
    );
  };

  const renderSubCategory = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ProductsListScreen', {
            cgid: item?.id,
            cgName: item?.name,
          });
        }}
        style={styles.subCategoryItem}
      >
        <Text style={styles.expandedText}>{item?.name}</Text>
        <Text style={styles.expandedText}>→</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setIsLoading(true);
    async function getCategories() {
      try {
        const response = await commonApi.get(
          `categories/(mens,womens,electronics)?${applicationProperties.clientId}`,
        );

        if (response.data.status === 200) {
          setCategoriesData(response?.data?.data?.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log('An error occurred while fetching categories:', error);
        setIsLoading(false);
      }
    }
    getCategories();
  }, []);
  return (
    <Box flex={1} paddingHorizontal="paddingHorizontal" paddingTop="s8">
      <FlatList
        data={categoriesData}
        renderItem={renderCategory}
        // keyExtractor={item => item.nodeId.toString()}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={
          isLoading ? <ActivityIndicator /> : <Text>EMPTY LIST</Text>
        }
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  itemContainer: { justifyContent: 'space-between', flexDirection: 'row' },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expandedView: {
    marginTop: 12,
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  expandedText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  subCategoryItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 8,
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
});
export default CategorySection;

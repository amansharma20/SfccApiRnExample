/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
// import GoBackButton from './GoBackButton/GoBackButton';
import {useNavigation} from '@react-navigation/native';
import { Box, Text, theme } from 'SfccApiRnExample/src/atoms';
import React, { FC } from 'react';
interface CommonHeaderProps {
  title: string;
}
const CommonHeader: FC<CommonHeaderProps> = ({ title }) => {
  const navigation = useNavigation();
  return (
    <Box flexDirection="row">
      <SafeAreaView style={styles.container}>
        <Box flexDirection="row" alignItems="center" maxWidth={'80%'}>
          {/* <GoBackButton onPress={onPress} /> */}
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Text >Go back</Text>
          </TouchableOpacity>
          <Text variant="bold18" style={{maxWidth: '90%'}} numberOfLines={1}>
            {title}
          </Text>
        </Box>
      </SafeAreaView>
    </Box>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.paddingHorizontal,
    marginBottom: theme.spacing.s8,
    justifyContent: 'space-between',
    flexShrink: 1,
    width: '100%',
  },
  cartContainer: {
    padding: 6,
  },
});

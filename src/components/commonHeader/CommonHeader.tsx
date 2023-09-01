import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Text, theme } from 'SfccApiRnExample/src/atoms';
import React, { FC } from 'react';
import { GoBack } from 'SfccApiRnExample/src/assets/svgs';

interface CommonHeaderProps {
  title: string;
}

const CommonHeader: FC<CommonHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box style={styles.container}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          {/* <Text>Go back</Text> */}
          <GoBack/>
        </TouchableOpacity>
        <Text variant="bold18" style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.white,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.paddingHorizontal,
    paddingVertical: theme.spacing.s8,
    justifyContent: 'space-between',
  },
  goBackButton: {
    padding:8
  },
  title: {
    flex: 1,
    fontSize: 20,
    marginLeft: theme.spacing.s3,
  },
});

export default CommonHeader;

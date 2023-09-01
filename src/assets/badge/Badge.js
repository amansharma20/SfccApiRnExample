import React from 'react';
import IconBadge from 'react-native-icon-badge';
import { View, Text } from 'react-native';

const Badge = ({ availability }) => {
  return (
    <IconBadge
      MainElement={
        <View
          style={{
            backgroundColor: availability ? '#4CAF50' : '#E57373',
            width: 50,
            height: 50,
            margin: 6,
          }}
        />
      }
      BadgeElement={
        <Text style={{ color: '#FFFFFF' }}>
          {availability ? 'In Stock' : 'Out of Stock'}
        </Text>
      }
      IconBadgeStyle={{
        width: 30,
        height: 30,
        backgroundColor: availability ? 'green' : '#E57373',
      }}
      // Hidden={this.state.BadgeCount == 0}
    />
  );
};

export default Badge;

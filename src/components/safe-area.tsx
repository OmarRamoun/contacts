import React from 'react';
import {SafeAreaView} from 'react-native';

interface SafeAreaProps {
  children: React.ReactNode;
}

const SafeArea = ({children}: SafeAreaProps) => (
  <SafeAreaView
    style={{
      flex: 1,
    }}>
    {children}
  </SafeAreaView>
);

export {SafeArea};

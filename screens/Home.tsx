import React from 'react';
import { TabRootParamList } from '@/App';
import { Input, View } from 'native-base';
import { BottomTabScreenProps} from '@react-navigation/bottom-tabs';

type TabProps = BottomTabScreenProps<TabRootParamList, 'Home'>


const Home: React.FC<TabProps> = ({}) => {

  return (
    <View>
      <Input />
    </View>
  )
};

export default Home;

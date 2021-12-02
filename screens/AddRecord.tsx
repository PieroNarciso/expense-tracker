import { TabRootParamList } from '@/App';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import {
  Badge,
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  Select,
  Text,
  VStack,
} from 'native-base';
import { Currencies, Money } from 'ts-money';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';

type Props = BottomTabScreenProps<TabRootParamList, 'AddRecord'>;

const AddRecord: React.FC<Props> = ({}) => {
  const [currency, setCurrency] = useState(Currencies.USD);
  const [tags, setTags] = useState<Tag[]>([]);
  const currencyHandler = (item: string) => {
    setCurrency(Currencies[item as keyof typeof Currencies]);
  };
  const [tagsIsOpen, setTagsIsOpen] = useState(false);

  const [amount, setAmount] = useState<Money | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const titleHandler = (text: string) => setTitle(text);
  const amountHandler = (text: string) => {
    if (text.length === 0) {
      setAmount(null);
    } else {
      setAmount(new Money(parseInt(text.replace(/\D/g, '')), Currencies.USD));
    }
  };
  const amountDisplay = amount ? `${amount.toDecimal().toFixed(2)}` : '';

  const [showDatePicker, setShowPicker] = useState(false);

  const onDatePickerChange = (_: Event, dateValue?: Date) => {
    setShowPicker(false);
    setDate(dateValue || date);
  };

  return (
    <VStack space="2">
      <HStack>
        <Select
          selectedValue={currency.code}
          minWidth="24"
          placeholder="Choose Currency"
          accessibilityLabel="Choose Currency"
          onValueChange={currencyHandler}
        >
          {Object.keys(Currencies).map((curr) => (
            <Select.Item key={curr} label={curr} value={curr} />
          ))}
        </Select>
        <Input
          width="full"
          placeholder="Amount"
          InputLeftElement={<Text>{Currencies.USD.symbol}</Text>}
          value={amountDisplay}
          onChangeText={amountHandler}
          variant="underlined"
          keyboardType="number-pad"
        />
      </HStack>
      <Input
        placeholder="Tile"
        variant="underlined"
        value={title}
        onChangeText={titleHandler}
      />
      <Box padding="2">
        <HStack space="2">
          {tags.map((tag) => (
            <Badge key={tag.id}>{tag}</Badge>
          ))}
          <IconButton
            onPress={() => setTagsIsOpen(true)}
            padding="1"
            icon={<Icon as={MaterialIcons} size="4" name="add" />}
            borderRadius="full"
            variant="solid"
          />
        </HStack>
      </Box>
      <Modal isOpen={tagsIsOpen} onClose={() => setTagsIsOpen(false)}>
        <Modal.Content p="4">
          <Modal.CloseButton />
          <Checkbox.Group
            onChange={setTags}
            accessibilityLabel="Choose Tags"
            value={tags.map((tag) => tag.tagName)}
          >
            <VStack space="2">
              {tags.map(tag => (
                <Checkbox key={tag.id} value={tag.id}>{tag.tagName}</Checkbox>
              ))}
            </VStack>
          </Checkbox.Group>
        </Modal.Content>
      </Modal>
      <TouchableHighlight
        underlayColor="#DDD"
        onPress={() => setShowPicker(true)}
      >
        <Input
          InputLeftElement={
            <Icon size="6" as={<MaterialIcons name="date-range" />} />
          }
          value={date.toDateString()}
          isReadOnly
          variant="unstyled"
        />
      </TouchableHighlight>
      {showDatePicker && (
        <DateTimePicker
          display="default"
          testID="dateTimePicker"
          mode="date"
          onChange={onDatePickerChange}
          value={date}
        />
      )}
    </VStack>
  );
};

export default AddRecord;

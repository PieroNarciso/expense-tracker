interface RecordType {
  id: string;
  typeName: string;
}

interface Tag {
  id: string;
  tagName: string;
}

interface RecordItem {
  id: string;
  title: string;
  amount: number;
  currencyCode: string;
  date: Date;
  notes: string;
  recordType: RecordType;
}

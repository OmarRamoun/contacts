interface ContactItem {
  id: string;
  hasAvatar?: boolean;
  avatar?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isStarred?: boolean;
}

interface Contacts {
  [id: string]: ContactItem;
}

interface GroupedContacts {
  title: string;
  data: ContactItem[];
}

export type {ContactItem, Contacts, GroupedContacts};

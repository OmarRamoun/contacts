import type {ContactItem} from '@types';

const contactsBinarySearch = (arr: ContactItem[], searchTerm: string) => {
  const result = [];
  const searchTermLower = searchTerm.toLowerCase();

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const nameLower = `${arr[mid].firstName.toLowerCase()} ${arr[mid].lastName.toLowerCase()}`;

    if (nameLower.includes(searchTermLower)) {
      result.push(arr[mid]);
    }

    if (nameLower < searchTermLower) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
};

export {contactsBinarySearch};

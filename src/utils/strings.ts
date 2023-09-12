const getInitialsString = (...names: string[]): string => {
  let initialsString = '';
  names.slice(0, 2).forEach((name) => {
    if (name) initialsString += name[0];
  });

  return initialsString;
};

export {getInitialsString};

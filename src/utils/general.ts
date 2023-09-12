const ensureArray = <T = any>(value: T): Array<any> => (Array.isArray(value) ? value : [value]);

export {ensureArray};

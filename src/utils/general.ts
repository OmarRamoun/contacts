const ensureArray = <T = any>(value: T): Array<any> => (Array.isArray(value) ? value : [value]);

const noop = (ret: any = false) => ret;

const DummyComponent = ({children}: any) => children;

const promiseTimer = (time = 500) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time);
  });

const arraysEqual = (a: any[], b: any[]) => {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;

  return a.every((v, i) => v === b[i]);
};

const arrayUnique = (a: any[]) => Array.from(new Set<any>(a));

const timeout = async (ms: number, shouldError?: boolean): Promise<void> =>
  // eslint-disable-next-line
  new Promise<void>((resolve, reject) => setTimeout(() => (shouldError ? reject() : resolve()), ms));

const awaitFrame = async (): Promise<void> => timeout(50);

export {awaitFrame};

export const utils = {
  noop,
  DummyComponent,
  promiseTimer,
  arraysEqual,
  arrayUnique,
  awaitFrame,
};

export {ensureArray};

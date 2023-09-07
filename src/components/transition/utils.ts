const timeout = async (ms: number, shouldError?: boolean): Promise<void> =>
  // eslint-disable-next-line
  new Promise<void>((resolve, reject) => setTimeout(() => (shouldError ? reject() : resolve()), ms));

const awaitFrame = async (): Promise<void> => timeout(50);

export {awaitFrame};

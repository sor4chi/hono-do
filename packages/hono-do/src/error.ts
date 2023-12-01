export class HonoDOError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HonoDOError";
  }
}

export const Errors = {
  handlerAlreadySet: (handlerName: string) =>
    new HonoDOError(`Handler ${handlerName} already set`),
  namespaceNotSet: (namespace: string) =>
    new HonoDOError(`Namespace ${namespace} not set`),
};

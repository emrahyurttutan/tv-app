function isPromise(value) {
  if (value !== null && typeof value === "object") {
    return value && typeof value.then === "function";
  }
  return false;
}

export const ActionType = {
  Pending: "PENDING",
  Rejected: "REJECTED",
  Fullfilled: "FULLFILLED"
};

export function createPromise(config = {}) {
  const defaultTypes = [
    ActionType.Pending,
    ActionType.Fullfilled,
    ActionType.Rejected
  ];
  const PROMISE_TYPE_SUFFIXES = config.promiseTypeSuffixes || defaultTypes;
  const PROMISE_TYPE_DELIMETER = config.promideTypeDelimetter || "_";

  return ref => {
    const { dispatch } = ref;
    return next => action => {
      let promise;
      let data;
      if (action.payload) {
        const PAYLOAD = action.payload;
        if (isPromise(PAYLOAD)) {
          promise = PAYLOAD;
        } else if (isPromise(PAYLOAD.promise)) {
          promise = PAYLOAD.promise;
          data = PAYLOAD.data;
        } else if (
          typeof PAYLOAD === "function" ||
          typeof PAYLOAD.promise === "function"
        ) {
          promise = PAYLOAD.promise ? PAYLOAD.promise() : PAYLOAD();
          if (!isPromise(promise)) {
            return next({
              ...action,
              payload: promise
            });
          }
        } else {
          return next(action);
        }
      } else {
        return next(action);
      }

      const TYPE = action.type;
      const META = action.meta;
      const [PENDING, FULLFILLED, REJECTED] = PROMISE_TYPE_SUFFIXES;
      const getAction = (newPayload, isRejected) => ({
        type: [TYPE, isRejected ? REJECTED : FULLFILLED].join(
          PROMISE_TYPE_DELIMETER
        ),

        ...(newPayload === null || typeof newPayload === "undefined"
          ? {}
          : {
              payload: newPayload
            }),

        ...(META !== undefined ? { meta: META } : {}),

        ...(isRejected
          ? {
              error: true
            }
          : {})
      });

      const handleReject = reason => {
        const rejectedAction = getAction(reason, true);
        dispatch(rejectedAction);
        throw reason;
      };

      const handleFulfill = (value = null) => {
        const resolvedAction = getAction(value, false);
        dispatch(resolvedAction);

        return { value, action: resolvedAction };
      };

      next({
        type: [TYPE, PENDING].join(PROMISE_TYPE_DELIMETER),
        ...(data !== undefined ? { payload: data } : {}),
        ...(META !== undefined ? { meta: META } : {})
      });
      return promise.then(handleFulfill, handleReject);
    };
  };
}
export default function middleware({ dispatch } = {}) {
  if (typeof dispatch === "function") {
    return createPromise()({ dispatch });
  }
  return null;
}

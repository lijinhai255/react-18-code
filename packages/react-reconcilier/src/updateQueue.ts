import { result } from "lodash";
import { Action } from "../shared/ReactTypes";
import { Update } from "./fiberFlags";

export interface Update<State> {
  action: Action<State>;
}

export interface UpdateQueue<State> {
  shared: {
    pending: Update<State> | null;
  };
}

export const createUpdate = <State>(action: Action<State>): Update<State> => {
  return {
    action,
  };
};

export const createUpdateQueue = <State>() => {
  return {
    shared: {
      pending: null,
    },
  } as UpdateQueue<State>;
};

export const enqueueUpdate = <State>(
  updateQueue: UpdateQueue<State>,
  update: Update<State>
) => {
  updateQueue.shared.pending = update;
};

export const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State> | null
): { memoizedState: State } => {
  const result = {
    memoizedState: baseState, // 初始 memoizedState 为 baseState
  };

  if (pendingUpdate !== null) {
    const action = pendingUpdate.action;

    // 如果 action 是函数类型，调用它并传入 baseState，否则直接将 action 作为新的状态
    result.memoizedState =
      action instanceof Function ? action(baseState) : action;
  }

  return result;
};

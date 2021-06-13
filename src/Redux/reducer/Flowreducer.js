import { FlowIitialData } from "../store/Initialstore";
import * as types from "../Type";
export default function Flowreducer(state = FlowIitialData, action) {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_MODULE:
      return [...state, payload];
    case types.ADD_EDGE:
      return (state = payload);
    case types.REMOVE_ITEM:
      return (state = payload);
    case types.ADD_TAG:
      const { id, color } = payload;
      let value = [...state];
      value.find((v) => v.id == id)["style"] = color;
      console.log(value);
      return (state = value);
    default:
      return state;
  }
}

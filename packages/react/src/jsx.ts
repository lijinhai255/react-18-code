import { REACT_ELEMENT_TYPE } from "../../shared/ReactSymbols";
import type {Key, ElementType,Ref,Props,ReactElement } from '../../shared/ReactTypes'


function hasValidKey(config:any){
  return config.key !==undefined
}

function hasValidRef(config:any){
  return config.red !==undefined
}


export const jsxDEV = (type: ElementType, config: any) => {

  // 创建元素
  let key:Key = null;
const props:any= [];
let ref:Ref=null;

const element:ReactElement={
  $$typeof:REACT_ELEMENT_TYPE,
  type:type,
  key,
  ref,
  props,
  __mark:'React18源码学习'
}
 
  console.log("config", config);
  console.log("type", type);
  for (const prop in config) {
    const val = config[prop];

    if (prop === 'key') {
      if (hasValidKey(config)) {
        key = '' + val;
      }
      continue;
    }

    if (prop === 'ref' && val !== undefined) {
      if (hasValidRef(config)) {
        ref = val;
      }
      continue;
    }

    // 将其他的 config 属性添加到 props 中
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }
};

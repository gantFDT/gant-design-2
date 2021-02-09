import React, { useRef, useEffect, useCallback } from 'react';
import KeyCode from 'rc-util/es/KeyCode';

const KEY_EVENT = 'keydown';

const keyReg = /^on(Alt|Ctrl|Meta|Shift){0,4}([A-Z][a-z]*)+$/;

const splitKey = (str: string): Array<string> | null => {
  const reg = /[A-Z][a-z]*/g;
  return str.match(reg);
};

const isSpecialKey = (str: string) => {
  return ['Alt', 'Ctrl', 'Meta', 'Shift'].includes(str);
};

// 检查是否是合法的按键
const checkKeyGroup = (e: KeyboardEvent, ename: string) => {
  const keys = splitKey(ename); // 分解按键
  if (!keys) return false;
  for (let index = 0; index < keys.length; index++) { // for方便跳出循环
    const key = keys[index];
    if (isSpecialKey(key)) { // 快捷键字符 Alt Ctrl Meta Shift
      if (!e[`${key.toLowerCase()}Key`]) return false;
    } else if (e.keyCode !== KeyCode[key.toUpperCase()]) { // 普通字符 A-Z 0-9 ESC 等
      return false;
    }
  }
  return true;
};

const KeyEvent = (bindKeys: Record<string, (ev: KeyboardEvent) => void>, needFouce?: boolean) => {

  const ref = useRef<HTMLDivElement>(null);

  const validPropName = useCallback((e, keyName) => {
    // 验证属性名
    if (keyReg.test(keyName) && checkKeyGroup(e, keyName)) {
      return true;
    }
    return false;
  }, []);
  
  return function Comp(WrapedComponent: React.ReactElement): React.ReactElement {
    
    useEffect(() => {
      if (bindKeys) {
        const dom = ref.current || window;
        const callback = (ev: KeyboardEvent) => {
          Object.keys(bindKeys).filter((keyName) => validPropName(ev, keyName)).forEach(key => {
            bindKeys[key](ev);
          });
        };
        if (dom) dom.addEventListener(KEY_EVENT, callback);
        return () => {
          if (dom) dom.removeEventListener(KEY_EVENT, callback);
        };
      }
    }, []);

    if (!bindKeys) return WrapedComponent;

    return needFouce? <div ref={ref} tabIndex={-1}>
      {WrapedComponent}
    </div> : WrapedComponent;
  };
};

export default KeyEvent;

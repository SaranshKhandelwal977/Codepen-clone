import {useState, useEffect} from 'react'

const prefix = 'codepen-clone-'

export const useLocalStorage = (key, initialValue) => {
    const prefixedKey = prefix+key;
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if(jsonValue != null) return JSON.parse(jsonValue);
        if(typeof jsonValue === 'function'){
            return initialValue()
        }else {
            return initialValue;
        }
    })
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    },[prefixedKey, value])
  return [value, setValue];
}

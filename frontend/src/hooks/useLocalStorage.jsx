import { useState, useEffect } from 'react';

export default function useLocalStorage(keyname, defaultValue, expirationTime = 6000000) { // expirationTime en milisegundos (por defecto 1 minuto)
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(keyname);
            if (item) {
                const parsedItem = JSON.parse(item);
                const { value, expiration } = parsedItem;
                if (!expiration || Date.now() > expiration) { // Si el token ha expirado, lo eliminamos
                    window.localStorage.removeItem(keyname);
                    return defaultValue;
                }
                return value;
            } else {
                const expiration = Date.now() + expirationTime;
                window.localStorage.setItem(keyname, JSON.stringify({ value: defaultValue, expiration }));
                return defaultValue;
            }
        } catch (error) {
            console.error(error);
            return defaultValue;
        }
    });

    const setValue = (value, expiration = Date.now() + expirationTime) => {
        try {
            const valueToStore = JSON.stringify({ value, expiration });
            window.localStorage.setItem(keyname, valueToStore);
            setStoredValue(value);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const item = window.localStorage.getItem(keyname);
        if (item) {
            const { expiration } = JSON.parse(item);
            if (expiration && Date.now() > expiration) { // Si el token ha expirado, lo eliminamos
                window.localStorage.removeItem(keyname);
                setStoredValue(defaultValue);
            }
        }
    }, [defaultValue, keyname]);

    return [storedValue, setValue];
}
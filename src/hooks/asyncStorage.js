import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const KEYS = {
  HAS_LAUNCHED: "HasLaunched",
  SCHOOL_CODE: "schoolcode",
  OFFICE_CODE: "officecode",
  SCHOOL_NAME: "schoolname",
  ALLERGY: "allergy"
};

export const useAsyncStorage = (key) => {
  const [isLoading, setLoading] = useState(true);
  const [state, setState] = useState();

  useEffect(() => {
    AsyncStorage.getItem(key, (err, result) => {
      setState(result);
      setLoading(false);
    });

    return () => {};
  }, [key, state]);

  const setValue = (value) => {
    AsyncStorage.setItem(key, value)
      .then(() => setState(value))
      .catch((err) => console.log(err));
  };

  const remove = () => {
    AsyncStorage.removeItem(key)
      .then(() => setState(null))
      .catch((err) => console.log(err));
  };

  return { isLoading, state, setValue, remove };
};

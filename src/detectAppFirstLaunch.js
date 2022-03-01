import { useState } from "react";
import { AsyncStorage } from "react-native";

const HAS_LAUNCHED = "hasLaunched";

function setAppLaunched() {
  AsyncStorage.setItem(HAS_LAUNCHED, "true");
}

export default function checkIfFirstLaunch() {
  const [hasLaunched, setHasLaunched] = useState();
  AsyncStorage.getItem(HAS_LAUNCHED, (err, result) => {
    setHasLaunched(result);
  });
  if (hasLaunched === null) {
    setAppLaunched();
    return true;
  }
  return false;
}

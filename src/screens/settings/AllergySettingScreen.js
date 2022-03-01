import { useTheme } from "@react-navigation/native";
import { Button, Text, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { AsyncStorage, Alert } from "react-native";

export default function AllergySettingScreen() {
  const [selectedValue, setSelectedValue] = useState("");
  const colors = useTheme();

  function onAllergySelected(value) {
    AsyncStorage.setItem("allergy", value, () => {});
  }

  AsyncStorage.getItem("allergy", (err, result) => {
    if (result != null) {
      setSelectedValue(result);
    }
  });

  const styles = StyleSheet.create({
    picker: {
      color: colors.colors.text,
      borderWidth: 1,
      borderColor: colors.colors.border
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: colors.colors.border,
      borderLeftWidth: 0,
      borderRightWidth: 0
    },
    text: {
      color: colors.colors.text,
      alignSelf: "center",
      textAlign: "center",
      marginTop: 20
    }
  });

  return (
    <View>
      <View style={styles.pickerContainer}>
        <Picker
          dropdownIconColor={colors.colors.text}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            onAllergySelected(itemValue);
            setSelectedValue(itemValue);
          }}
          itemStyle={{ color: colors.colors.text }}
          style={styles.picker}
        >
          <Picker.Item label="없음" value="000" />
          <Picker.Item label="난류" value="1" />
          <Picker.Item label="우유" value="2" />
          <Picker.Item label="메밀" value="3" />
          <Picker.Item label="땅콩" value="4" />
          <Picker.Item label="대두" value="5" />
          <Picker.Item label="밀" value="6" />
          <Picker.Item label="고등어" value="7" />
          <Picker.Item label="게" value="8" />
          <Picker.Item label="새우" value="9" />
          <Picker.Item label="돼지고기" value="10" />
          <Picker.Item label="복숭아" value="11" />
          <Picker.Item label="토마토" value="12" />
          <Picker.Item label="아황산염" value="13" />
          <Picker.Item label="호두" value="14" />
          <Picker.Item label="닭고기" value="15" />
          <Picker.Item label="쇠고기" value="16" />
          <Picker.Item label="오징어" value="17" />
          <Picker.Item label="조개류(굴,전복,홍합 등)" value="18" />
        </Picker>
      </View>
      <Text style={styles.text}>
        알레르기가 있는 식품을 선택하세요. {"\n"}알레르기 식품이 포함되어 있는
        메뉴가 빨간색으로 표시됩니다.
      </Text>
    </View>
  );
}

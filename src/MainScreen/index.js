import React, { useRef, useState } from "react";
import { Animated, Dimensions, TouchableWithoutFeedback } from "react-native";
import * as S from "./styles";

const iconWidth = Dimensions.get("window").width * 0.75;
const iconHeight = iconWidth * 1.35;

export default function MainScreen({ onShowModal }) {
  const [animStatusInProgress, setAnimStatusInProgress] = useState(false);
  const spinValue = useRef(new Animated.Value(15)).current;
  const startAnim = () => {
    if (!animStatusInProgress) {
      setAnimStatusInProgress(true);
      spinValue.setValue(0);
      setTimeout(() => {
        onShowModal();
        setAnimStatusInProgress(false);
      }, 1000);
      Animated.spring(spinValue, {
        toValue: 15,
        damping: 6.5,
        useNativeDriver: true,
      }).start();
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 30],
    outputRange: ["-10deg", "10deg"],
  });
  return (
    <S.Wrapper>
      <TouchableWithoutFeedback onPress={startAnim}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <S.MobileIcon width={iconWidth} height={iconHeight} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <S.Text>Shake Your Smartphone</S.Text>
    </S.Wrapper>
  );
}

import React from "react";
import { Animated, Dimensions, TouchableWithoutFeedback } from "react-native";
import * as S from "./styles";

const iconWidth = Dimensions.get("window").width * 0.75;
const iconHeight = iconWidth * 1.35;

export default function MainScreen({ onShowModal }) {
  const spinValue = React.useRef(new Animated.Value(15)).current;
  const startAnim = () => {
    spinValue.setValue(0);
    Animated.spring(spinValue, {
      toValue: 15,
      damping: 5.5,
      useNativeDriver: true,
    }).start(() => {
      onShowModal();
    });
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

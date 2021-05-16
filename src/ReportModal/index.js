import React from "react";
import {
  Animated,
  Linking,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import OneSection from "./OneSection";
import * as S from "./styles";

const defaultImageProps = { height: 24, width: 24, fill: "#1679E2" };

const gmail = "testreportmodal111@gmail.com";

const messageTypes = {
  PROBLEM: "Problem",
  SUGGEST: "Suggest",
  QUESTION: "Question",
};

export default function ReportModal({ isVisible, closeModa, deviceInfo }) {
  const onSectionPress = (type) => {
    if (type === messageTypes.PROBLEM) {
      Linking.openURL(
        `mailto:${gmail}?subject=Problem&body=Something wrong!
    DEVICE INFO: 
        ${deviceInfo}`
      );
    } else if (type === messageTypes.SUGGEST) {
      Linking.openURL(`mailto:${gmail}?subject=Suggest&body=Suggest...`);
    } else if (type === messageTypes.QUESTION) {
      Linking.openURL(`mailto:${gmail}?subject=Question&body=Question...`);
    }
    closeModa();
  };
  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <S.BackContainer onPressOut={closeModa}>
        <TouchableWithoutFeedback>
          <S.ModalContainer>
            <S.HeaderWrapper>
              <S.ModalTitle>Need help?</S.ModalTitle>
              <S.MessageIcon height={28} width={28} fill="#1679E2" />
            </S.HeaderWrapper>
            <OneSection
              text="Report a problem"
              image={<S.BugIcon {...defaultImageProps} />}
              onSectionPress={() => onSectionPress(messageTypes.PROBLEM)}
            />
            <OneSection
              text="Suggest an improvement"
              image={<S.MegaphoneIcon {...defaultImageProps} />}
              onSectionPress={() => onSectionPress(messageTypes.SUGGEST)}
            />
            <OneSection
              text="Ask a question"
              image={<S.QuestionIcon {...defaultImageProps} />}
              onSectionPress={() => onSectionPress(messageTypes.QUESTION)}
            />
          </S.ModalContainer>
        </TouchableWithoutFeedback>
      </S.BackContainer>
    </Modal>
  );
}

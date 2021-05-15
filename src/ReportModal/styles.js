import styled from "styled-components";

import MessageImage from "../assets/message.svg";
import QuestionImage from "../assets/question.svg";
import BugImage from "../assets/bug.svg";
import MegaphoneImage from "../assets/megaphone.svg";

export const BackContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex: 1;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
`;

export const ModalContainer = styled.View`
  width: 82%;
  position: absolute;
  background: #fff;
  padding: 16px 6px 5px 6px;

  border-radius: 8px;
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 20px;
  margin: 0px 0px 10px 0px;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const MessageIcon = styled(MessageImage)``;

export const QuestionIcon = styled(QuestionImage)``;

export const BugIcon = styled(BugImage)``;

export const MegaphoneIcon = styled(MegaphoneImage)``;

import React from 'react';
import {TouchableOpacity} from 'react-native';
import * as S from './styles';

export default function OneSection({text, image, onSectionPress}) {
  return (
    <TouchableOpacity onPress={onSectionPress}>
      <S.Wrapper>
        <S.ImageWrapper>{image}</S.ImageWrapper>
        <S.Text>{text}</S.Text>
      </S.Wrapper>
    </TouchableOpacity>
  );
}

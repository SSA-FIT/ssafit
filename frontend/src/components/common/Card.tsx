import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { UserSelectListProp } from '../../types/recommendationTypes';

interface Props extends UserSelectListProp {
  id: number;
  name: string;
  imageURL: string;
  score: number | null;
}

const Card: React.FC<Props> = ({
  id,
  name,
  imageURL,
  score,
  userRecoSelectList,
  setUserRecoSelectList,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const findExerciseId = userRecoSelectList.findIndex(
    (userRecoSelectItem) => userRecoSelectItem.id === id,
  );

  useEffect(() => {
    if (findExerciseId !== -1) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [checked, findExerciseId]);

  const addUserExercise = (id: number, name: string, imageURL: string) => {
    const findExerciseId = userRecoSelectList.findIndex(
      (userRecoSelectItem) => userRecoSelectItem.id === id,
    );

    if (findExerciseId === -1) {
      setUserRecoSelectList([
        ...userRecoSelectList,
        {
          id,
          name,
          imageURL,
        },
      ]);
    }
  };

  const deleteUserExercise = (exerciseDeleteId: number): void => {
    const findExerciseId = userRecoSelectList.findIndex(
      (userRecoSelectItem) => userRecoSelectItem.id === exerciseDeleteId,
    );

    if (findExerciseId !== -1) {
      const tempUserSelectList = [...userRecoSelectList];
      tempUserSelectList.splice(findExerciseId, 1);
      setUserRecoSelectList(tempUserSelectList);
    }
  };

  const checkBoxChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setChecked(true);
      addUserExercise(id, name, imageURL);
    } else {
      setChecked(false);
      deleteUserExercise(id);
    }
  };

  return (
    <Container>
      <Base>
        <Wrapper>
          <ImageBoxWrapper>
            <CheckBox
              type="checkbox"
              onChange={checkBoxChangeHandler}
              checked={checked}
              id={name}
            />
            <ImageWrapper>
              <ImageLabel htmlFor={name}>
                <Image key={id} src={imageURL} alt={`${name} 의 이미지`} />
              </ImageLabel>
            </ImageWrapper>
          </ImageBoxWrapper>
        </Wrapper>
      </Base>
      <Info>
        <Title>{name}</Title>
        {score !== null && <Title>예상 만족도 점수 : {score} 점</Title>}
      </Info>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  transition: all 0.3s;
  height: 100%;
  margin: 15px;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ImageBoxWrapper = styled.div`
  width: 100%;
`;
const ImageWrapper = styled.div`
  text-align: center;
`;

const ImageLabel = styled.label``;
const Image = styled.img`
  width: 100%;
  //height: 100%;
  border-radius: 4px;
  display: block;
  margin: 0px auto;
`;

const Info = styled.div`
  margin-top: 20px;
  text-align: left;
  width: 100%;
`;

const Title = styled.h4`
  color: #292a32;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
  margin-bottom: 3px;
  white-space: nowrap;
  max-width: 200px;
`;
const CheckBox = styled.input`
  position: absolute;
  bottom: 0px;
  top: 0px;
  zoom: 1.5;
  /* top: 6px;
  left: 6px;
  width: 14px;
  height: 14px;
  line-height: 27px; */
`;

const Wrapper = styled.form`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 145.37037037037038%;
`;

export default Card;

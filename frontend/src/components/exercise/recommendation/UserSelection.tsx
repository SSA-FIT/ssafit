import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import {
  Recommendation,
  UserSelectListProp,
} from '../../../types/recommendationTypes';

const UserSelection: React.FC<UserSelectListProp> = ({
  setUserRecoSelectList,
  userRecoSelectList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSelections, setUserSelctions] =
    useState<Recommendation[]>(userRecoSelectList);

  useEffect(() => {
    setUserSelctions(userRecoSelectList);
  }, [userRecoSelectList]);

  return (
    <Base>
      <Title>오늘의 운동 종류</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        userSelections.length >= 5 && (
          <Slider>
            {userSelections.map((userSelection) => (
              <Card
                userRecoSelectList={userRecoSelectList}
                setUserRecoSelectList={setUserRecoSelectList}
                key={userSelection.id}
                id={userSelection.id}
                name={userSelection.name}
                imageURL={userSelection.imageURL}
                description={userSelection.description}
              />
            ))}
          </Slider>
        )
      )}
    </Base>
  );
};

const Base = styled.div`
  margin-bottom: 21px;
  position: relative;
  bottom: 0;
`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  padding: 12px 0 14px;
`;

export default UserSelection;
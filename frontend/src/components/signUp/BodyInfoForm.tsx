import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useLocation } from 'react-router-dom';
import { BodyInfoData } from '../../types/commonTypes';

interface Props {
  setSignUpStep: (signUpStep: number) => void;
  setUserHeight: (userHeight: string) => void;
  setUserWeight: (userWeight: string) => void;
  setUserBirth: (userBirth: string) => void;
  setUserGender: (userGender: string) => void;
  setUserLevel: (userLevel: string) => void;
}

const BodyInfoForm: React.FC<Props> = ({
  setSignUpStep,
  setUserHeight,
  setUserWeight,
  setUserBirth,
  setUserGender,
  setUserLevel,
}) => {
  const [nonUser, setNonUser] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const [userHeightChange, setUserHeightChange] = useState<string>('');
  const [height1, setHeight1] = useState<string>('');
  const [height2, setHeight2] = useState<string>('');
  const [userHeightNumber, setUserHeightNumber] = useState<number>(0);
  const [heightMessage, setHeightMessage] = useState<string>('');
  const [isHeight, setIsHeight] = useState<boolean>(false);

  const [userWeightChange, setUserWeightChange] = useState<string>('');
  const [weight1, setWeight1] = useState<string>('');
  const [weight2, setWeight2] = useState<string>('');
  const [userWeightNumber, setUserWeightNumber] = useState<number>(0);
  const [weightMessage, setWeightMessage] = useState<string>('');
  const [isWeight, setIsWeight] = useState<boolean>(false);

  const [userBirthChange, setUserBirthChange] = useState<string>('');
  const [userGenderChange, setUserGenderChange] = useState<string>('');
  const [userLevelChange, setUserLevelChange] = useState<string>('');
  const [userLevelIcon, setUserLevelIcon] = useState<string>('');

  // ???????????? ???????????? ??????, ????????? ?????? ????????????
  const location = useLocation();
  const locationState: any = location.state;

  useEffect(() => {
    if (locationState !== undefined) {
      setNonUser(true);
      const stateHeight = locationState.height;
      const heightSplit = stateHeight.split('.');
      setHeight1(heightSplit[0].toString());
      if (heightSplit.length === 2) setHeight2(heightSplit[1].toString());
      const stateWeight = locationState.weight;
      const weightSplit = stateWeight.split('.');
      setWeight1(weightSplit[0].toString());
      if (weightSplit.length === 2) setWeight2(weightSplit[1].toString());

      setUserLevelChange(locationState.level);
      setUserBirthChange(locationState.birth);
      setUserGenderChange(locationState.gender);
    }
  }, [locationState]);

  const [heightError, setHeightError] = useState<boolean>(false);
  const [weightError, setWeightError] = useState<boolean>(false);
  const [levelError, setLevelError] = useState<boolean>(false);
  const [birthError, setBirthError] = useState<boolean>(false);
  const [genderError, setGenderError] = useState<boolean>(false);
  const [bodyInfoComplete, setBodyInfoComplete] = useState<boolean>(false);

  const UserBodyInfoProps = (data: BodyInfoData) => {
    const { userHeight, userWeight, userLevel, userBirth, userGender } = data;

    setUserHeight(userHeight);
    setUserWeight(userWeight);
    setUserLevel(userLevel);
    setUserBirth(userBirth);
    setUserGender(userGender);
  };

  const handleNext = () => {
    const data: BodyInfoData = {
      userHeight: '',
      userWeight: '',
      userLevel: '',
      userBirth: '',
      userGender: '',
    };

    data.userHeight = userHeightChange;
    data.userWeight = userWeightChange;
    data.userLevel = userLevelChange;
    data.userBirth = userBirthChange;
    data.userGender = userGenderChange;

    UserBodyInfoProps(data);

    if (!isHeight) setHeightError(true);
    if (!isWeight) setWeightError(true);
    if (userBirthChange === '') setBirthError(true);
    if (userGenderChange === '') setGenderError(true);
    if (userLevelChange === '') setLevelError(true);

    if (bodyInfoComplete) setSignUpStep(3);
  };

  const handleBefore = () => {
    setSignUpStep(1);
  };

  useEffect(() => {
    if (
      isHeight &&
      isWeight &&
      userBirthChange !== '' &&
      userGenderChange !== '' &&
      userLevelChange !== ''
    )
      setBodyInfoComplete(true);
    else setBodyInfoComplete(false);
  }, [isHeight, isWeight, userBirthChange, userGenderChange, userLevelChange]);

  const [selfTest1, setSelfTest1] = useState<number>(0);
  const [selfTest2, setSelfTest2] = useState<number>(0);
  const [selfTest3, setSelfTest3] = useState<number>(0);
  const [selfTest4, setSelfTest4] = useState<number>(0);
  const [selfTest5, setSelfTest5] = useState<number>(0);
  const [selfTest6, setSelfTest6] = useState<number>(0);
  const [selfTestSum, setSelfTestSum] = useState<number>(0);

  const handleClickOpen = () => {
    setAlignment1('level1');
    setAlignment2('one');
    setAlignment3('30min');
    setAlignment4('3stairs');
    setAlignment5('shoulderpoint0');
    setAlignment6('legpoint0');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [alignment1, setAlignment1] = React.useState('');
  const [alignment2, setAlignment2] = React.useState('');
  const [alignment3, setAlignment3] = React.useState('');
  const [alignment4, setAlignment4] = React.useState('');
  const [alignment5, setAlignment5] = React.useState('');
  const [alignment6, setAlignment6] = React.useState('');

  const handleCloseCancelButton = () => {
    setOpen(false);

    setAlignment1('level1');
    setAlignment2('one');
    setAlignment3('30min');
    setAlignment4('3stairs');
    setAlignment5('shoulderpoint0');
    setAlignment6('legpoint0');
  };

  useEffect(() => {
    if (selfTestSum >= 4 && selfTestSum < 9) setUserLevelChange('??????');
    else if (selfTestSum >= 9 && selfTestSum < 15) setUserLevelChange('??????');
    else if (selfTestSum >= 15 && selfTestSum < 21) setUserLevelChange('??????');
    else if (selfTestSum >= 21 && selfTestSum <= 24) setUserLevelChange('??????');
  }, [selfTestSum]);

  const handleCloseFinishButton = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userLevelChange !== '') {
      setLevelError(false);
      if (userLevelChange === '??????') setUserLevelIcon('????');
      else if (userLevelChange === '??????') setUserLevelIcon('????');
      else if (userLevelChange === '??????') setUserLevelIcon('????');
      else if (userLevelChange === '??????') setUserLevelIcon('????');
    }
  }, [userLevelChange]);

  const handleChange1 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment1(newAlignment);
  };

  const handleChange2 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment2(newAlignment);
  };

  const handleChange3 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment3(newAlignment);
  };

  const handleChange4 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment4(newAlignment);
  };

  const handleChange5 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment5(newAlignment);
  };

  const handleChange6 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment6(newAlignment);
  };

  useEffect(() => {
    switch (alignment1) {
      case 'level1':
        setSelfTest1(1);
        break;
      case 'level2':
        setSelfTest1(2);
        break;
      case 'level3':
        setSelfTest1(3);
        break;
      case 'level4':
        setSelfTest1(4);
        break;

      default:
    }
  }, [alignment1]);

  useEffect(() => {
    switch (alignment2) {
      case 'one':
        setSelfTest2(1);
        break;
      case 'two':
        setSelfTest2(2);
        break;
      case 'three':
        setSelfTest2(3);
        break;
      case 'four':
        setSelfTest2(4);
        break;

      default:
    }
  }, [alignment2]);

  useEffect(() => {
    switch (alignment3) {
      case '30min':
        setSelfTest3(1);
        break;
      case '1hour':
        setSelfTest3(2);
        break;
      case '2hour':
        setSelfTest3(3);
        break;
      case 'many':
        setSelfTest3(4);
        break;

      default:
    }
  }, [alignment3]);

  useEffect(() => {
    switch (alignment4) {
      case '3stairs':
        setSelfTest4(1);
        break;
      case '6stairs':
        setSelfTest4(2);
        break;
      case '9stairs':
        setSelfTest4(3);
        break;
      case '10stairs':
        setSelfTest4(4);
        break;

      default:
    }
  }, [alignment4]);

  useEffect(() => {
    switch (alignment5) {
      case 'shoulderpoint0':
        setSelfTest5(0);
        break;
      case 'shoulderpoint2':
        setSelfTest5(2);
        break;
      case 'shoulderpoint4':
        setSelfTest5(4);
        break;

      default:
    }
  }, [alignment5]);

  useEffect(() => {
    switch (alignment6) {
      case 'legpoint0':
        setSelfTest6(0);
        break;
      case 'legpoint2':
        setSelfTest6(2);
        break;
      case 'legpoint4':
        setSelfTest6(4);
        break;

      default:
    }
  }, [alignment6]);

  useEffect(() => {
    const sum =
      selfTest1 + selfTest2 + selfTest3 + selfTest4 + selfTest5 + selfTest6;
    setSelfTestSum(sum);
  }, [selfTest1, selfTest2, selfTest3, selfTest4, selfTest5, selfTest6]);

  useEffect(() => {
    setUserHeightNumber(parseFloat(userHeightChange));
  }, [userHeightChange]);

  useEffect(() => {
    setHeightError(false);
    if (userHeightNumber <= 300 && userHeightNumber >= 1) {
      setIsHeight(true);
      setHeightMessage('');
    } else {
      setIsHeight(false);
      setHeightMessage('???????????? ?????? ??????????????????.');
    }
  }, [userHeightNumber]);

  useEffect(() => {
    if (height2 !== '') setUserHeightChange(`${height1}.${height2}`);
    else setUserHeightChange(height1);
  }, [height1, height2]);

  const getHeight1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const height1 = event.target.value;
    setHeight1(height1);
  };

  const getHeight2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const height2 = event.target.value;
    setHeight2(height2);
  };

  useEffect(() => {
    setUserWeightNumber(parseFloat(userWeightChange));
    setUserHeightNumber(parseFloat(userHeightChange));
  }, [userWeightChange, userHeightChange]);

  useEffect(() => {
    setWeightError(false);
    if (userWeightNumber <= 600 && userWeightNumber >= 1) {
      setIsWeight(true);
      setWeightMessage('');
    } else {
      setIsWeight(false);
      setWeightMessage('???????????? ?????? ??????????????????.');
    }
  }, [userWeightNumber]);

  useEffect(() => {
    if (weight2 !== '') setUserWeightChange(`${weight1}.${weight2}`);
    else setUserWeightChange(weight1);
  }, [weight1, weight2]);

  const getWeight1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const weight1 = event.target.value;
    setWeight1(weight1);
  };

  const getWeight2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const weight2 = event.target.value;
    setWeight2(weight2);
  };

  const getBirth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthError(false);
    const birth = event.target.value;
    setUserBirthChange(birth);
  };

  const getGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenderError(false);
    const gender = event.target.value;
    if (gender === 'M') setUserGenderChange('???');
    else if (gender === 'FM') setUserGenderChange('???');
  };

  return (
    <>
      <Container>
        <StepName>???????????? ??????</StepName>
        <StepDescription>????????? ?????? ?????? ????????? ??????????????????.</StepDescription>
        <RequiresWrapper>
          [<RequireLabel>??????????????????</RequireLabel>??? ?????? ?????? ???????????????.]
        </RequiresWrapper>
        <ContentsWrapper>
          <ContentNameWrapper>
            <ContentName>???????????? (??????)</ContentName>
          </ContentNameWrapper>
          <ContentWrapper>
            <InputWrapper>
              <InputName>
                ???(cm)
                <InputRequireLabel>????????????</InputRequireLabel>
              </InputName>
              <BodyInputWrapper
                className={
                  (heightMessage !== '' && userHeightChange !== '') ||
                  heightError
                    ? 'have-error'
                    : ''
                }
              >
                <BodyInput
                  value={height1}
                  maxLength={3}
                  placeholder="175"
                  onChange={getHeight1}
                />
                <BodyInput
                  type="text"
                  className="dot"
                  defaultValue="."
                  readOnly
                  disabled
                />
                <BodyInput
                  value={height2}
                  className="oneNumber"
                  maxLength={1}
                  placeholder="0"
                  onChange={getHeight2}
                />
              </BodyInputWrapper>
              {/* ????????? {userHeightChange} */}
              {heightError && (
                <ErrorWrapper>
                  <ErrorMessage>?????? ?????? ???????????????.</ErrorMessage>
                </ErrorWrapper>
              )}
            </InputWrapper>

            {userHeightNumber >= 0 && (
              <span className={`message ${isHeight ? 'success' : 'error'}`}>
                {heightMessage}
              </span>
            )}
            <InputWrapper>
              <InputName>
                ?????????(kg)
                <InputRequireLabel>????????????</InputRequireLabel>
              </InputName>
              <BodyInputWrapper
                className={
                  (weightMessage !== '' && userWeightChange !== '') ||
                  weightError
                    ? 'have-error'
                    : ''
                }
              >
                <BodyInput
                  value={weight1}
                  maxLength={3}
                  placeholder="68"
                  onChange={getWeight1}
                />
                <BodyInput
                  type="text"
                  className="dot"
                  defaultValue="."
                  readOnly
                  disabled
                />
                <BodyInput
                  value={weight2}
                  className="oneNumber"
                  maxLength={1}
                  placeholder="9"
                  onChange={getWeight2}
                />
              </BodyInputWrapper>
              {/* ????????? {userWeightChange} */}
              {weightError && (
                <ErrorWrapper>
                  <ErrorMessage>?????? ?????? ???????????????.</ErrorMessage>
                </ErrorWrapper>
              )}
            </InputWrapper>
            {userWeightNumber >= 0 && (
              <span className={`message ${isWeight ? 'success' : 'error'}`}>
                {weightMessage}
              </span>
            )}
            <InputWrapper>
              <InputName>
                ????????????
                <InputRequireLabel>????????????</InputRequireLabel>
              </InputName>
              <Input
                type="date"
                value={userBirthChange}
                onChange={getBirth}
                className={birthError ? 'have-error' : ''}
              />
              {birthError && (
                <ErrorWrapper>
                  <ErrorMessage>?????? ?????? ???????????????.</ErrorMessage>
                </ErrorWrapper>
              )}
            </InputWrapper>
            <InputWrapper>
              <InputName>
                ??????
                <InputRequireLabel>????????????</InputRequireLabel>
              </InputName>
              <GenderSelectWrapper className={genderError ? 'have-error' : ''}>
                <GenderSelect>
                  <GenderInput
                    type="radio"
                    value="M"
                    id="M"
                    name="gender"
                    onChange={getGender}
                    checked={
                      (nonUser && userGenderChange === '???') ||
                      userGenderChange === '???'
                    }
                  />
                  {/* checked={nonUser && locationState.gender === '???'} */}
                  <Gender htmlFor="M">??????</Gender>
                </GenderSelect>
                <GenderSelect>
                  <GenderInput
                    type="radio"
                    value="FM"
                    id="FM"
                    name="gender"
                    onChange={getGender}
                    checked={
                      (nonUser && userGenderChange === '???') ||
                      userGenderChange === '???'
                    }
                  />
                  {/* 
                    checked={nonUser && locationState.gender === '???'} */}
                  <Gender htmlFor="FM">??????</Gender>
                </GenderSelect>
              </GenderSelectWrapper>
              {genderError && (
                <ErrorWrapper>
                  <ErrorMessage>?????? ?????? ???????????????.</ErrorMessage>
                </ErrorWrapper>
              )}
            </InputWrapper>
            <InputWrapper>
              <InputName>
                ????????????
                <InputRequireLabel>????????????</InputRequireLabel>
              </InputName>
              <SelfExerciseLevelButtonWrapper>
                <UserLevel>
                  {userLevelChange}
                  {userLevelIcon}
                </UserLevel>
                {userLevelChange === '' ? (
                  <SelfExerciseLevelButton
                    onClick={handleClickOpen}
                    className={levelError ? 'have-error' : ''}
                  >
                    ?????? ?????? ??????
                  </SelfExerciseLevelButton>
                ) : (
                  <SelfExerciseLevelButton onClick={handleClickOpen}>
                    ?????? ?????? ?????????
                  </SelfExerciseLevelButton>
                )}

                <Dialog open={open} onClose={handleClose}>
                  <MuiDialogTitle>?????? ?????? ?????? ?????? ??????</MuiDialogTitle>
                  <DialogContent>
                    <MuiDialogContentText>
                      ?????? ????????? ?????? ?????? ?????? ???????????????. ?????? ?????????
                      ???????????? ???????????????.
                    </MuiDialogContentText>
                  </DialogContent>
                  <ToggleButtonWrapper>
                    <QuestionWrapper>
                      <Question>
                        1. ?????? ???????????? ?????? ?????? ????????? ?????? ????????????????
                      </Question>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment1}
                        exclusive
                        onChange={handleChange1}
                      >
                        <MuiToggleButton value="level1">??????</MuiToggleButton>
                        <MuiToggleButton value="level2">??????</MuiToggleButton>
                        <MuiToggleButton value="level3">??????</MuiToggleButton>
                        <MuiToggleButton value="level4">??????</MuiToggleButton>
                      </ToggleButtonGroup>
                    </QuestionWrapper>
                    <QuestionWrapper>
                      <Question>2. 1?????? ?????? ??? ??? ??????????</Question>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment2}
                        exclusive
                        onChange={handleChange2}
                      >
                        <MuiToggleButton value="one">0???</MuiToggleButton>
                        <MuiToggleButton value="two">1~2???</MuiToggleButton>
                        <MuiToggleButton value="three">3~4???</MuiToggleButton>
                        <MuiToggleButton value="four">5??? ??????</MuiToggleButton>
                      </ToggleButtonGroup>
                    </QuestionWrapper>
                    <QuestionWrapper>
                      <Question>3. 1??? ?????? ???, ??? ?????? ??????????</Question>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment3}
                        exclusive
                        onChange={handleChange3}
                      >
                        <MuiToggleButton value="30min">
                          30??? ??????
                        </MuiToggleButton>
                        <MuiToggleButton value="1hour">
                          30??? ?????? 1?????? ??????
                        </MuiToggleButton>
                        <MuiToggleButton value="2hour">
                          1?????? ?????? 2?????? ??????
                        </MuiToggleButton>
                        <MuiToggleButton value="many">
                          2?????? ??????
                        </MuiToggleButton>
                      </ToggleButtonGroup>
                    </QuestionWrapper>
                    <QuestionWrapper>
                      <Question>4. ??? ??? ???????????? ?????? ??????????</Question>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment4}
                        exclusive
                        onChange={handleChange4}
                      >
                        <MuiToggleButton value="3stairs">
                          1???-3???
                        </MuiToggleButton>
                        <MuiToggleButton value="6stairs">
                          4???-6???
                        </MuiToggleButton>
                        <MuiToggleButton value="9stairs">
                          7???-9???
                        </MuiToggleButton>
                        <MuiToggleButton value="10stairs">
                          10??? ??????
                        </MuiToggleButton>
                      </ToggleButtonGroup>
                    </QuestionWrapper>
                    <QuestionWrapper>
                      <Question className="Test">
                        5. ??????????????? ??????(???, ???)??? ????????????.
                      </Question>
                      <QuestionDescription>
                        ??? ????????? ??? ?????? ????????? ?????????, ?????? ??? ?????? ????????????
                        ?????? ????????? ?????? ?????????. <br />
                        ?????? ??? ?????? ????????? : BAD
                        <br />
                        ????????? ????????? : GOOD
                        <br /> ???, ??? ?????? ??? ????????? ?????? ????????? : PERFECT
                      </QuestionDescription>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment5}
                        exclusive
                        onChange={handleChange5}
                      >
                        <MuiToggleButton value="shoulderpoint0">
                          BAD
                        </MuiToggleButton>
                        <MuiToggleButton value="shoulderpoint2">
                          GOOD
                        </MuiToggleButton>
                        <MuiToggleButton value="shoulderpoint4">
                          PERFECT
                        </MuiToggleButton>
                      </ToggleButtonGroup>
                    </QuestionWrapper>
                    <QuestionWrapper>
                      <Question className="Test">
                        6. ?????? ?????? ???????????? ????????????.
                      </Question>
                      <QuestionDescription>
                        ?????? ????????? ?????? ?????? ????????? ??? ?????? ?????? ????????? ??????
                        ?????? ????????? ????????? ?????? ????????? ???????????????(1??? ?????? ??????
                        ???) ????????????. <br />
                        ?????? ??? ??? ??? ????????? : BAD
                        <br />
                        ????????? ????????? ??? ????????? : GOOD
                        <br />
                        ?????? ??? ????????? ??? ????????? : PERFECT
                      </QuestionDescription>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment6}
                        exclusive
                        onChange={handleChange6}
                      >
                        <MuiToggleButton value="legpoint0">BAD</MuiToggleButton>
                        <MuiToggleButton value="legpoint2">
                          GOOD
                        </MuiToggleButton>
                        <MuiToggleButton value="legpoint4">
                          PERFECT
                        </MuiToggleButton>
                      </ToggleButtonGroup>
                    </QuestionWrapper>
                  </ToggleButtonWrapper>
                  <DialogActions>
                    <DialogButton onClick={handleCloseCancelButton}>
                      ??????
                    </DialogButton>
                    <DialogButton onClick={handleCloseFinishButton}>
                      ?????? ?????????
                    </DialogButton>
                  </DialogActions>
                </Dialog>
              </SelfExerciseLevelButtonWrapper>
              {levelError && (
                <ErrorWrapper>
                  <ErrorMessage>?????? ?????? ???????????????.</ErrorMessage>
                </ErrorWrapper>
              )}
            </InputWrapper>
          </ContentWrapper>
        </ContentsWrapper>
        <ConFirmWrapper>
          <CancelButton onClick={handleBefore}>??????</CancelButton>
          <ConfirmButton
            onClick={handleNext}
            className={bodyInfoComplete ? 'complete' : ''}
          >
            ??????
          </ConfirmButton>
        </ConFirmWrapper>
      </Container>
    </>
  );
};

const Container = styled.div``;

const StepName = styled.h2`
  color: #02aab0;
  font-weight: 700;

  @media (min-width: 1060px) {
    margin: 4rem 0 0.8rem;
    font-size: 2.4rem;
    line-height: 1.5;
  }
`;

const StepDescription = styled.p`
  display: block;
  margin: 0.8rem 0;
  color: #555;
  font-weight: 400;

  @media (min-width: 1060px) {
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const RequiresWrapper = styled.div`
  box-sizing: border-box;
  margin: 0.8rem 0;
  color: #555;
  font-weight: 400;

  @media (min-width: 1060px) {
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const RequireLabel = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-indent: 100%;
  position: relative;
  width: 0.5rem;
  font-size: inherit;
  vertical-align: bottom;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #de001b;
  }

  @media (min-width: 1060px) {
    top: 0.95rem;
  }
`;

const ContentsWrapper = styled.div`
  padding: 2rem 1.6rem;
  border: 1px solid #d9dbe1;
  box-sizing: border-box;
  margin: 4rem 0;

  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
    padding: 4.6rem 4rem;
  }

  @media (max-width: 667px) {
    padding: 0px;
  }
`;

const ContentNameWrapper = styled.div`
  margin-bottom: 2rem;
  padding-right: 2rem;

  @media (min-width: 1060px) {
    flex: 4;
    margin-bottom: 0;
  }
`;

const ContentName = styled.h3`
  display: inline-block;
  margin-bottom: 0;
  margin: 2rem 0 0.8rem;
  color: #000;
  font-weight: 700;
  font-size: 1.6rem;

  @media (min-width: 1060px) {
    margin: 4rem 0 0.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const ContentWrapper = styled.div`
  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
    flex: 8;
  }
`;

const InputWrapper = styled.div`
  margin-top: 4rem;

  &:first-of-type {
    margin-top: 0;
  }
  @media (min-width: 1060px) {
    width: 100%;
  }
`;

const BodyInputWrapper = styled.div`
  margin-top: 4rem;
  border-bottom: 1px solid #02aab0;
  &:hover {
    padding: 0 1rem;
    border-bottom-color: transparent;
    border-radius: 0.2rem;
    outline: 0;
    box-shadow: 0 0 0 1px #00cdac;
    color: #000;
    transition: padding 0.2s, border 0.2s, background 0.2s, color 0.2s,
      box-shadow 0.2s;
  }
  &:first-of-type {
    margin-top: 0;
  }
  @media (min-width: 1060px) {
    width: 100%;
  }

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`;

const InputName = styled.label`
  display: block;
  margin-bottom: 0.2rem;
  color: #767676;
  font-size: 1.4rem;
  line-height: 1.58;

  @media (min-width: 1060px) {
    margin-bottom: 0.9rem;
  }
`;

const InputRequireLabel = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-indent: 100%;
  position: relative;
  width: 0.5rem;
  font-size: inherit;
  vertical-align: bottom;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #de001b;
  }
`;

const Input = styled.input`
  appearance: none;
  box-sizing: border-box;
  display: block;
  opacity: 1;
  width: 100%;
  height: 4rem;
  margin: 0;
  padding: 0;
  border: 0;
  border-bottom: 1px solid #02aab0;
  border-radius: 0;
  color: #000;
  font-size: 1.6rem;
  line-height: 1.5;
  transition: border 0.2s 0.3s, color 0.2s 0.3s, box-shadow 0.2s 0.3s;

  @media (min-width: 1060px) {
    height: 4.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`;

const BodyInput = styled.input`
  appearance: none;
  box-sizing: border-box;
  display: inline-block;
  margin: 0;
  border: 0;
  left: 0;
  width: 3.5rem;
  height: 2rem;
  border-radius: 0;
  color: #000;
  font-size: 1.6rem;
  line-height: 1.5;
  transition: border 0.2s 0.3s, color 0.2s 0.3s, box-shadow 0.2s 0.3s;
  text-align: right;

  @media (min-width: 1060px) {
    height: 4.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  &.dot {
    background: rgb(255, 255, 255);
    width: 10px;
    color: #000;
  }

  &.oneNumber {
    width: 25px;
  }
`;

const GenderSelectWrapper = styled.ul`
  list-style: none;
  margin: 1rem 0;
  padding: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
  }

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`;

const GenderSelect = styled.li`
  position: relative;
  @media (min-width: 1060px) {
    width: 33.33333333%;
    padding-right: 1rem;
  }
`;

const GenderInput = styled.input`
  position: absolute;
  left: 0;
  width: 2rem;
  height: 2rem;
  border: 0;
`;

const Gender = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 2.6rem;
  color: #000;
  font-size: 1.4rem;
  line-height: 1.58;
  text-indent: 0;

  @media (min-width: 1060px) {
    padding-left: 3rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const SelfExerciseLevelButtonWrapper = styled.div`
  appearance: none;
  box-sizing: border-box;
  display: block;
  opacity: 1;
  width: 100%;
  height: 4rem;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  color: #000;
  font-size: 1.6rem;
  line-height: 1.5;
  transition: border 0.2s 0.3s, color 0.2s 0.3s, box-shadow 0.2s 0.3s;

  @media (min-width: 1060px) {
    height: 4.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;

const UserLevel = styled.span`
  padding-right: 10px;
`;

const SelfExerciseLevelButton = styled.button`
  display: inline-block;
  min-width: 6.8rem;
  margin: 0;
  padding: 0.6rem 1.2rem 0.7rem;
  border-radius: 0.2rem;
  background-color: #fff;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  border: 1px solid #02aab0;
  appearance: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';

  @media (min-width: 1060px) {
    min-width: 8.4rem;
    padding: 0.7rem 0.8rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`;

const ConFirmWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  justify-items: flex-start;
  margin: 4rem 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CancelButton = styled.button`
  flex: 6;
  margin-right: 0.4rem;
  background-color: #fff;
  color: #02aab0;
  display: block;
  width: 100%;
  padding: 1.5rem 2rem 1.6rem;
  border: 1px solid #02aab0;
  border-radius: 0.2rem;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const ConfirmButton = styled.button`
  flex: 6;
  margin-left: 0.4rem;
  display: block;
  width: 100%;
  padding: 1.5rem 2rem 1.6rem;
  border: 1px solid #02aab0;
  border-radius: 0.2rem;
  background: #e0e0e0;
  color: #02aab0;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';

  &.complete {
    background-color: #02aab0;
    color: #fff;
  }
`;

const MuiDialogTitle = styled(DialogTitle)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const MuiDialogContentText = styled(DialogContentText)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  padding-bottom: 16px;
`;

const ToggleButtonWrapper = styled.div`
  padding-top: 0px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 16px;
`;

const MuiToggleButton = styled(ToggleButton)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const Question = styled.div`
  margin-bottom: 16px;

  &.Test {
    margin-bottom: 8px;
  }
`;

const QuestionDescription = styled.div`
  margin-bottom: 16px;
  color: #00000099;
`;

const DialogButton = styled(Button)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  color: #02aab0;
`;

const ErrorWrapper = styled.div``;

// 22.4px?????? 2px??????
const ErrorMessage = styled.span`
  font-size: 1.1rem;
  color: rgb(255, 119, 119);
  line-height: 1.5;
`;

export default BodyInfoForm;

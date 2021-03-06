import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { login as loginSagaStart } from '../../redux/modules/auth';
import { LogInRequest } from '../../types/authTypes';
import { regId, regPw } from '../../utils/RegExpressions';

const LogInCard: React.FC = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [idMessage, setIdMessage] = useState<string>('');
  const [pwMessage, setPwMessage] = useState<string>('');

  const [isId, setIsId] = useState<boolean>(false);
  const [isPw, setIsPw] = useState<boolean>(false);

  // const [idError, setIdError] = useState<boolean>(false);
  // const [pwError, setPwError] = useState<boolean>(false);
  const [logInFormComplete, setLogInFormComplete] = useState<boolean>(false);
  const savedId = localStorage.getItem('ssafit-id');
  const [idSaveCheck, setIdSaveCheck] = useState<boolean>(false);

  const getIdSaveCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdSaveCheck(event.target.checked);
  };

  useEffect(() => {
    if (savedId !== null) {
      setId(savedId);
      setIsId(true);
      setIdSaveCheck(true);
    }
  }, [savedId]);

  const login = useCallback(
    (requestData) => {
      dispatch(loginSagaStart(requestData));
    },
    [dispatch],
  );

  useEffect(() => {
    if (isId && isPw) {
      setLogInFormComplete(true);
    } else setLogInFormComplete(false);
  }, [isId, isPw]);

  const handleLogInButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (!isId) {
      if (id === '') setIdMessage('필수 입력 항목입니다.');
      else setIdMessage('아이디 형식이 올바르지 않습니다.');
      // setLogInFormComplete(false);
      // setIdError(true);
    }

    if (!isPw) {
      if (password === '') setPwMessage('필수 입력 항목입니다.');
      else setPwMessage('비밀번호 형식이 올바르지 않습니다.');
      // setLogInFormComplete(false);
      // setPwError(true);
    }

    if (logInFormComplete)
      login({ userId: id, password, idCheck: idSaveCheck });
  };

  const getId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const idCurrent = event.target.value;
    setId(idCurrent);
    // setIdError(false);

    if (!regId.test(idCurrent)) {
      setIdMessage('아이디 형식이 올바르지 않습니다.');
      setIsId(false);
    } else {
      setIdMessage('');
      setIsId(true);
    }
  };

  const getPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pwCurrent = event.target.value;
    setPassword(pwCurrent);
    // setPwError(false);

    if (!regPw.test(pwCurrent)) {
      setPwMessage('비밀번호 형식이 올바르지 않습니다.');
      setIsPw(false);
    } else {
      setPwMessage('');
      setIsPw(true);
    }
  };

  return (
    <>
      <Wrapper>
        <Contatner>
          <LogInForm>
            <LogInWrapper>
              <LogInInner>
                <LogInGroup>
                  <LogInTitle>로그인</LogInTitle>
                  <InputAreaWrapper>
                    <InputName>
                      아이디
                      <Required>필수입력</Required>
                    </InputName>
                    <InputWrapper>
                      <Input
                        type="text"
                        value={id}
                        onChange={getId}
                        className={idMessage !== '' ? 'have-error' : ''}
                      />
                      {idMessage !== '' && (
                        <ErrorWrapper>
                          <ErrorMessage>{idMessage}</ErrorMessage>
                        </ErrorWrapper>
                      )}
                    </InputWrapper>
                  </InputAreaWrapper>
                  <InputAreaWrapper>
                    <InputName>
                      비밀번호
                      <Required>필수입력</Required>
                    </InputName>
                    <InputWrapper>
                      <Input
                        type="password"
                        value={password}
                        onChange={getPw}
                        className={pwMessage !== '' ? 'have-error' : ''}
                      />
                      {pwMessage !== '' && (
                        <ErrorWrapper>
                          <ErrorMessage>{pwMessage}</ErrorMessage>
                        </ErrorWrapper>
                      )}
                    </InputWrapper>
                  </InputAreaWrapper>
                  <InputAreaWrapper>
                    <InputWrapper>
                      <IdSaveBox
                        type="checkbox"
                        id="idSave"
                        onChange={getIdSaveCheck}
                        checked={idSaveCheck}
                      />
                      <IdSaveLabel htmlFor="idSave">아이디 저장</IdSaveLabel>
                    </InputWrapper>
                  </InputAreaWrapper>
                  <LogInButtonWrapper>
                    <LogInButton
                      type="submit"
                      onClick={handleLogInButtonClick}
                      className={logInFormComplete ? 'complete' : ''}
                    >
                      로그인
                    </LogInButton>
                  </LogInButtonWrapper>
                  <FindWrapper>
                    <FindItemWrapper>
                      <FindLink className="inner" to="/users/search-id">
                        아이디 찾기
                      </FindLink>
                    </FindItemWrapper>
                    <FindItemWrapper>
                      <FindLink
                        className="inner"
                        to="/users/reset-password/verify"
                      >
                        비밀번호 재설정
                      </FindLink>
                    </FindItemWrapper>
                  </FindWrapper>
                  <SignUpLinkWrapper>
                    <SignUpLink href="/users/sign-up">회원가입</SignUpLink>
                  </SignUpLinkWrapper>
                </LogInGroup>
              </LogInInner>
            </LogInWrapper>
          </LogInForm>
        </Contatner>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: block;
`;

const Contatner = styled.div`
  box-sizing: border-box;

  @media (min-width: 1060px) {
    padding: 0 2rem;
  }
`;

const LogInForm = styled.form`
  box-sizing: border-box;
`;

const LogInWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;

  @media (min-width: 1060px) {
    margin: 0 -2rem;
    padding: 6rem 2rem 10rem;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #02aab0;
      background-image: linear-gradient(135deg, #02aab0, #00cdac);
    }
  }
`;

const LogInInner = styled.div`
  position: relative;

  @media (min-width: 1060px) {
    max-width: 128rem;
    margin: 0 auto;
  }
`;

const LogInGroup = styled.div`
  @media (min-width: 1060px) {
    width: 530px;
    padding: 4rem 6rem 6rem;
    margin: 0 auto;
    box-shadow: 4px 10px 20px 0 rgb(0 25 72 / 10%);
    background-color: #fff;
  }
`;

const LogInTitle = styled.h1`
  margin-bottom: 1rem;
  color: #000;
  font-weight: 500;
  font-size: 2rem;

  @media (min-width: 1060px) {
    margin-bottom: 2.6rem;
    font-weight: 400;
    font-size: 3.2rem;
  }
`;

const InputAreaWrapper = styled.div`
  padding-top: 1rem;

  &:not(:first-of-type) {
    margin-top: 3rem;
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

const Required = styled.span`
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

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  word-break: normal;
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

  &:focus {
    padding: 0 1rem;
    border-bottom-color: transparent;
    border-radius: 0.2rem;
    outline: 0;
    box-shadow: 0 0 0 1px #00cdac;
    color: #000;
    transition: padding 0.2s, border 0.2s, background 0.2s, color 0.2s,
      box-shadow 0.2s;
  }
  @media (min-width: 1060px) {
    height: 4.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
  &.have-error {
    border-radius: 0.2rem;
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`;

const IdSaveBox = styled.input`
  /* opacity: 0; */
  position: absolute;
  /* top: 1.2rem; */
  left: 0;
  width: 2rem;
  height: 2rem;
  border: 0;
`;

const IdSaveLabel = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 2.6rem;
  color: #000;
  font-size: 1.4rem;
  line-height: 1.58;
  text-indent: 0;

  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 0.2rem;
    left: 0;
    width: 1.8rem;
    height: 1.8rem;
    /* border: 1px solid #00256c; */
    border-radius: 0.2rem;
    background-size: 11px 9px;

    /* @media (min-width: 1060px) {
      top: 0.4rem;
    } */
  }
  @media (min-width: 1060px) {
    padding-left: 3rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const LogInButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const LogInButton = styled.button`
  display: block;
  width: 100%;
  height: 5.4rem;
  margin: 0;
  padding: 1.6rem 2rem;
  border: 1px solid #02aab0;
  border-radius: 0.2rem;
  background: #02aab0;
  color: #fff;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;

  @media (min-width: 1060px) {
    padding-left: 3rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }

  &.complete {
    background-color: #02aab0;
    color: #fff;
  }
`;

const FindWrapper = styled.ul`
  display: flex;
  margin: 2rem 0;
  list-style: none;
`;

const FindItemWrapper = styled.li`
  width: 50%;
  text-align: center;
`;

const FindLink = styled(Link)`
  display: inline-block;
  border: 0;
  background: none;
  color: #00cdac;
  text-decoration: underline;
  text-decoration-skip-ink: auto;
  text-indent: 0;

  &.inner {
    position: relative;
    font-size: 1.4rem;
    text-decoration: none;
  }

  @media (min-width: 1060px) {
    &.inner {
      font-size: 1.6rem;
    }
  }
`;

const SignUpLinkWrapper = styled.div`
  margin-top: 3rem;
  @media (min-width: 1060px) {
    margin: 3rem -6rem -6rem;
  }
`;

const SignUpLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5.4rem;
  background-color: #00cdacff;
  color: #fff;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;

  &:hover {
    outline: 0;
    border-radius: 0;
    box-shadow: inset 0 0 0 1px #00cdac;
  }
  @media (min-width: 1060px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5.4rem;
    background-color: #00cdac1a;
    color: #02aab0;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 1.58;
    text-decoration: none;
  }
`;

const ErrorWrapper = styled.div``;

// 22.4px보다 2px작게
const ErrorMessage = styled.span`
  font-size: 1.1rem;
  color: rgb(255, 119, 119);
  line-height: 1.5;
`;

export default LogInCard;

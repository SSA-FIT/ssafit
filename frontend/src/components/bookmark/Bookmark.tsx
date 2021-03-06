import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  BookmarkState,
  putBookmarkInfo as BookmarkSagaPut,
} from '../../redux/bookmark';

import useBookMarkList from '../../hooks/useBookMarkList';
import useToken from '../../hooks/useToken';
import { Recommendation } from '../../types/recommendationTypes';
import BookMarkItemCard from './BookMarkItemCard';
import { RootState } from '../../types/authTypes';

const Bookmark: React.FC = () => {
  const token = useToken();
  // const bookMarkRecoList: Recommendation[] = useBookMarkList(token);
  const [bookMarkNewList, setBookMarkNewList] = useState<Recommendation[]>([]);

  const bookMarkFromRedux = useSelector<RootState, Recommendation[] | null>(
    (state) => state.bookmark.bookmarks,
  );

  useEffect(() => {
    if (bookMarkFromRedux !== null) setBookMarkNewList(bookMarkFromRedux);
  }, [bookMarkFromRedux]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BookmarkSagaPut());
  }, []);

  return (
    <>
      <ContainerWrapper>
        <Container>
          <ContentName>즐겨찾기</ContentName>

          {bookMarkNewList.length > 0 ? (
            <Wrapper>
              {bookMarkNewList.map((bookMarkItem) => (
                <BookMarkItemCard
                  key={bookMarkItem.id}
                  bookMarkItem={bookMarkItem}
                />
              ))}
            </Wrapper>
          ) : (
            <DescriptionWrapper>
              <Description>
                현재 즐겨찾기한 운동이 없습니다. 운동 이력 조회 페이지에서
                즐겨찾기를 할 수 있습니다!
              </Description>
              <ExerciseHistoryLink to="/exercise/history">
                운동 이력 조회 하러 가기🏃‍♀️
              </ExerciseHistoryLink>
            </DescriptionWrapper>
          )}
        </Container>
      </ContainerWrapper>
    </>
  );
};
const ContainerWrapper = styled.div`
  box-sizing: border-box;
  padding: 0;

  @media (min-width: 1060px) {
    padding: 0 2rem;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 4rem 2rem 13rem;
  box-sizing: border-box;

  @media (min-width: 1060px) {
    max-width: 128rem;
    padding: 6rem 6rem 10rem;
  }

  @media (max-width: 667px) {
    padding-right: 0px;
    padding-bottom: 2rem;
    padding-left: 0px;
  }
`;

const ContentName = styled.h1`
  margin-bottom: 0.8rem;
  color: #000;
  font-weight: 700;
  font-size: 2rem;

  @media (min-width: 1060px) {
    font-weight: 400;
    font-size: 3.2rem;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 20px 0px 30px;
  @media (min-width: 767px) {
    grid-template-columns: repeat(4, 1fr);
    margin: 64px 0px 40px;
  }

  @media (max-width: 349px) {
    grid-template-columns: repeat(1, 1fr);
    margin: 30px 0px 40px;
  }
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  height: 150px;
  background-color: #fafafa;
  padding: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

const Description = styled.h5`
  color: #02aab0;
  text-align: center;
  margin-top: 15px;
  font-weight: 200;
  font-size: 20px;
  line-height: initial;
`;

const ExerciseHistoryLink = styled(Link)`
  font-size: 20px;
  margin-top: 15px;

  &:hover {
    border-bottom: 1px solid #fff;
  }
`;
export default Bookmark;

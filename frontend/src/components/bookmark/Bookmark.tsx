import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
          {/* <ContentName>즐겨찾기</ContentName> */}
          <Wrapper>
            {bookMarkNewList.map((bookMarkItem) => (
              <BookMarkItemCard
                key={bookMarkItem.id}
                bookMarkItem={bookMarkItem}
              />
            ))}
          </Wrapper>
        </Container>
      </ContainerWrapper>
    </>
  );
};
const ContainerWrapper = styled.div`
  max-width: 1240px;
  margin: 0px auto;
  padding: 0 24px;
  margin-bottom: 60px;

  @media (min-width: 1060px) {
    padding: 0px;
  }

  @media (min-width: 992px) {
    padding: 0 20px;
  }
`;

const Container = styled.div``;

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
    margin: 30px 0px 40px;
  }
`;
export default Bookmark;

import styled from '@emotion/styled';
import MynameSection from './MynameSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectSection';
import ContactSection from './ContactSection';

const NewMain: React.FC = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <MynameSection></MynameSection>
          <AboutSection></AboutSection>
          <ProjectsSection></ProjectsSection>
          <ContactSection></ContactSection>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  outline: none;
  box-sizing: border-box;
  text-align: center;
`;

export default NewMain;

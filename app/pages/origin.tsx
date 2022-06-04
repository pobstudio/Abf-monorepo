import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { PageDiv } from '../components/divs';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../components/divs/oneColumn';
import { Footer } from '../components/navs/footer';
import { Header } from '../components/navs/header';
import { Text } from '../components/texts';

const OriginPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <OneColumnContainer>
        <OneColumnContentContainer>
          <div>
            <StyledText>
              <strong>
                SUBJECT: CURRENT PROJECT DOCUMNETATION DRAFT FOR PUBLIC
                CONSUMPTION.
              </strong>
            </StyledText>
          </div>
          <div>
            <StyledText>ABF is borned out of necessity.</StyledText>
          </div>
        </OneColumnContentContainer>
      </OneColumnContainer>
      <Footer />
    </PageDiv>
  );
};

const StyledText = styled(Text)`
  line-height: 20px;
`;
export default React.memo(OriginPage);

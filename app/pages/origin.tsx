import React from 'react';
import { NextPage } from 'next';
import { Header } from '../components/navs/header';
import { PageDiv } from '../components/divs';
import { FlexCenter, FlexEnds } from '../components/flexs';
import { Label, Text } from '../components/texts';
import { ProjectBuilder } from '../components/layouts/projectBuilder';
import { Footer } from '../components/navs/footer';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../components/divs/oneColumn';
import styled from 'styled-components';

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

import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { PageDiv } from '../../components/divs';
import { Origins } from '../../components/layouts/origins';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';
import { Text } from '../../components/texts';

const OriginPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <Origins />
      <Footer />
    </PageDiv>
  );
};

const StyledText = styled(Text)`
  line-height: 20px;
`;
export default React.memo(OriginPage);

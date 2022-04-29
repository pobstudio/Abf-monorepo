import React from 'react';
import { NextPage } from 'next';
import { Header } from '../components/navs/header';
import { PaddedBox, PageDiv } from '../components/divs';
import { ProjectRow } from '../components/layouts/projectRow';
import { FlexCenter, FlexEnds } from '../components/flex';
import { Label, Text } from '../components/texts';

const IndexPage: NextPage = () => {
  return (
    <PageDiv>
      <FlexCenter style={{ height: '100vh' }}>
        <PaddedBox style={{ width: 540 }}>
          <FlexEnds>
            <Text>██████████ PROTOCOL NOT FOUND</Text>
            <Text>PLEASE CONTACT THE ████████</Text>
          </FlexEnds>
          <FlexEnds style={{ marginTop: 32 }}>
            <Label>
              ipfs://bafybeial█3r6asbsfdwghq47wsp7z3llne4gz█6ze5nfpzmi4zfts5e7zi
            </Label>
          </FlexEnds>
        </PaddedBox>
      </FlexCenter>
    </PageDiv>
  );
};
export default React.memo(IndexPage);

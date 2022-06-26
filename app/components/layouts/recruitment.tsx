import React from 'react';
import styled from 'styled-components';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { PrimaryButton } from '../inputs/button';
import { InputWell, TextArea } from '../inputs/input';
import { Label, MultiLineText, Text } from '../texts';

export const Recruitment: React.FC = () => {
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <Jumbotron />
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};

const Jumbotron: React.FC = () => {
  return (
    <DetailRowsContainer>
      <div>
        <JumbotronText>
          <strong>FROM: B-001 (BOARD MEMBER)</strong>
        </JumbotronText>
        <JumbotronText>
          <strong>TO: XXX</strong>
        </JumbotronText>
        <JumbotronText>
          <strong>SUBJECT: ABF CORP RECRUIMENT OF NEW MEMBERS</strong>
        </JumbotronText>
      </div>
      <div>
        <JumbotronText>
          In its current infancy, ABF is not revealed to the mass public, but
          the protocol is <strong>alive and humming.</strong> We are in need of
          new corp members.
        </JumbotronText>
      </div>
      <div>
        <JumbotronText>
          The ABF Corp is the steward of the <strong>ABF protocol</strong>, but
          do not be confused. The corp is NOT a DAO. We are not the owners of
          the protocol (f**k fee extractors), simply its primary users, artists,
          and researchers.
        </JumbotronText>
      </div>
      <div>
        <JumbotronText>Our goal is to make ABF flourish.</JumbotronText>
      </div>
      <div>
        <JumbotronText>
          <strong>Joining the corp grants:</strong> access to the early ABF
          protocol build, the Corp's discord, and the opportunity to shape ABF's
          future.
        </JumbotronText>
      </div>
      <div
        style={{ margin: '82px 0', borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
      ></div>
      <div>
        <JumbotronText>
          <strong>
            If this interests you, please complete the following BrainFuck
            challenge for entry.
          </strong>
        </JumbotronText>
      </div>
      <Label>CHALLENGE</Label>
      <MultiLineText>
        Write a BrainFuck algorithmn that prints every integer between 41 and 82
        (inclusive).
      </MultiLineText>
      <Label>ANSWER</Label>
      <InputWell>
        <TextArea
          // value={code ?? ''}
          // onChange={(e) => onCodeChange(e.target.value)}
          style={{ minHeight: 240 }}
          placeholder="-[--->+<]>-.[---->+++++<]>-.+.++++++++++.+[---->+<]>+++.-[--->++<]>-.++++++++++.+[---->+<]>+++.[-->+++++++<]>.++.-------------.[--->+<]>---..+++++.-[---->+<]>++.+[->+++<]>.++++++++++++..---.[-->+<]>--------."
        />
      </InputWell>
      <Label>OUTPUT</Label>
      <MultiLineText>testing...</MultiLineText>
      <ErrorTable>
        <ErrorText>OUTPUT IS INCORRECT.</ErrorText>
      </ErrorTable>
      <PrimaryButton>SUBMIT ANSWER</PrimaryButton>
    </DetailRowsContainer>
  );
};

const ErrorTable = styled.div`
  > * + * {
    margin-top: 12px;
  }
`;

const ErrorText = styled(Text)`
  color: #f24c4c;
`;

const JumbotronText = styled(Text)`
  line-height: 20px;
`;

import React from 'react';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { A, B, H1, P } from '../texts';
import { DocumentationFooter } from './docs';

export const BrainFuck: React.FC = () => {
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <DetailRowsContainer>
          <div>
            <H1 style={{ fontSize: 24 }}>Brainfuck, the language</H1>
          </div>
          <P>
            <B>NOTE:</B> This is not an exhuastive documentation/representation
            of the <B>BrainFuck</B> languague, merely a documentation for
            ABF-specific aspects.
          </P>
          <P>
            Consult the{' '}
            <A href={'https://en.wikipedia.org/wiki/Brainfuck'}>wiki</A> for the
            history + full 'spec' of ABF.
          </P>
          <P>
            Brainfuck is an esoteric programing language that is "technically"
            turing complete with only 8 opcodes:
          </P>
          <DocumentationFooter />
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};

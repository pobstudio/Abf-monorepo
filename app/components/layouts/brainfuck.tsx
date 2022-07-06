import React from 'react';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { A, B, Code, H1, H2, I, OL, P, UL } from '../texts';
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
            <B>NOTE:</B> This is not an exhaustive documentation/representation
            of the <B>Brainfuck</B> language, merely a documentation for
            ABF-specific aspects.
          </P>
          <P>
            Consult the{' '}
            <A href={'https://en.wikipedia.org/wiki/Brainfuck'}>wiki</A> for the
            history + full 'spec' of the BrainFuck language.
          </P>
          <P>
            Brainfuck is an esoteric programing language that is "technically"
            turing complete with only 8 opcodes:
          </P>
          <UL>
            <li>
              <Code>{'>'}</Code> : Shift the <I>data pointer</I> to the right
            </li>
            <li>
              <Code>{'<'}</Code> : Shift the <I>data pointer</I> to the left
            </li>
            <li>
              <Code>{'+'}</Code> : Increment the byte at the <I>data pointer</I>
            </li>
            <li>
              <Code>{'-'}</Code> : Decrement the byte at the <I>data pointer</I>
            </li>
            <li>
              <Code>{'.'}</Code> : Output the byte at the <I>data pointer</I>
            </li>
            <li>
              <Code>{','}</Code> : Accept a byte of input at the{' '}
              <I>data pointer</I>
            </li>
            <li>
              <Code>{'['}</Code> : If the byte at <I>data pointer</I> is zero,
              skip code until <Code>{']'}</Code>
            </li>
            <li>
              <Code>{']'}</Code> : If the byte at <I>data pointer</I> is
              nonzero, go back in code until <Code>{'['}</Code>
            </li>
          </UL>
          <P>
            That's it. Any other characters in your code is ignored and are
            considered comments.
          </P>
          <P>
            ABF implements the Brainfuck language on-chain in the{' '}
            <A>BrainfuckVM</A> contract with a few specific configurations:
          </P>
          <OL>
            <li>
              The <I>data pointer</I> has a range of 0-29,999. This means you
              can utilize up to 30,000 byte slots to store data in your
              brainfuck runtime.
            </li>
            <li>
              Underflow and overflow bytes cause the byte to 'roll over', as in
              incrementing <Code>0xFF</Code> will become <Code>0x00</Code>.
            </li>
            <li>
              There is a maximum of 4096 nested <Code>{'[]'}</Code> allowed.
              Exceeding that will cause ABF to crash.
            </li>
            <li>
              A maximum of 10000 code jumps because of <Code>{'['}</Code> or{' '}
              <Code>{']'}</Code> are allowed.
            </li>
          </OL>
          <P>
            These limitations are the result of the constraints of the EVM
            environment, we do not expect many ABF NFTs to hit these bounds.
          </P>
          <H2>Inputting + Outputting Bytes</H2>
          <P>
            ABF provides 64 bytes as input to your Brainfuck code, each byte
            read via the <Code>,</Code> opcode from the most signifigant byte,
            in a little-endian context, to the least. (From left to right)
          </P>
          <P>
            Outputted bytes, via the <Code>.</Code> code, are appended the the
            output bytes from the most signifigant byte, in a little-endian
            context. (From left to right)
          </P>
          <DocumentationFooter />
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};

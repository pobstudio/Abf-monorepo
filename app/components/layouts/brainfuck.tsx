import React from 'react';
import styled from 'styled-components';
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
          <H1 style={{ fontSize: 24 }}>Brainfuck!, the language</H1>
          <P>
            <B>NOTE:</B> This is not an exhaustive documentation/representation
            of the <B>Brainfuck!</B> language, merely a documentation for
            ABF-specific aspects.
          </P>
          <P>
            Brainfuck! is an esoteric programing language that is a minor
            extension of the BrainFuck language that is "technically" turing
            complete with only 9 opcodes:
          </P>
          <P>
            Consult the{' '}
            <A href={'https://en.wikipedia.org/wiki/Brainfuck'}>wikipedia</A>{' '}
            for the full history of the original Brainfuck language.
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
            <li>
              <Code>{'!'}</Code> : Jumps the <I>data pointer</I> to zero. (Extra
              opcode added to Brainfuck)
            </li>
          </UL>
          <P>
            That's it. Any other characters in your code is ignored and are
            considered comments.
          </P>
          <P>
            ABF implements the Brainfuck! language on-chain in the{' '}
            <A>BrainfuckVM</A> contract with a few specific configurations:
          </P>
          <OL>
            <li>
              The <I>data pointer</I> has a range of 0-299,999. This means you
              can utilize up to 300,000 byte slots to store data in your
              Brainfuck! runtime.
            </li>
            <li>
              Underflow and overflow bytes cause the byte to 'roll over', as in
              incrementing <Code>0xFF</Code> will become <Code>0x00</Code>.
            </li>
            <li>
              There is a maximum of 8192 nested <Code>{'[]'}</Code> allowed.
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
            ABF provides 64 bytes as input to your Brainfuck! code, each byte
            read via the <Code>,</Code> opcode from the most significant byte,
            in a little-endian context, to the least. (From left to right)
          </P>
          <P>
            Outputted bytes, via the <Code>.</Code> code, are appended the the
            output bytes from the most significant byte, in a little-endian
            context. (From left to right)
          </P>

          <H2>Resources</H2>
          <P>
            Writing in Brainfuck! is quite literally a 'brainfuck'. Consult
            these various resources as well as Google to dive deeper into the
            language. It's more fun than Assembly and just as f**king annoying.
          </P>

          <LinkGroup>
            <LinkGroupAnchor
              href={'https://gist.github.com/roachhd/dce54bec8ba55fb17d3a'}
              target="_blank"
              rel="noopener noreferrer"
            >
              BASICS OF BRAINFUCK
            </LinkGroupAnchor>
            <LinkGroupAnchor
              href={'https://en.wikipedia.org/wiki/Brainfuck'}
              target="_blank"
              rel="noopener noreferrer"
            >
              BRAINFUCK WIKIPEDIA
            </LinkGroupAnchor>
            <LinkGroupAnchor
              href={'https://esolangs.org/wiki/Brainfuck_algorithms'}
              target="_blank"
              rel="noopener noreferrer"
            >
              BRAINFUCK SNIPPETS & ALGORITHMS
            </LinkGroupAnchor>
            <LinkGroupAnchor
              href={'https://sange.fi/esoteric/brainfuck/bf-source/prog/'}
              target="_blank"
              rel="noopener noreferrer"
            >
              BRAINFUCK CODE ARCHIVE
            </LinkGroupAnchor>
            <LinkGroupAnchor
              href={'http://brainfuck.org/'}
              target="_blank"
              rel="noopener noreferrer"
            >
              MORE BRAINFUCK CODE
            </LinkGroupAnchor>
            <LinkGroupAnchor
              href={'https://copy.sh/brainfuck/'}
              target="_blank"
              rel="noopener noreferrer"
            >
              BRAINFUCK INTERPRETER
            </LinkGroupAnchor>
            <LinkGroupAnchor
              href={'https://copy.sh/brainfuck/text.html'}
              target="_blank"
              rel="noopener noreferrer"
            >
              TEXT TO BRAINFUCK GENERATOR
            </LinkGroupAnchor>
          </LinkGroup>
          <br />
          <br />
          <DocumentationFooter />
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};

const LinkGroup = styled.div`
  > * + * {
    margin-top: 12px;
  }
`;
const LinkGroupAnchor = styled(A)`
  display: block;
  cursor: pointer;
`;

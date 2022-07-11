import { deployments } from '@abf-monorepo/protocol';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { CHAIN_ID, SUBGRAPH_LINK } from '../../constants';
import { ROUTES } from '../../constants/routes';
import { getIPFSUrl } from '../../utils/urls';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { A, B, BlockCode, Code, H1, H2, I, Label, OL, P, UL } from '../texts';
import { DocumentationFooter } from './docs';

export const Specification: React.FC = () => {
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <DetailRowsContainer>
          <H1>ABF PROTOCOL, IN DETAIL</H1>
          <P>
            <B>TLDR</B> ABF, at its core, takes on many design patterns
            reflective of modern front-end libraries. Brainfuck code you write
            provides the 'state' to the NFT that is rendered by renderers.
            Renderers are pure function contracts, providing a deterministic
            output based on its provided inputs (props).
          </P>
          <div
            style={{
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              margin: '24px 0 24px 0',
            }}
          ></div>
          <TableOfContents />
          <div
            style={{
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              margin: '24px 0 24px 0',
            }}
          ></div>
          <H2 style={{ opacity: 0.2 }}>HIGH LEVEL CONCEPTS</H2>

          <DetailRowsContainer id={'bf-code-to-art'}>
            <H2>BF CODE TO ART</H2>
            <P>
              The best way to appreciate the ABF protocol is to, as the old
              adage goes, follow the code. In this case, we will follow the
              Brainfuck code all the way to the actual svg produced in a
              renderer.
            </P>
            <P>
              When a NFT marketplace or indexer calls the <Code>tokenURI</Code>{' '}
              function to retrieve the metadata for an ABF NFT, quite a few
              things happen in sequence.
            </P>
            <OL>
              <li>
                The NFT's stored <B>Brainfuck</B> code is ran with the{' '}
                <A href={'#brainfuck-vm'}>BrainfuckVM</A> Contract. Running the{' '}
                <B>Brainfuck</B> code produces an output, in bytes.
              </li>
              <li>
                These <B>bytes</B> are then provided to the renderer contract
                configured in the NFT.
              </li>
              <li>
                Renderer contract interpret these bytes and constructs a base64
                encoded <B>image</B>. (Could be SVG, or any other image format)
              </li>
              <li>
                With <B>image</B> in hand, the rest of the JSON for NFT metadata
                is constructed (i.e name, description, attributes)
              </li>
            </OL>
            <P>
              In many ways, your NFT is the product of two integral components:
              the <B>Brainfuck</B> code and the <B>renderer</B> contracts. The
              best ABF NFTs will be the result of unique use of a well chosen
              renderer.
            </P>
          </DetailRowsContainer>
          <DetailRowsContainer id="utilizing-renderers-to-the-max">
            <H2>UTILIZING RENDERERS TO THE MAX</H2>
            <P>
              Beyond your capabilities to write <B>Brainfuck</B> code, your
              understanding of a <B>renderer</B> contract will level up your
              artistry with ABF.
            </P>
            <P>
              <B>Renderer</B> contracts, are, simply, contracts (or libraries)
              that receive bytes and output a new set of bytes, preferably in a
              image format. (But nothing in the spec stops you from writing
              renderers rendering to other formats)
            </P>
            <P>
              Like the ERC20 token spec, <B>ABF</B> utilizes a{' '}
              <Code>IRenderer</Code> spec created by the ABF Corp. Any contract
              written by anybody that follows this spec correctly can be
              utilized within the ABF protocol.
            </P>
            {/* <P>If you are interested in writing your own Renderer, consult <A>this</A> doc.</P> */}
            <P>
              The potential is limitless, Renderers can be written to ingest
              different colorspaces, produce animated SVGs, or can even produce
              a full HTML page.
            </P>
            <P>
              The <B>ABF</B> Corp has provided a "default" set of renderers that
              cover most bases; but dependent towards the demands of your
              vision, a more bespoke renderer can be created and utilized.
            </P>
            <P>
              A{' '}
              <A
                href={ROUTES.DOCS.RENDERERS}
                target="_blank"
                rel="noopener noreferrer"
              >
                registry
              </A>
              , maintained by the Corp, provides a up to date list of all known
              renderers, both written by the Corp and external users.
            </P>
            <P>
              We recommend learning in depth how a renderer works before you use
              it. Consult a renderer's{' '}
              <A
                href={`${ROUTES.RENDERER}/${deployments[CHAIN_ID].renderers['dotMatrix']}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                file
              </A>{' '}
              to learn how it can be utilized.
            </P>
          </DetailRowsContainer>
          <DetailRowsContainer id="configuring-input-bytes-seed">
            <H2>CONFIGURING INPUT BYTES + SEED</H2>
            <P>
              In <B>Brainfuck's</B> 8 opcodes, the <Code>,</Code> opcode stands
              to be one of the most powerful when utilized correctly.
            </P>
            <P>
              Whenever <Code>,</Code> is executed, a byte from the <B>input</B>{' '}
              is popped (read and removed from the array) and inputted to
              wherever the current pointer is.
            </P>
            <P>
              In layman terms, the <Code>,</Code> opcode allows a{' '}
              <B>Brainfuck</B> code to receive parameters.
            </P>
            <P>
              <B>ABF</B> provides 64 bytes (you can use <Code>,</Code> 64 times
              to read inputs) to your <Code>Brainfuck</Code> code.
            </P>
            <P>The 64 bytes provided are shaped as the following</P>
            <BlockCode>
              <P>
                <B>32</B> bytes set by user + <B>32</B> bytes of
                deterministically random bytes
              </P>
            </BlockCode>
            <P>
              You can configure the first 32 bytes in the NFT creator console.{' '}
              <B>
                Consider these bytes as "global" constants set by you to use
                within your code.
              </B>
            </P>
            <P>
              The next 32 bytes are the result of a <Code>keccak256</Code>{' '}
              hashing of the following input:
            </P>
            <BlockCode>
              <P>keccak256(seed, tokenId)</P>
            </BlockCode>
            <P>
              The <Code>seed</Code> is the source of random provided by you. The
              NFT creator console presets a random set of bytes, but you can
              change it to control the expected random bytes.{' '}
              <B>
                Consider these last 32 bytes as your <Code>Math.random</Code>.
              </B>
            </P>
            <P>
              <I>Why hash the tokenId?</I> ABF is fully capable of not just
              creating 1 of 1 NFTs. With a different source of random for each
              tokenId, you can easily create a generative art collection where
              each tokenId is not the same.
            </P>
            <P>
              With the use of input bytes, you can easily access numbers,
              colors, and a source of random in your <B>Brainfuck</B> code.
            </P>
          </DetailRowsContainer>
          <div
            style={{
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              margin: '24px 0 24px 0',
            }}
            id="contracts"
          />
          <H2 style={{ opacity: 0.2 }}>CONTRACTS</H2>
          <P>
            ABF is a conglomeration of a few contracts, some user written and
            some canonically deployed by the ABF Corp's <B>Board</B>.{' '}
            <Link href={ROUTES.DOCS.PROTOCOL} passHref>
              <A>Registry of canonical contracts.</A>
            </Link>
          </P>
          <DetailRowsContainer id={'renderers'}>
            <H2>RENDERERS</H2>
            <P>
              As described earlier, Renderers are contracts that ingest bytes
              and produce a deterministic output.
            </P>
            <P>
              <B>NOTE:</B> Renderer contracts have no understanding of "how" the
              inputted bytes are produced, as in they don't know about the{' '}
              <B>Brainfuck</B> code. They are only concerned with rendering the
              bytes into something.
            </P>
            <P>
              Renderers can be considered as <B>public goods</B>; anybody can
              utilize them in their ABF NFT.
            </P>
            <P>
              All Renderers compatible to the <B>ABF</B> protocol abides to the{' '}
              <Code>IRenderer</Code> interface:
            </P>
            <BlockCode>
              <P style={{ whiteSpace: 'pre-wrap' }}>
                {`
interface IRenderer is IERC165 {
  function owner() returns (address);
  function propsSize() returns (uint256);
  function additionalMetadataURI() returns (string);
  function renderAttributeKey() returns (string);
  function renderRaw(bytes calldata props) returns (string);
  function render(bytes calldata props) returns (string);
  function attributes(bytes calldata props) returns (string);
}
      `}
              </P>
            </BlockCode>
            {/* <P>
              A more complete spec can be found <A>here</A>
            </P> */}
            <P>
              <Code>owner</Code>: an address representing the creator of the
              renderer; useful to provide credit in a NFT to the renderer
              developer.
            </P>
            <P>
              <Code>propsSize</Code>: the expected size of the provided bytes
              for the renderer to function. Can be set to <Code>MAX_UINT</Code>{' '}
              if renderer can work with any amount of bytes.
            </P>
            <P>
              <Code>additionalMetadataURI</Code>: a ipfs file pointing to a json
              that provides documentation around using the renderer.{' '}
              <A
                target={'_blank'}
                href={getIPFSUrl(
                  'bafkreib7mkx3c7owpn5uwkqtviddhspu376t52u2wljh3o5gnz2kfmn7de',
                )}
              >
                Example
              </A>
            </P>
            <P>
              <Code>renderAttributeKey</Code>: the key within the NFT metadata
              JSON that will map to the output of <Code>renderRaw</Code>. (i.e{' '}
              <Code>image</Code>, <Code>animation_url</Code>)
            </P>
            <P>
              <Code>renderRaw</Code>: a more debug friendly render output,
              (usually means it is not base64 encoded). Useful to understand
              what the renderer is producing.
            </P>
            <P>
              <Code>render</Code>: typically calls <Code>renderRaw</Code>,
              produces the final consumable data used in the NFT metadata.
            </P>
            <P>
              <Code>attributes</Code>: provide a string (in JSON format) that
              will be added in the <Code>attributes</Code> part of a NFT
              metadata.
            </P>
            <P>
              When the ABF system becomes fully open source, we will release
              sample Renderer variants to help new developers.
            </P>
          </DetailRowsContainer>
          <DetailRowsContainer id="abf-nft">
            <H2>ABF NFT</H2>
            <P>
              The ABF NFT is a <Code>ERC721A</Code> derived +{' '}
              <Code>ERC2981</Code> (Royalty fees) compatible NFT implementation
              with a number of ABF specific configurable settings.
            </P>
            <P>
              At NFT creation you can configure the following (beyond the
              obvious need of the <B>Brainfuck</B> code and related
              data/settings):
            </P>
            <UL>
              <li>
                <Code>mintingSupply</Code>: the amount of this NFT that can be
                minted.
              </li>
              <li>
                <Code>price</Code>: the price (in wei) to pay to mint a single
                NFT in this collection.
              </li>
              <li>
                <Code>rendererRoyaltyFraction</Code>: the percentage of minting
                profits (in bps) directed to the renderer contract's{' '}
                <Code>owner</Code>.
              </li>
              <li>
                <Code>whitelistToken</Code>: A ERC721 or ERC20 token address, if
                set, enforces that minters must own <Code>whitelistToken</Code>{' '}
                to mint this ABF NFT.
              </li>
            </UL>
            <P>There is 3 main means to mint an ABF NFT:</P>
            <UL>
              <li>
                <Code>mint(address to, uint256 numMints)</Code>: standard
                minting function, can mint up to 6 in one call, pay the{' '}
                <Code>price</Code> or reverts.
              </li>
              <li>
                <Code>airdropMint(address[] to, uint256 numMintsEach)</Code>:
                admin only function, used to distribute NFTs in an airdrop
                scheme.
              </li>
              <li>
                <Code>mint(address to, uint256 numMints)</Code> (with
                whitelistToken set): behaves just live standard mint but needs
                minter to own the whitelistToken.
              </li>
            </UL>
            <P>
              <B>NOTE:</B> Both minting functions abide to the{' '}
              <Code>mintingSupply</Code>. There is no way to exceed the
              configured amount.
            </P>
            <P>
              The admin of the ABF NFT contract has a number of admin-only
              functions:
            </P>
            <UL>
              <li>
                <Code>setIsActive(bool isActive)</Code>: toggles if{' '}
                <Code>mint</Code> can be called or not.
              </li>
              <li>
                <Code>setSeed(bytes seed)</Code>: if at NFT creation, seed is 0,
                you can set the seed at a later point to mitigate rarity abusing
                minting.
              </li>
            </UL>
          </DetailRowsContainer>
          <DetailRowsContainer id="abf-nft-factory">
            <H2>ABF NFT FACTORY</H2>
            <P>
              The ABF NFT factory is a handy utility contract to easily (and
              cheaply) deploy a new ABF NFT.
            </P>
            <P>
              We <B>strongly</B> recommend using the ABF NFT factory over
              manually deploying an ABF NFT yourself. (If you are using the
              dapp, you are using factory). The factory saves you money, and
              allows for your NFT to be discoverable via the dapp.
            </P>
          </DetailRowsContainer>
          <DetailRowsContainer id="brainfuck-vm">
            <H2>BRAINFUCK VM</H2>
            <P>
              The library <Code>BrainFuckVM</Code> is the canonical{' '}
              <B>Brainfuck</B> interpreter utilized by the ABF protocol.
            </P>
            <P>
              There is one function, <Code>runBrainFuckCode</Code> that takes
              your code and input and runs it, returning the output.
            </P>
            <P>
              Consult the{' '}
              <Link passHref href={ROUTES.DOCS.BRAINFUCK}>
                <A>Brainfuck language</A>
              </Link>{' '}
              docs for more implementation details.
            </P>
          </DetailRowsContainer>
          <DetailRowsContainer id="brainfuck-uri-constructor">
            <H2>BRAINFUCK URI CONSTRUCTOR</H2>
            <P>
              The library <Code>BrainfuckVM</Code> is the canonical{' '}
              <B>Brainfuck</B> JSON constructor utility contract utilized by ABF
              protocol in the <Code>contractURI</Code> + <Code>tokenURI</Code>{' '}
              functions.
            </P>
          </DetailRowsContainer>
          <div
            style={{
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              margin: '24px 0 24px 0',
            }}
            id="other-resources"
          ></div>
          <H2 style={{ opacity: 0.2 }}>OTHER RESOURCES</H2>
          <DetailRowsContainer id="bf-resources">
            <H2>BF RESOURCES</H2>
            <P>
              While the ABF dapp is a complete experience to deploy an{' '}
              <B>ABF</B> NFT, we do not provide the best experience with working
              with <Code>Brainfuck</Code>. Here's some tooling created that can
              help:
            </P>
            <P>
              <A
                href={'https://copy.sh/brainfuck/'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Debugger + Runner
              </A>
            </P>
            <P>
              <A
                href={'https://gist.github.com/roachhd/dce54bec8ba55fb17d3a'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Guide to common design patterns in BF
              </A>
            </P>
            <P>
              <A
                href={'https://esolangs.org/wiki/Brainfuck_constants'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Generating numbers in Brainfuck
              </A>
            </P>
          </DetailRowsContainer>
          <DetailRowsContainer id="bf-links">
            <H2>LINKS</H2>
            <P>[COMING SOON]: GitHub open source dapp</P>
            <P>
              <A href={SUBGRAPH_LINK}>SUBGRAPH</A>
            </P>
          </DetailRowsContainer>
          <br />
          <br />
          <DocumentationFooter />
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};

const TableOfContents = () => {
  return (
    <TableOfContentsContainer>
      <P>
        <B>TABLE OF CONTENTS</B>
      </P>
      <LinkGroup>
        <Label>HIGH LEVEL CONCEPTS</Label>
        <TableOfContentsAnchor href={'#bf-code-to-art'}>
          BF CODE TO ART
        </TableOfContentsAnchor>
        <TableOfContentsAnchor href={'#utilizing-renderers-to-the-max'}>
          UTILIZING RENDERERS TO THE MAX
        </TableOfContentsAnchor>
        <TableOfContentsAnchor href={'#configuring-input-bytes-seed'}>
          CONFIGURING INPUT BYTES + SEED
        </TableOfContentsAnchor>
      </LinkGroup>
      <LinkGroup>
        <Label>CONTRACTS</Label>
        <TableOfContentsAnchor href={'#renderers'}>
          RENDERERS
        </TableOfContentsAnchor>
        <TableOfContentsAnchor href={'#abf-nft'}>ABF NFT</TableOfContentsAnchor>
        <TableOfContentsAnchor href={'#abf-nft-factory'}>
          ABF NFT FACTORY
        </TableOfContentsAnchor>
        <TableOfContentsAnchor href={'#brainfuck-vm'}>
          BRAINFUCK VM
        </TableOfContentsAnchor>
        <TableOfContentsAnchor href={'#brainfuck-uri-constructor'}>
          BRAINFUCK URI CONSTRUCTOR
        </TableOfContentsAnchor>
      </LinkGroup>
      <LinkGroup>
        <Label>OTHER RESOURCES</Label>
        <TableOfContentsAnchor href={'#bf-resources'}>
          BF RESOURCES
        </TableOfContentsAnchor>
        <TableOfContentsAnchor href={'#bf-links'}>LINKS</TableOfContentsAnchor>
      </LinkGroup>
    </TableOfContentsContainer>
  );
};
const TableOfContentsContainer = styled.div`
  > * + * {
    margin-top: 14px;
  }
`;

const LinkGroup = styled.div`
  > * + * {
    margin-top: 12px;
  }
`;

const TableOfContentsAnchor = styled(A)`
  display: block;
  cursor: pointer;
`;

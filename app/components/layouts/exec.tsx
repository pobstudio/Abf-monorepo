import React from 'react';
import { ROUTES } from '../../constants/routes';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { A, B, H1, I, Label, P } from '../texts';
import { DocumentationFooter } from './docs';

export const Exec: React.FC = () => {
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <DetailRowsContainer>
          <H1>ABF, IN SUMMARY</H1>
          <Label>
            RECORDING OF 001 WELCOMING THE FIRST CLASS OF CORP MEMBERS
          </Label>
          <P>
            <B>001:</B> Before we start, I'd like you to welcome you to the{' '}
            <B>ABF Corp.</B> If you haven't already, please complete the{' '}
            <A href={ROUTES.RECRUIT}>recruitment onboarding</A> to gain access
            to all aspects of ABF.
          </P>
          <P>
            <B>001:</B> I'm sure you have all read the ABF marketing materials.
            We get it, its dry as fuck. But if you are still here, that means we
            want you.
          </P>
          <P style={{ fontStyle: 'italic' }}>
            [001 proceeds to pull out the ABF recruitment brochure and reads]
          </P>
          <P>
            <B>001:</B> ABF is a{' '}
            <A
              href={'https://jacob.energy/hyperstructures.html'}
              target={'_blank'}
            >
              hyperstructure
            </A>{' '}
            to deploy, mint, and create on-chain generative art NFTs. No fees +
            fully self-controlled NFT contracts designed to last forever.
          </P>
          <P>
            <B>001:</B> What does all that crap mean? A <B>hyperstructure</B>, a
            system that operates without fail with no formal owner, or
            privileged party. <B>On-chain</B>, means all NFT metadata is
            generated in solidity with no dependence on any external
            environments. <B>Self-controlled?</B> Only the creator, not even us
            as members of the board can censor, burden any ABF NFT creation.
          </P>
          <P>
            Practically, this means anybody can hop on ABF and write some
            Brainfuck code and produce on-chain art.
          </P>
          <P>
            But really, beyond the atomic breakdowns of the composition of ABF,
            it's about something much more... simple.
          </P>
          <P>
            <I>
              [001 re-postures himself and leaves an uncomfortable silence in
              the air.]
            </I>
          </P>
          <P>
            <B>001:</B> ABF is about asking more from ourselves in the NFT
            industry. It's a big fuck you to the status quo.
          </P>
          <P>
            Fuck gated access to creation tools. Fuck 10% fee extraction. Fuck
            sticking IPFS in a NFT and calling it a day. Fuck random p5
            wave-function fidenza look-a-likes.
          </P>
          <P>
            Gen-art now has become all theatrics. It's about the "alpha" you
            have, the whitelist you are on. The marketing shill you can summon.
          </P>
          <P>"In it for the art"</P>
          <P>
            <I>[001 creates mocking air-quotes]</I>
          </P>
          <P>
            <B>001: </B>See, ABF breaks it all down. We slow it all down. No
            gates to ABF, no IPFS pngs, no DAO extracting fees or selling their
            blessings.
          </P>
          <P>
            To the fault of Brainfuck's esoterism, creating gen-art with ABF
            rewires the brain. You aren't thinking about token supplies, mint
            prices, or marketing. It's just about getting 8 op-codes working the
            way you want.
          </P>
          <P>It's kinda ... brain-fucky, but its meditative. *chuckles*</P>
          <P>
            <I>
              [001 appears to be lost in thought, before snapping back to life]
            </I>
          </P>
          <P>
            <B>001: </B>That's ABF. It's about creating art. It's about not
            creating any blocker to doing it. It's about celebrating the people
            who dare to do it.
          </P>
          <P>
            That is why we want you in the corp. Not to band together to pump a
            token, but to celebrate together. To struggle together. To ask each
            other to be better.
          </P>
          <P>
            I want to emphasize. ABF is what we make of it. There's no "roadmap"
            in any traditional sense. It's about us making it our home. This is
            as much your story as all of ours. As you learn more about the
            protocol, you will learn just how powerful the protocol is in the
            right pair of hands.
          </P>
          <P>
            Anyways, I welcome you to the corp. Please treat each other with
            respect. You are all here for the same reason.
          </P>
          <P>
            <I>[RECORDING OVER]</I>
          </P>
          <br />
          <br />
          <DocumentationFooter />
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};

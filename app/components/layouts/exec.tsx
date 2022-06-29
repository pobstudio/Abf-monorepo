import React from 'react';
import styled from 'styled-components';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { Label, Text, TextAnchor } from '../texts';

export const Exec: React.FC = () => {
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
      <JumbotronText style={{ fontSize: 24 }}>
        <strong>ABF, IN SUMMARY</strong>{' '}
      </JumbotronText>
      <Label>RECORDING OF 001 WELCOMING THE FIRST CLASS OF CORP MEMBERS</Label>

      <JumbotronText>
        <strong>001:</strong> Before we start, I'd like you to welcome you to
        the <strong>ABF Corp.</strong> If you haven't already, please complete
        the{' '}
        <TextAnchor href={'/recruitment'}>recruitment onboarding</TextAnchor> to
        gain access to all aspects of ABF.
      </JumbotronText>
      <JumbotronText>
        <strong>001:</strong> I'm sure you have all read the ABF marketing
        materials. We get it, its dry as fuck. But if you are still here, that
        means we want you.
      </JumbotronText>
      <JumbotronText style={{ fontStyle: 'italic' }}>
        [001 proceeds to pull out the ABF recruitment brochure and reads]
      </JumbotronText>
      <JumbotronText>
        <strong>001:</strong> ABF is a <TextAnchor>hyperstructure</TextAnchor>{' '}
        to deploy, mint, and create on-chain generative art NFTs. No fees +
        fully self-controlled NFT contracts designed to last forever.
      </JumbotronText>
      <JumbotronText>
        <strong>001:</strong> What does all that crap mean? A{' '}
        <strong>hyperstructure</strong>, a system that operates without fail
        with no formal owner, or privileged party. <strong>On-chain</strong>,
        means all NFT metadata is generated in solidity with no dependence on
        any external environments. <strong>Self-controlled?</strong> Only the
        creator, not even us as members of the board can censor, burden any ABF
        NFT creation.
      </JumbotronText>
      <JumbotronText>
        Practically, this means anybody can hop on ABF and write some BrainFuck
        code and produce on-chain art.
      </JumbotronText>
      <JumbotronText>
        But really, beyond the atomic breakdowns of the composition of ABF, it's
        about something much more... simple.
      </JumbotronText>
      <JumbotronText style={{ fontStyle: 'italic' }}>
        [001 re-postures himself and leaves an uncomfortable silence in the
        air.]
      </JumbotronText>
      <JumbotronText>
        <strong>001:</strong> ABF is about asking more from ourselves in the NFT
        industry. It's a big fuck you to the status quo.
      </JumbotronText>
      <JumbotronText>
        Fuck gated access to creation tools. Fuck 10% fee extraction. Fuck
        sticking IPFS in a NFT and calling it a day. Fuck random p5
        wave-function fidenza look-a-likes.
      </JumbotronText>
      <JumbotronText>
        Gen-art now has become all theatrics. It's about the "alpha" you have,
        the whitelist you are on. The marketing shill you can summon.
      </JumbotronText>
      <JumbotronText>"In it for the art"</JumbotronText>
      <JumbotronText style={{ fontStyle: 'italic' }}>
        {' '}
        [001 creates mocking air-quotes]
      </JumbotronText>
      <JumbotronText>
        <strong>001: </strong>See, ABF breaks it all down. We slow it all down.
        No gates to ABF, no IPFS pngs, no DAO extracting fees or selling their
        blessings.
      </JumbotronText>
      <JumbotronText>
        To the fault of BrainFuck's esoterism, creating gen-art with ABF rewires
        the brain. You aren't thinking about token supplies, mint prices, or
        marketing. It's just about getting 8 op-codes working the way you want.
      </JumbotronText>
      <JumbotronText>
        It's kinda ... brain-fucky, but its meditative. *chuckles*
      </JumbotronText>
      <JumbotronText style={{ fontStyle: 'italic' }}>
        {' '}
        [001 appears to be lost in thought, before snapping back to life]
      </JumbotronText>
      <JumbotronText>
        <strong>001: </strong>That's ABF. It's about creating art. It's about
        not creating any blocker to doing it. It's about celebrating the people
        who dare to do it.
      </JumbotronText>
      <JumbotronText>
        That is why we want you in the corp. Not to band together to pump a
        token, but to celebrate together. To struggle together. To ask each
        other to be better.
      </JumbotronText>
      <JumbotronText>
        I want to emphasize. ABF is what we make of it. There's no "roadmap" in
        any traditional sense. It's about us making it our home. This is as much
        your story as all of ours. As you learn more about the protocol, you
        will learn just how powerful the protocol is in the right pair of hands.
      </JumbotronText>
      <JumbotronText>
        Anyways, I welcome you to the corp. Please treat each other with
        respect. You are all here for the same reason.
      </JumbotronText>
      <JumbotronText style={{ fontStyle: 'italic' }}>
        {' '}
        [RECORDING OVER]
      </JumbotronText>
      <JumbotronText>
        Please continue orientation by reading exhaustively through{' '}
        <TextAnchor href={'/origins'}>ORIGINS</TextAnchor>.
      </JumbotronText>
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

import React from 'react';
import styled from 'styled-components';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { Label, Text } from '../texts';

export const Origins: React.FC = () => {
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
        <strong>ORIGINS OF ABF</strong>{' '}
      </JumbotronText>
      <Label>CHAT LOGS BETWEEN 001 AND 002 DURING EARLY ABF PRODUCTION</Label>
      <JumbotronText>
        <strong>002:</strong> Man, I really like this.
      </JumbotronText>
      <JumbotronText>
        <strong>001:</strong> Haha, good that you like it. The concept is kind
        of wild, but in some ways the wild creates some seriously interesting
        potential.
      </JumbotronText>
      <JumbotronText>
        <strong>002:</strong> Yea, I can see that. So what's it called?
      </JumbotronText>
      <JumbotronText>
        <strong>001:</strong> Called <strong>ABF</strong>. Absolute Brain Fuck.
        Because you know... its an absolute brain fuck.
      </JumbotronText>
      <JumbotronText>
        <strong>002:</strong> We gotta lean into it. ABF only works in
        absurdity.
      </JumbotronText>
      <JumbotronText>
        <strong>001:</strong> 100%. Every feature/descision of ABF is designed
        to nurture the absurdity. No blockers to enjoying ABF. If you dare to,
        you deserve to.
      </JumbotronText>
      <JumbotronText>
        No fees, no whitelist, no NFT access token. Just your wits, and the
        willpower to use it.
      </JumbotronText>
      <JumbotronText>
        <strong>002:</strong> You think alot of people will use ABF?
      </JumbotronText>
      <JumbotronText>
        <strong>001:</strong> Honestly, no clue the amount of people. But I know
        there will be people who love this stuff. It builds on the small-code
        movement, the on-chain art movement, and has the right meme-nomics.
      </JumbotronText>
      <JumbotronText>
        I see it like an artisan, in wood, a wood worker. He or she uses
        powertools, a CNC to perform his/her craft. He or she is good at it. But
        say a client comes around and asks this wood worker to make a dining
        table.
      </JumbotronText>
      <JumbotronText>
        The client has one constraint:{' '}
        <strong>"No powertools, just handtools"</strong>.
      </JumbotronText>
      <JumbotronText>
        There will be wood workers who hear that and shivers, and turn it down.
        But I believe there will be wood workers that hears that and is
        titillated.
      </JumbotronText>
      <JumbotronText>
        "Hell yea" that wood worker would say. The challenge would not deter the
        passion to the craft. If anything, it brings a completely new dimension
        to it.
      </JumbotronText>
      <JumbotronText>
        <strong>002:</strong> I like that metaphor. I see how ABF is that but
        for generative art.
      </JumbotronText>
      <JumbotronText>
        <strong>001:</strong> Yea, you see these people in different fields.
        Gamers who master speed runs, developers only using ssh + vim, a
        car-mechanic working on restoring a car. Its about the craft, not just
        the product.
      </JumbotronText>
      <JumbotronText>
        ABF is that but for all of NFTs. ABF is designed with so many layers of
        modularity + minimalism; it is capable of so many things.
      </JumbotronText>
      <JumbotronText>
        With such potential, again, we can't block people. That's why its a
        hyperstructure. That's why we need to let a community organically
        develop.
      </JumbotronText>
      <JumbotronText>
        <strong>002:</strong> The ABF Corp.
      </JumbotronText>
      <JumbotronText>
        <strong>001:</strong> What?
      </JumbotronText>
      <JumbotronText>
        <strong>002:</strong> Thats the name of the community, Corp like the
        Marine Corp, not corporation. A community about the comradre of
        collective brain-fucking.
      </JumbotronText>
      <JumbotronText>
        <strong>001:</strong> I like that. The ABFC.{' '}
        <strong>"VIRES IN STRUCTURA"</strong>. Strength in structures. ABF is a
        hyper-structure, but so will this community.
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

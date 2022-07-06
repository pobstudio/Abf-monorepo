import { ADDRESS_REGEX } from '@abf-monorepo/types';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { PageDiv } from '../../components/divs';
import { ArrowIcon } from '../../components/icons/arrow';
import { RendererDetails } from '../../components/layouts/rendererDetails';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';
import { Label } from '../../components/texts';
import { ROUTES } from '../../constants/routes';

const RendererPage: NextPage = () => {
  const router = useRouter();
  const rendererAddress = useMemo(() => {
    if (!router.query.address) {
      return undefined;
    }
    if (
      typeof router.query.address !== 'string' ||
      !ADDRESS_REGEX.test(router.query.address)
    ) {
      return undefined;
    }
    return router.query.address as string;
  }, [router]);

  return (
    <PageDiv>
      <Header />
      <Link passHref href={ROUTES.DOCS.RENDERERS}>
        <BackButton as={'a'}>
          <ArrowIcon />
          &nbsp;&nbsp;VIEW ALL
        </BackButton>
      </Link>
      <br />
      <br />
      <RendererDetails address={rendererAddress} />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(RendererPage);

const BackButton = styled(Label)`
  text-decoration: none;
  svg {
    transform: translateY(1.5px);
  }
`;

import { ADDRESS_REGEX } from '@abf-monorepo/types';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import React from 'react';
import { Render } from '../components/renders';
import { useRendererMetadataStubByProvider } from '../hooks/useRenderer';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { output, renderer } = context.query;
  console.log(output, renderer, 'output and renderer');

  if (!output || typeof output !== 'string') {
    return {
      notFound: true,
    };
  }

  if (
    !renderer ||
    typeof renderer !== 'string' ||
    !ADDRESS_REGEX.test(renderer)
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      renderer,
      output,
    },
  };
};

const PreviewPage: NextPage = (
  payload: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { renderer, output } = payload;
  const rendererMetadata = useRendererMetadataStubByProvider(renderer);
  return (
    <>
      {output && renderer && rendererMetadata && (
        <Render output={output} rendererMetadata={rendererMetadata} />
      )}
    </>
  );
};

export default React.memo(PreviewPage);

import React from 'react';
import { useCollectionsByOwner } from '../../../hooks/useCollections';
import { DetailRowsContainer } from '../../details/rows';
import { H1, P } from '../../texts';
import { CollectionsGrid } from './grid';

export const Collections: React.FC<{ address: string | undefined }> = ({
  address,
}) => {
  const collections = useCollectionsByOwner(address);
  return (
    <>
      <DetailRowsContainer>
        <div>
          <H1 style={{ opacity: 0.2 }}>ABF COLLECTIONS</H1>
        </div>
        <P>
          These are Brainfuck NFT Collections created via the Project Builder.
        </P>
        <P style={{ opacity: 0.2 }}>
          {
            '++[---------->+<]>.+[--->++++<]>+.+++++.++++++.[++>---<]>--.------------.---[->++++<]>-.-----------.-------.--[--->+<]>---.-------------.-[->+++<]>.------------.+[->+++<]>++.[--->+<]>+.--------.----.+++.+++.-------------.--[--->+<]>-.[->++<]>+.+.++++.'
          }
        </P>
      </DetailRowsContainer>
      <CollectionsGrid collections={collections} />
    </>
  );
};

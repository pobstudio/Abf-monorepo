import Link from 'next/link';
import { FC, useState } from 'react';
import { ROUTES } from '../../../constants/routes';
import { useTutorialContext } from '../../../contexts/tutorial';
import { DetailRow } from '../../details/rows';
import { Flex, FlexEnds } from '../../flexs';
import { InputWell, TextArea } from '../../inputs/input';
import { Code, Label, LabelAnchor, P, Text } from '../../texts';
import { Tooltip } from '../../tooltip';

export const BasicEditor: FC = () => {
  const { code, setCode, onInputConstantsChange, inputConstants } =
    useTutorialContext();
  const [constants, setConstants] = useState('');
  return (
    <>
      <FlexEnds>
        <Label>EDITOR</Label>
        <Link href={ROUTES.DOCS.BRAINFUCK} passHref>
          <LabelAnchor target="_blank" rel="noopener noreferrer">
            BRAINFUCK DOCS
          </LabelAnchor>
        </Link>
      </FlexEnds>
      <InputWell>
        <TextArea
          value={code ?? ''}
          onChange={(e) => setCode(e.target.value)}
          style={{ minHeight: 240 }}
          placeholder="-[--->+<]>-.[---->+++++<]>-.+.++++++++++.+[---->+<]>+++.-[--->++<]>-.++++++++++.+[---->+<]>+++.[-->+++++++<]>.++.-------------.[--->+<]>---..+++++.-[---->+<]>++.+[->+++<]>.++++++++++++..---.[-->+<]>--------."
        />
      </InputWell>
      <Flex style={{ paddingTop: 82 }}>
        <Text style={{ marginRight: 6 }}>INPUT TO BF CODE</Text>
        <Tooltip direction={'left'}>
          <P>
            Input in Brainfuck is read via the <Code>,</Code> operator. Provide
            up to 32 bytes; another 32 pseudo-random bytes will be appended for
            a total of 64 bytes.
          </P>
        </Tooltip>
      </Flex>
      <InputWell>
        <TextArea
          value={constants ?? ''}
          onChange={(e) => {
            onInputConstantsChange(e.target.value);
            setConstants(e.target.value);
          }}
          style={{ minHeight: 40 }}
          placeholder="0xabcd...decd"
        />
      </InputWell>
      <DetailRow>
        {['VALID INPUT CONSTANTS', !!inputConstants ? 'TRUE' : 'FALSE']}
      </DetailRow>
    </>
  );
};

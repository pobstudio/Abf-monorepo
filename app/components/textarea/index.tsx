import ReactTextareaAutocomplete, {
  TriggerType,
} from '@webscopeio/react-textarea-autocomplete';
import { search } from 'fast-fuzzy';
import { ComponentPropsWithRef, FC, useMemo } from 'react';
import {
  createTemplateInsert,
  TEMPLATE_INSERT_OPCODE_START,
} from '../../utils/brainFuck/template/constants';
import { B, P, Text } from '../texts';

import '@webscopeio/react-textarea-autocomplete/style.css';
import styled from 'styled-components';
import { SML_DOCS } from '../../data/mixinDocs';
import { Flex, FlexEnds } from '../flexs';

const Loading = () => <div></div>;
const Item = ({ entity }: any) => {
  console.log(entity);
  return (
    <div style={{ padding: 8 }}>
      <FlexEnds>
        <Flex>
          <Text>
            <B>{entity.label}</B>
          </Text>
          {SML_DOCS[entity.label].params.length !== 0 && (
            <Text>
              :
              {SML_DOCS[entity.label].params
                .map((p) => p.label + (p.isOptional ? '?' : ''))
                .join(':')}
            </Text>
          )}
        </Flex>
      </FlexEnds>
      <P style={{ opacity: 0.4 }}>
        data ptr after: {SML_DOCS[entity.label].dataPointerLocationDescription}
      </P>
    </div>
  );
};

interface ItemProps {
  label: string;
  richLabel: string;
}

const TextAreaGlobalStyles = styled.div`
  width: 100%;
  .rta__entity--selected {
    background: rgba(0, 0, 0, 0.05);
    color: black;
  }
`;

export const BrainfuckTextArea: FC<ComponentPropsWithRef<'textarea'>> = ({
  placeholder,
  style,
  disabled,
  value,
  onChange,
}) => {
  const trigger: TriggerType<ItemProps> = useMemo(() => {
    return {
      [TEMPLATE_INSERT_OPCODE_START]: {
        dataProvider: (token: any) => {
          console.log(token);
          const prunedToken = token.slice(1);
          const fuzzyResults = search(prunedToken, Object.keys(SML_DOCS));
          return fuzzyResults.map((r) => ({
            label: r,
            richLabel: createTemplateInsert(
              r,
              SML_DOCS[r].params.map(
                (p) => p.label + (p.isOptional ? '?' : ''),
              ),
            ),
          }));
        },
        component: Item,
        output: (item: ItemProps) => item.richLabel,
      },
    };
  }, []);

  return (
    <TextAreaGlobalStyles>
      <ReactTextareaAutocomplete
        disabled={disabled}
        value={value}
        onChange={onChange}
        style={{
          fontSize: 12,
          background: 'none',
          border: 'none',
          borderRadius: 'none',
          outline: 'none',
          overflow: 'hidden',
          ...style,
        }}
        dropdownStyle={{
          zIndex: 1000,
        }}
        placeholder={placeholder}
        loadingComponent={Loading}
        trigger={trigger as any}
      />
    </TextAreaGlobalStyles>
  );
};

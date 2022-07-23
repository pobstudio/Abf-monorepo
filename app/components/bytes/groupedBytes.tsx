import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { RendererAdditionalMetadataByteGroup } from '../../types';
import { P } from '../texts';

export interface GroupedBytesProps {
  output?: string;
  byteGroups?: RendererAdditionalMetadataByteGroup[];
  showBytesLength?: boolean;
  showFocusedGroupingIndex?: boolean;
  focusedByteGroupingIndex?: number | null;
  setFocusedByteGroupingIndex?: (index: number | null) => void;
}

export const GroupedBytesWithHoverState: FC<
  Omit<
    Omit<GroupedBytesProps, 'focusedByteGroupingIndex'>,
    'setFocusedByteGroupingIndex'
  >
> = ({ output, byteGroups, showBytesLength = true }) => {
  const [focusedByteGroupingIndex, setFocusedByteGroupingIndex] = useState<
    null | number
  >(null);
  return (
    <GroupedBytes
      byteGroups={byteGroups}
      showBytesLength={showBytesLength}
      output={output}
      focusedByteGroupingIndex={focusedByteGroupingIndex}
      setFocusedByteGroupingIndex={setFocusedByteGroupingIndex}
    />
  );
};

export const GroupedBytes: FC<GroupedBytesProps> = ({
  output,
  byteGroups,
  showFocusedGroupingIndex = true,
  showBytesLength = true,
  focusedByteGroupingIndex,
  setFocusedByteGroupingIndex,
}) => {
  const groupedOutputBytesAndLabels = useMemo(():
    | [string, string | undefined][]
    | undefined => {
    if (!output) {
      return undefined;
    }
    const groupedBytesAndLabels: [string, string | undefined][] = [];
    if (!!byteGroups && byteGroups.length !== 0) {
      let acc = 0;
      for (const { numGroups, groupBytesIn, label } of byteGroups) {
        const numericalNumGroups = (() => {
          if (numGroups === 'infinity') {
            return Infinity;
          }
          if (typeof numGroups === 'string') {
            if (numGroups.startsWith('variable')) {
              const params = numGroups.split('.');
              const index = parseInt(params[1] ?? '');
              if (!!index || isNaN(index)) {
                return 0;
              }
              return parseInt(output[index], 16);
            }
            if (!isNaN(parseInt(numGroups))) {
              return parseInt(numGroups);
            }
          }
          return numGroups;
        })();
        for (
          let x = 0, i = 2 + acc;
          i < output.length && x < numericalNumGroups;
          ++x
        ) {
          groupedBytesAndLabels.push([
            output.slice(i, i + groupBytesIn * 2),
            label,
          ]);
          i += groupBytesIn * 2;
          acc += groupBytesIn * 2;
        }
      }
    } else {
      groupedBytesAndLabels.push([output.slice(2), undefined]);
    }
    return groupedBytesAndLabels;
  }, [output, byteGroups]);

  if (!output || !groupedOutputBytesAndLabels) {
    return <P>-</P>;
  }

  return (
    <P
      onMouseLeave={() => setFocusedByteGroupingIndex?.(null)}
      style={{
        position: 'relative',
        lineBreak:
          groupedOutputBytesAndLabels?.length === 1 ? 'anywhere' : undefined,
      }}
    >
      {(
        <>
          <HexStringHeaderHanger>0x</HexStringHeaderHanger>
          <GroupedBytesContainer>
            {groupedOutputBytesAndLabels.map((b, i) => {
              return (
                <GroupedBytesSpan
                  onMouseEnter={() => setFocusedByteGroupingIndex?.(i)}
                  key={`grouped-bytes-${i}`}
                >
                  {b[0]}{' '}
                </GroupedBytesSpan>
              );
            })}
          </GroupedBytesContainer>
          <span style={{ opacity: 0.2 }}>
            {showBytesLength ? `${(output.length - 2) / 2} BYTES` : ''}
            <strong
              style={{
                opacity:
                  focusedByteGroupingIndex !== null &&
                  focusedByteGroupingIndex !== undefined
                    ? 1
                    : 0,
              }}
            >
              {focusedByteGroupingIndex !== null &&
              focusedByteGroupingIndex !== undefined
                ? ` • ${
                    showFocusedGroupingIndex ? focusedByteGroupingIndex + 1 : ''
                  } ${
                    groupedOutputBytesAndLabels[focusedByteGroupingIndex][1]
                      ? `(${groupedOutputBytesAndLabels[focusedByteGroupingIndex][1]})`
                      : ''
                  }`
                : ` • hover`}
            </strong>
          </span>
        </>
      ) ?? '-'}
    </P>
  );
};

const GroupedBytesSpan = styled.span``;

const GroupedBytesContainer = styled.span`
  > ${GroupedBytesSpan} + ${GroupedBytesSpan} {
    // margin-left: 4px;
  }
`;

const HexStringHeaderHanger = styled.span`
  position: absolute;
  padding-right: 8px;
  // top: 0;
  right: 100%;
  line-break: strict;
  color: rgba(0, 0, 0, 0.1);
`;

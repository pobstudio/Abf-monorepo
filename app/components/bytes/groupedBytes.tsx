import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { RendererAdditionalMetadataByteGroup } from '../../types';
import { P } from '../texts';

export interface GroupedBytesProps {
  output?: string;
  byteGroups?: RendererAdditionalMetadataByteGroup[];
  showBytesLength?: boolean;
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
      for (const { numGroups, groupBytesIn, label } of byteGroups) {
        for (
          let x = 0, i = 2;
          i < output.length &&
          x < (numGroups === 'infinity' ? Infinity : numGroups);
          ++x
        ) {
          groupedBytesAndLabels.push([
            output.slice(i, i + groupBytesIn * 2),
            label,
          ]);
          i += groupBytesIn * 2;
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
            <strong>
              {focusedByteGroupingIndex !== null &&
              focusedByteGroupingIndex !== undefined
                ? ` • ${focusedByteGroupingIndex + 1} ${
                    groupedOutputBytesAndLabels[focusedByteGroupingIndex][1]
                      ? `(${groupedOutputBytesAndLabels[focusedByteGroupingIndex][1]})`
                      : ''
                  }`
                : undefined}
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

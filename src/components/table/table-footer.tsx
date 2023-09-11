import React, {useMemo} from 'react';

import styled from 'styled-components/native';

import {Flex} from '../flex';
import {Line} from '../line';

interface TableFooterProps {
  children: React.ReactNode;
  padding?: number;
  alt?: boolean;
}

const StyledContainer = styled(Flex)<{
  paddingKey: number;
  alt: boolean;
}>`
  background-color: ${(props) => (props.alt ? props.theme.colors.white : props.theme.colors.lightGrey1)};
  padding: ${(props) => props.theme.space[props.paddingKey]}px 0;
`;

const StyledFooterChild = styled(Flex)<{
  paddingKey: number;
  last: boolean;
}>`
  flex: 1;
  padding-left: ${(props) => props.theme.space[props.paddingKey]}px;
  padding-right: ${(props) => (props.last ? props.theme.space[props.paddingKey] : 0)}px;
`;

const TableFooter = ({children, padding = 2, alt}: TableFooterProps) => {
  const activeChildren = useMemo(
    () =>
      React.Children.toArray(children)
        .filter((c) => c)
        .map((c, index) => ({
          el: c,
          key: index,
        })),
    [children],
  );

  return (
    <Flex flexDirection="column">
      {alt ? null : <Line size="sm" />}

      <StyledContainer alignItems="center" flexGrow={0} paddingKey={padding} alt={!!alt} flexDirection="row">
        {activeChildren.map((child, index) => {
          if (!child) return null;

          return (
            <StyledFooterChild paddingKey={padding} last={index === activeChildren.length - 1} key={child.key}>
              {child.el}
            </StyledFooterChild>
          );
        })}
      </StyledContainer>
    </Flex>
  );
};

export {TableFooter};

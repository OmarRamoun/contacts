import * as React from 'react';

import {theme} from '@styles';

import {Box} from '../box';
import type {IconList} from '../icon';
import {Table} from '../table/table';
import {TableBody} from '../table/table-body';
import {TableFooter} from '../table/table-footer';
import {TableHeader} from '../table/table-header';
import {Typography} from '../typography';

export interface ModalContentProps {
  children: React.ReactElement;
  heading: string;
  onClose?: () => void;
  footerComponent?: JSX.Element;
  noPadding?: boolean;
  showBottomBorder?: boolean;
  headerIcon?: IconList;
  minHeight?: boolean;
  maxWidth?: number;
  width?: string | number;
  scrollHeight?: number;
}

const ModalContent = ({
  children,
  heading,
  onClose,
  footerComponent,
  noPadding,
  showBottomBorder,
  headerIcon,
  minHeight,
  maxWidth,
  scrollHeight,
  width = 'modalSmallWidth',
}: ModalContentProps) => (
  <Box width={width} minHeight={minHeight ? theme.sizes.modalLargerHeight : 0} maxWidth={maxWidth}>
    <Table rounded outlined bg="white">
      <TableHeader
        alt
        showBottomBorder={showBottomBorder}
        left={
          <TableHeader.LeftAccessory headerIcon={headerIcon}>
            <Typography textStyle="h3" color="darkBlue">
              {heading}
            </Typography>
          </TableHeader.LeftAccessory>
        }
        onAction={onClose}
        actionIcon="cross"
      />

      <TableBody p={noPadding ? 0 : '4'} height={scrollHeight} shouldScroll={!!scrollHeight}>
        {children}
      </TableBody>

      {footerComponent ? (
        <TableFooter alt padding={0}>
          {footerComponent}
        </TableFooter>
      ) : null}
    </Table>
  </Box>
);

export {ModalContent};

import React from 'react';

import {Icon} from '../icon';
import type {IconList} from '../icon';
import {StandardModal} from '../modal/standard-modal';
import {Table} from '../table/table';
import {TableBody} from '../table/table-body';
import {TableFooter} from '../table/table-footer';
import {TableHeader} from '../table/table-header';
import type {TableHeaderProps} from '../table/table-header';
import {Typography} from '../typography';

interface FormModalProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
  rightStaticIcon?: IconList;
  footer?: React.ReactNode;
  headerProps?: Partial<TableHeaderProps>;
}

const FormModal = ({show, title, rightStaticIcon, footer, children, headerProps}: FormModalProps) => (
  <StandardModal show={show}>
    <Table backgroundColor="white">
      <TableHeader
        alt
        left={
          <TableHeader.LeftAccessory>
            <Typography textStyle="h3" color="darkBlue">
              {title}
            </Typography>
          </TableHeader.LeftAccessory>
        }
        right={
          rightStaticIcon ? (
            <TableHeader.RightAccessory>
              <Icon name={rightStaticIcon} />
            </TableHeader.RightAccessory>
          ) : null
        }
        {...headerProps}
      />

      <TableBody p="4">{children}</TableBody>
      {footer ? <TableFooter>{footer}</TableFooter> : null}
    </Table>
  </StandardModal>
);

export {FormModal};

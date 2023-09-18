import React from 'react';

import {Button} from './button/button';
import {Flex} from './flex';
import {Table} from './table/table';
import {TableFooter} from './table/table-footer';
import {TableHeader} from './table/table-header';
import {Typography} from './typography';

interface ConfirmBoxProps {
  onOk: () => void;
  onCancel: () => void;
  headerTitle?: string;
  bodyTitle?: string;
}

const ConfirmBox = ({onOk, onCancel, headerTitle, bodyTitle}: ConfirmBoxProps) => (
  <Table>
    <TableHeader
      left={
        <TableHeader.LeftAccessory>
          <Typography textStyle="bodyBold" color="darkBlue">
            {headerTitle || 'Are you sure want to close?'}
          </Typography>
        </TableHeader.LeftAccessory>
      }
      actionIcon="plus"
    />

    <Flex backgroundColor="white" px={4} py={4} minWidth={50}>
      <Flex mb={4}>
        <Typography textStyle="small" color="black">
          {bodyTitle || 'All information will be lost.'}
        </Typography>
      </Flex>
    </Flex>

    <TableFooter>
      <Button depth={4} onPress={onOk}>
        Ok
      </Button>

      <Button depth={4} type="primaryDestructive" onPress={onCancel}>
        Cancel
      </Button>
    </TableFooter>
  </Table>
);

export {ConfirmBox};

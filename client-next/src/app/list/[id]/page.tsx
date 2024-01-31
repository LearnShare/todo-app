import React from 'react';
import {
  Flex,
  Heading,
  IconButton,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/themes';
import {
  ArrowLeftIcon,
  DotsVerticalIcon,
} from '@radix-ui/react-icons';

import {
  TodoLayout,
} from '@/components';

interface PageListProps {
  params: {
    id: string,
  };
}

function PageList({
  params,
}: PageListProps) {
  return (
    <TodoLayout>
      <Flex
          direction="row"
          gap="3">
        <IconButton
            variant="outline">
          <ArrowLeftIcon
              width="18"
              height="18" />
        </IconButton>
        <Flex
            grow="1"
            align="center">
          <Heading
              size="4"
              weight="medium">{ params.id }</Heading>
        </Flex>
        <DropdownMenuRoot>
          <DropdownMenuTrigger>
            <IconButton
                variant="outline">
              <DotsVerticalIcon />
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Mark all Done</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </Flex>
    </TodoLayout>
  );
}

export default PageList;

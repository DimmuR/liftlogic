import {
  Header,
  Group,
  Box,
} from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle/ColorSchemeToggle';
import {
  IconWeight,
} from '@tabler/icons-react';

export function LiftLogicHeader() {

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Group>
            <IconWeight size={20} stroke={1.5}/>
            <span>Lift Logic</span>
          </Group>

          <Group>
            <ColorSchemeToggle/>
          </Group>
        </Group>
      </Header>
    </Box>
  );
}
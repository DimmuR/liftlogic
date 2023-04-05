import {createStyles, rem, TextInput, Button, Group, Text} from '@mantine/core';
import { useForm } from '@mantine/form';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },

  button: {
    marginTop: '1em',
    position: 'relative',
    transition: 'background-color 150ms ease',
  },
}));

function getWeights(values) {
  const weights = []

  const weightValues = [25, 20, 15, 10, 5, 2.5, 1.25];

  weightValues.forEach(weight => {
    const count = parseInt(values[`${weight}kg`.replace('.', '_')]);
    if (count) {
      weights.push(...Array(count).fill(weight));
    }
  });

  return weights
}

export function WeightConfigurator({weightConfigHandler, initial}) {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      ...initial,
      '25kg': 1,
      '20kg': 2,
      '15kg': 1,
      '10kg': 1,
      '5kg': 1,
      '2_5kg': 1,
      '1_25kg': 1,
    },

    transformValues: (values) => ({
      weight: values.weight,
      clamps: values.clamps,
      bar: values.bar,
      availableWeights: getWeights(values),
    }),
  });

  return (
    <div>
      <Text color="dimmed" align="left" size="xl" mx="auto" mt="xl">Basic configuration</Text>
    <Group  mt="lg" >
      <TextInput label="Weight to split" placeholder="Weight to split" classNames={classes} {...form.getInputProps('weight')}/>
    </Group>
    <Group  mt="lg" >
      <TextInput label="Bar weight" placeholder="Bar weight" classNames={classes} {...form.getInputProps('bar')}/>
      <TextInput label="Clamps weight" placeholder="Clamps weight" classNames={classes} {...form.getInputProps('clamps')}/>
    </Group>
      <hr/>
      <Text color="dimmed" align="left" size="lg" mx="auto" mt="xl">Available weights</Text>
      <Group  mt="lg" spacing='lg'>
        <TextInput label="25kg" placeholder="amount of 25kg weight" classNames={classes} {...form.getInputProps('25kg')}/>
        <TextInput label="20kg" placeholder="amount of 20kg weight" classNames={classes} {...form.getInputProps('20kg')}/>
        <TextInput label="15kg" placeholder="amount of 15kg weight" classNames={classes} {...form.getInputProps('15kg')}/>
        <TextInput label="10kg" placeholder="amount of 10kg weight" classNames={classes} {...form.getInputProps('10kg')}/>
        <TextInput label="5kg" placeholder="amount of 5kg weight" classNames={classes} {...form.getInputProps('5kg')}/>
        <TextInput label="2.5kg" placeholder="amount of 2.5kg weight" classNames={classes} {...form.getInputProps('2_5kg')}/>
        <TextInput label="1.25kg" placeholder="amount of 1.25kg weight" classNames={classes} {...form.getInputProps('1_25kg')}/>
      </Group>
      <Group  mt="lg" >

      <Button title="Calculate" onClick={() => weightConfigHandler(form.getTransformedValues(form.values))}>Calculate</Button>
      <Button title="Reset" onClick={() => form.reset()}>Reset</Button>
      </Group>
    </div>
  );
}

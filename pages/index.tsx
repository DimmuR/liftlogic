import { LiftLogicHeader } from '../components/LiftLogicHeader'
import { WeightConfigurator } from "../components/WeightConfigurator/WeightConfigurator";
import { WeightResultBox } from "../components/WeightResultBox/WeightResultBox";
import { WeightDrawBox } from "../components/WeightDrawBox/WeightDrawBox";
import { Text } from '@mantine/core';

import { Container, Grid, SimpleGrid } from '@mantine/core';
import { useState } from 'react';

interface WeightConfig {
  bar: number,
  clamps: number,
  weight: number,
  availableWeights: number[],
}

interface WeightData {
    weight: number,
    remaining: number,
    weights: number[],
    weightToSplit: number;
    error: string,
}
function calculateWeight(weightConfig: WeightConfig) {
  const weightToSplit = weightConfig.weight - weightConfig.bar - 2* weightConfig.clamps;
  let remaining = weightToSplit;
  const weights = [];
  let error = '';

  let safety = 10;
  while (remaining > 0 && safety > 0) {
    const remainingPart = remaining / 2;

    for (const idx in weightConfig.availableWeights) {
      const i = weightConfig.availableWeights[idx];
      if (i <= remainingPart) {
        weights.push(i);
        remaining -= 2*i;
        weightConfig.availableWeights.splice(Number(idx), 1)
        break;
      }
    }
    safety -= 1;
  }
  if (weightToSplit <= 0 ) {
    error = "You can't split negative weight"
  }

  if (remaining > 0) {
    error = `Could not split those weights - remaining ${remaining} kg`
  }

  return {weight: weightConfig.weight, remaining, weights, weightToSplit, error}
}


export default function HomePage() {
   const  [weightConfig, setWeightConfig ] = useState<WeightConfig>({bar: 20, clamps: 0.25, weight: 0, availableWeights: []})
   const  [weightData, setWeightData ] = useState<WeightData>({weight: 0, remaining: 0, weights: [], weightToSplit: 0, error: ''})

  const updateWeightConfig = (weightConfig) => {
    setWeightConfig(weightConfig);
    setWeightData(calculateWeight(weightConfig));
  }

  return (
    <>
    <LiftLogicHeader/>
    <Container my="md">
      <Text color="dimmed" align="center" size="lg" mx="auto" mt="xl">Split weight configurator </Text>
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <WeightConfigurator weightConfigHandler={updateWeightConfig} initial={weightConfig}/>
        <Grid gutter="md">
          <Grid.Col>
            <WeightResultBox weightData={weightData}/>
          </Grid.Col>
          <Grid.Col>
            <WeightDrawBox weightData={weightData}/>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
    </>
  );
}

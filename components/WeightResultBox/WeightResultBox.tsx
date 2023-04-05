import { Text, List, ThemeIcon  } from '@mantine/core';
import {IconWeight} from "@tabler/icons";

export function WeightResultBox({weightData}) {
    return (
        <>
            { weightData.error  ? (
                <Text color="red" align="left" size="lg" mx="auto" mt="xl">{weightData.error} </Text>
            ) : (
                <>
                    <Text color="dimmed" align="left" size="lg" mx="auto" mt="xl">
                        Total weight: {weightData.weight } kg
                    </Text>
                    <Text color="dimmed" align="left" size="lg" mx="auto" mt="xl">
                        Weight to split: {weightData.weightToSplit } kg
                    </Text>
                    <Text color="dimmed" align="left" size="lg" mx="auto" mt="xl">
                        Use weights:
                        <List
                            spacing="xs"
                            size="sm"
                            center
                            icon={
                                <ThemeIcon color="teal" size={24} radius="xl">
                                    <IconWeight size="1rem" />
                                </ThemeIcon>
                            }
                        >
                            {weightData.weights.map((weight, idx) => <List.Item obj={weight} key={idx}>2x {weight} kg</List.Item>)}
                        </List>
                    </Text>
                </>
            ) }
        </>
    );
}

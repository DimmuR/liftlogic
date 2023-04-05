interface WeightBlockData {
    weight: number,
    width: number,
    height: number,
    css: object,
}

const blocksByWeight: Record<number, WeightBlockData> = {
    2500: {weight: 25, width: 14, height: 70, css: {fill: 'rgb(255,0,0)', stroke: 'rgb(0,0,0)'}},
    2000: {weight: 20, width: 14, height: 70, css: {fill: 'rgb(152,152,236)', stroke: 'rgb(0,0,0)'}},
    1500: {weight: 15, width: 12, height: 60, css: {fill: 'rgb(222,222,222)', stroke: 'rgb(0,0,0)'}},
    1000: {weight: 10, width: 10, height: 50, css: {fill: 'rgb(222,222,222)', stroke: 'rgb(0,0,0)'}},
    500:  {weight: 5, width: 8, height: 40, css: {fill: 'rgb(222,222,222)', stroke: 'rgb(0,0,0)'}},
    250:  {weight: 2.5, width: 8, height: 30, css: {fill: 'rgb(0,0,0)', stroke: 'rgb(0,0,0)'}},
    125:  {weight: 1.25, width: 6, height: 20, css: {fill: 'rgb(222,222,222)', stroke: 'rgb(0,0,0)'}},
}

const cssBar = {
    fill: 'rgb(0,0,0)',
}

const svgStyle = {
    outline: '1px solid black'
}

function WeightBlock({block, start}) {
    const startVal = parseInt(start)
    return (
        <>
            <rect x={200 - startVal} y={220 - block.height/2} width={block.width} height={block.height} style={block.css} />
            <rect x={200 + startVal} y={220 - block.height/2} width={block.width} height={block.height} style={block.css} />
        </>
    )
}

function WeightBlocks({weights}) {
    const items = [];

    let start = 80
    for (const weight of weights) {
        const block = blocksByWeight[weight * 100]
        items.push(<WeightBlock block={block} start={start + block.width}/>)
        start += block.width;
    }
    return (
        <>{items}</>
    )
}

export function WeightDrawBox({weightData}) {
    return (
        <svg width="400" height="300" style={svgStyle}>
            <rect x="30" y="220" width="340" height="5" style={cssBar} />
            <WeightBlocks weights={weightData.weights}/>
        </svg>
    );
}

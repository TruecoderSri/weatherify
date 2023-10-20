"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
    result: Root;
}
function RainChart({ result }: Props) {
    const hourly = result?.hourly.time.map((time) => new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
    })).slice(0, 24);

    const data = hourly.map((hour, i) => ({
        time: Number(hour),
        "Rain (%)": result.hourly.precipitation_probability[i],
    }))

    const dataFormatter = (number: number) => `${number}%`;
    return <Card className="bg-gray-50">
        <Title className="font-bold">Chances of Rain </Title>
        <AreaChart
            className="mt-6"
            data={data}
            showLegend
            index="time"
            categories={["Rain (%)"]}
            colors={["blue"]}
            minValue={0}
            maxValue={100}
            valueFormatter={dataFormatter}
            yAxisWidth={40}
            showAnimation
            animationDuration={2000}
        />
    </Card>
}
export default RainChart;
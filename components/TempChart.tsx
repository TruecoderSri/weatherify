"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
    result: Root;
}
function TempChart({ result }: Props) {
    const hourly = result?.hourly.time.map((time) => new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
    })).slice(0, 24);

    const data = hourly.map((hour, i) => ({
        time: Number(hour),
        "UV Index": result.hourly.uv_index[i],
        "Temperature": result.hourly.temperature_2m[i]
    }))
    const dataFormatter = (number: number) => `${number}`;
    return <Card className="bg-gray-50">
        <Title className="font-bold">Temperature and UV Index</Title>
        <AreaChart
            className="mt-6"
            data={data}
            showLegend
            index="time"
            categories={["Temperature(C)", "UV Index"]}
            colors={["yellow", "rose"]}
            minValue={0}
            valueFormatter={dataFormatter}
            yAxisWidth={40}
            showAnimation
            animationDuration={2000}
        />
    </Card>
}
export default TempChart;
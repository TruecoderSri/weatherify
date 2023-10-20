
"use client";

import { Card, Color, Metric, Text } from "@tremor/react";

type Props = {
    title: string;
    metric: string;
    // color: Color;
}

function StatsCard({ title, metric }: Props) {
    return (
        <Card decoration="top" className=" border-blue-300 border-t-blue-900">
            <Text>{title}</Text>
            <Metric>{metric}</Metric>
        </Card>)
}

export default StatsCard;
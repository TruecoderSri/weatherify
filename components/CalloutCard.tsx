
"use client";

import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Callout } from "@tremor/react";

type Props = {
    message: string;
    warning?: boolean;
}

function CalloutCard({ message, warning }: Props) {
    return (
        <Callout
            className={` p-6 pl-4 mt-4 contrast-110 bg-green-300 ${warning ? 'border-l-red-400 bg-red-300' : 'border-l-green-400'}`}
            title={message}
            icon={warning ? ExclamationIcon : CheckCircleIcon}
            color={warning ? "rose" : "teal"}
        />
    )
}

export default CalloutCard;
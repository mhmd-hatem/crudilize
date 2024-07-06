"use client"

import React from 'react'
import { NextUIProvider } from "@nextui-org/system";

export default function Providers({ children }: {
    readonly children: React.ReactNode
}) {
    return (
        <NextUIProvider>{children}</NextUIProvider>
    )
}

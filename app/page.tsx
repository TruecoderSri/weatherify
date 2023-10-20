"use client"
import CityPicker from "@/components/CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#212122] to-[#041533] p-10 flex flex-col justify-center items-center contrast-120">
      <Card className="max-w-4xl mx-auto bg-black rounded-lg shadow-xl shadow-black p-20 pt-10 ">
        <Text className="text-6xl font-bold text-center mb-5 text-white">
          <span className="text-blue-300 font-['lobster'] text-8xl font-normal animate-pulse"> Weather</span>-AI
        </Text>
        <Subtitle className="text-3xl font-bold text-yellow-400 text-center hover:text-blue-900 ">
          Not just any Weather-App
        </Subtitle>
        <Divider className="my-10" />
        <Card className="bg-gradient-to-br from-[#212122] to-[#041533] rounded-md ">
          <CityPicker />
        </Card>
      </Card>
    </div>
  )
}



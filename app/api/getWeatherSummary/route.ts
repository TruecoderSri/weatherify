// 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
import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
  const { weatherData } = await request.json();
  console.log("weather data", weatherData);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `Pretend you're a weather news presenter presenting LIVE on television. be energetic and full of charisma. Introduce yourself as Julian and say you are LIVE from the International Metereological Department.State city and its country you are providing a summary for. Then give a summary of todays weather only with a witty reference to the city's natural climate. Make it easy for the viewer to understand and know what to do to prepare for those weather conditions such as wear SPF if the UV is high etc. use the uv_index data provided to provide UV advice. Provide a joke regarding the weather. Assume the data came from your team at the news office and not the user.Summarize in not more than 200 words`,
      },
      {
        role: "user",
        content: `Hi there,can I get a summary of today's weather,use the following information to get the weather data:${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });

  console.log("data is:", response);
  return NextResponse.json(response.choices[0].message);
}

import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import HumidityChart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import StatsCard from "@/components/StatsCard";
import TempChart from "@/components/TempChart";
import fetchWeatherQuery from "@/graphqL/queries/fetchWeatherQueries";
import cleanData from "@/lib/cleanData";
import getBasePath from "@/lib/getBasePath";

export const revalidate = 86400;   // to fetch new results every 24hr

type Props = {
    params: {
        city: string,
        lat: string,
        long: string
    }
}

async function WeatherPage({ params: { city, lat, long } }: Props) {

    const client = getClient();

    const { data } = await client.query({
        query: fetchWeatherQuery,
        variables: {
            current_weather: "true",
            longitude: long,
            latitude: lat,
            timezone: "GMT"
        }
    })

    const result: Root = data.myQuery;
    const dataToSend = cleanData(result, city);

    // console.log(result.hourly_units.rain)
    console.log(result.current_weather.weathercode);

    const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            weatherData: dataToSend
        })

    });
    const GPTdata = await res.json();

    const { content } = GPTdata     // extract the data from machine response

    return (
        <div className="flex flex-col min-h-screen md:flex-row">
            <InformationPanel city={city} long={long} lat={lat} result={result} />
            <div className="flex-1 p-5 lg:p-10  ">
                <div className="p-5">
                    <div className="pb-5">
                        <h2 className="text-xl font-bold">Todays Overview</h2>
                        <p className="text-sm text-gray-400">Last Updated at {" "} {new Date(result.current_weather.time[0]).toLocaleTimeString()} {result.timezone}</p>
                    </div>
                    <div className="m-2 mb-10">
                        <CalloutCard
                            message={content}
                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
                        <StatsCard
                            title="Maximum temperature"
                            metric={`${result.daily.temperature_2m_max[0].toFixed(1)}°C`}
                        // color="yellow"
                        />
                        <StatsCard
                            title="Minimum temperature"
                            metric={`${result.daily.temperature_2m_min[0].toFixed(1)}°C`}
                        // color="green"
                        />
                        <div>

                            <StatsCard
                                title="UV Index"
                                metric={`${result.daily.uv_index_max[0].toFixed(1)}`}
                            // color="rose"
                            />
                            {Number(result.daily.uv_index_max[0].toFixed(1)) > 5 && (
                                <CalloutCard
                                    message={"The UV is high today, be sure to wear SPF"}
                                    warning
                                />
                            )}
                        </div>
                        <div className="flex space-x-3">
                            <StatsCard
                                title="Wind Speed"
                                metric={`${result.current_weather.windspeed.toFixed(1)}m/s`}
                            // color="cyan"
                            />
                            <StatsCard
                                title="Wind Direction"
                                metric={`${result.current_weather.winddirection.toFixed(1)}°`}
                            // color="violet"
                            />

                        </div>

                    </div>

                </div>
                <hr className="mb-5" />

                <div className="space-y-3">
                    <TempChart
                        result={result}
                    />
                    <RainChart result={result} />
                    < HumidityChart result={result} />
                </div>
            </div>

        </div>
    )
}

export default WeatherPage;
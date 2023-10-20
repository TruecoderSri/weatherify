"use client"

import { Country, City } from "country-state-city";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlobeIcon } from "@heroicons/react/solid";


import Select from 'react-select'
type option = {
    value: {
        latitude: string,
        longitude: string,
        isoCode: string,
    };
    label: string;
} | null;

type cityOption = {
    value: {
        name: string;
        latitude: string,
        longitude: string,
        stateCode: string,
        countryCode: string,
    };
    label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
    value: {
        latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode,
    },
    label: country.name
}))


function CityPicker() {

    const [selectedCountry, setselectedCountry] = useState<option>(null);
    const [selectedCity, setselectedCity] = useState<cityOption>(null);
    const router = useRouter();

    const handleSelectedCountry = (option: option) => {
        setselectedCountry(option);
        setselectedCity(null);
    }

    const handleSelectedCity = (option: cityOption) => {
        setselectedCity(option);
        router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`);
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex flex-row space-x-1">
                    <label htmlFor="country" className=" font-bold text-lg text-white">Country</label>
                    <GlobeIcon className="h-5 w-5 mt-1 text-white" />
                </div>
                <Select
                    className="bg-black"
                    value={selectedCountry}
                    onChange={handleSelectedCountry}
                    options={options} />
            </div>
            {selectedCountry && (
                <div className="space-y-2 ">
                    <div className="flex flex-row space-x-1">
                        <label htmlFor="country" className=" font-bold text-lg text-white">City</label>
                        <GlobeIcon className="h-5 w-5 mt-1 text-white" />
                    </div>
                    <Select
                        value={selectedCity}
                        onChange={handleSelectedCity}
                        options={City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map((city) => ({
                            value: {
                                latitude: city.latitude!,
                                longitude: city.longitude!,
                                countryCode: city.countryCode,
                                name: city.name,
                                stateCode: city.stateCode,
                            },
                            label: city.name,
                        }))} />
                </div>
            )}

        </div>
    )

}

export default CityPicker
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios'

export const Header: React.FC = () => {
    const router = useRouter();
    const [icon, setIcon] = useState<string>("")

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('api/getPopularMovies')
                console.log(response.data.results)

                setIcon(response.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMovies()
    }, [])

    return (
        <div>
            <h1 className="font-bold text-xl" onClick={() => router.push("/")}>
                SHOWCASE
            </h1>

        </div>
    );
};

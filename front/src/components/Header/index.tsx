"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import laravelAxios from "@/lib/laravelAxios";

export const Header: React.FC = () => {
    const router = useRouter();
    const [icon, setIcon] = useState<string>("");

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await laravelAxios.get("api/posts");
                console.log(response.data.results);

                setIcon(response.data.results);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAccount();
    }, []);

    return (
        <div>
            <h1 className="font-bold text-xl" onClick={() => router.push("/")}>
                SHOWCASE
            </h1>
        </div>
    );
};

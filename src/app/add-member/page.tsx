"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddMember() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");

    const generateCode = (prefix: string) => {
        return `${prefix}${Math.floor(1000 + Math.random() * 9000)}`;
    };

    const handleAdd = async () => {
        const familyCode = generateCode("FAM");
        const memberCode = generateCode("MEM");

        const { error } = await supabase.from("family_members").insert([
            {
                name,
                phone,
                device_name: deviceName,
                family_code: familyCode,
                member_code: memberCode,
                emergency_contact: emergencyContact,
            },
        ]);

        if (error) {
            alert(error.message);
            return;
        }

        alert("Member Added Successfully");

        setName("");
        setPhone("");
        setDeviceName("");
        setEmergencyContact("");
    };

    return (
        <main className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Add Family Member</h1>

            <div className="space-y-4 max-w-xl">
                <input
                    className="w-full p-4 rounded-xl bg-zinc-900"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full p-4 rounded-xl bg-zinc-900"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    className="w-full p-4 rounded-xl bg-zinc-900"
                    placeholder="Device Name"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                />

                <input
                    className="w-full p-4 rounded-xl bg-zinc-900"
                    placeholder="Emergency Contact"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                />

                <button
                    onClick={handleAdd}
                    className="bg-white text-black px-6 py-3 rounded-xl"
                >
                    Add Member
                </button>
            </div>
        </main>
    );
}
"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        notifEmail: true,
        notifWA: false,
        notifPush: true,
        darkMode: false,
    });

    const handleSave = () => {
        alert("Pengaturan berhasil disimpan!");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />
            <main className="relative overflow-hidden min-h-screen bg-white">
                {/* BLOBS */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000" />
                    <div className="absolute top-40 left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000" />
                </div>

                <div className="relative z-10 container mx-auto px-4 py-16 max-w-2xl">
                    <div className="flex items-center justify-center gap-3 mb-10">
                        <span className="bg-green-100 p-2 rounded-full">
                            <Settings className="w-6 h-6 text-green-700" />
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
                            Pengaturan
                        </h1>
                    </div>

                    <div className="bg-white/60 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-10 space-y-8 transition duration-300 hover:shadow-3xl">
                        <p className="text-gray-600 text-center text-lg">
                            Sesuaikan pengalamanmu dengan Smart Pantry Manager.
                        </p>

                        <div className="divide-y divide-gray-200">
                            {[
                                { key: "notifEmail", label: "Notifikasi Email" },
                                { key: "notifWA", label: "Notifikasi WhatsApp" },
                                { key: "notifPush", label: "Push Notification" },
                                { key: "darkMode", label: "Dark Mode" },
                            ].map((item) => (
                                <SettingRow
                                    key={item.key}
                                    label={item.label}
                                    checked={settings[item.key as keyof typeof settings]}
                                    onChange={(val) =>
                                        setSettings((prev) => ({
                                            ...prev,
                                            [item.key]: val,
                                        }))
                                    }
                                />
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <Button
                                onClick={handleSave}
                                className="bg-gradient-to-br from-green-500 to-emerald-600 hover:brightness-110 text-white px-6 py-3 rounded-full text-lg shadow-md hover:shadow-lg transition duration-300"
                            >
                                Simpan Pengaturan
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function SettingRow({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between py-5">
            <span className="text-gray-800 font-medium text-lg">{label}</span>
            <Switch checked={checked} onCheckedChange={onChange} />
        </div>
    );
}

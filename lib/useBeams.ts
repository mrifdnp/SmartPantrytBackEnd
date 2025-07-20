"use client"

import { useEffect } from 'react';
import { Client } from '@pusher/push-notifications-web';
import { useProfile } from "@/context/ProfileContext"

export function useBeams() {
  const profile = useProfile();

  useEffect(() => {
    if (!profile?.id) return;

    const beamsClient = new Client({
      instanceId: 'a76f2bb2-1674-411c-9645-8fc4fd8faf73',
    });

    const initBeams = async () => {
      try {
        await beamsClient.start();  // Tunggu Beams siap
        await beamsClient.addDeviceInterest(`user-${profile.id}`);  // Langsung subscribe
        console.log(`Subscribed to user-${profile.id}`);
      } catch (error) {
        console.error('Beams error:', error);
      }
    };

    initBeams();
  }, [profile]);
}

import PusherJS from 'pusher-js';

export const PUSHER_CHANNEL = 'tournoi';
export const PUSHER_EVENT = 'score-update';

let client: PusherJS | null = null;

export function getPusherClient(): PusherJS {
  if (!client) {
    client = new PusherJS(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
  }
  return client;
}

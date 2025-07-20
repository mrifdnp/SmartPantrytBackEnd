import fetch from 'node-fetch';

const beamsInstanceId = 'a76f2bb2-1674-411c-9645-8fc4fd8faf73';
const beamsSecretKey = '8133EABC52E8ED3984FEFD9520EA625378121B404D2BCDE3C5ECB65B1DA9C0A6'; // Ganti ini

export const sendNotif = async () => {
  const res = await fetch(`https://${beamsInstanceId}.pushnotifications.pusher.com/publish_api/v1/instances/${beamsInstanceId}/publishes/interests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${beamsSecretKey}`,
    },
    body: JSON.stringify({
      interests: ['inventory-updates'],
      web: {
        notification: {
          title: 'Stok Barang Menipis!',
          body: 'Barang “Minyak Goreng” hampir habis. Segera restock.',
          icon: '/icon-192x192.png',
        },
      },
    }),
  });

  const data = await res.json();
  console.log(data);
  return data;
};

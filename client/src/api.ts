import BASE_URL from './config';

const BASE = `${BASE_URL}/api/store`;

export async function getRandomItem(): Promise<{ key: string; value: string } | null> {
  const res = await fetch(`${BASE}/next`);
  if (!res.ok) return null;
  return res.json();
}
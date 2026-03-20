import BASE_URL from './config';

const BASE = `${BASE_URL}/api/store`;

export async function getNextItem(dataset:string): Promise<{ key: string; value: string } | null> {
  const res = await fetch(`${BASE}/next/${dataset}`);
  if (!res.ok) return null;
  return res.json();
}

export async function addVocabItem(key: string, value: string): Promise<void> {
  await fetch(`${BASE}/vocab`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value })
  });
}

export async function addNewWord(key: string, value: string): Promise<void> {
  await fetch(`${BASE}/words`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value })
  });
}

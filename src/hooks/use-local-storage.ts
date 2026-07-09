import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {}
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}

export function useLocalSet(key: string) {
  const [items, setItems] = useLocalStorage<string[]>(key, []);
  const has = useCallback((id: string) => items.includes(id), [items]);
  const toggle = useCallback((id: string) => {
    setItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, [setItems]);
  const add = useCallback((id: string) => {
    setItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, [setItems]);
  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x !== id));
  }, [setItems]);
  return { items, has, toggle, add, remove, setItems };
}

export function useRecentlyViewed(max = 10) {
  const [items, setItems] = useLocalStorage<string[]>("jb.recent", []);
  const push = useCallback((id: string) => {
    setItems((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, max));
  }, [setItems, max]);
  return { items, push };
}

import React from "react";
import { fetchProducts, fetchPosts, fetchUsers } from "@/lib/api";

// Deliberate slowdown to demonstrate high-fidelity streaming
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function RegistryStats() {
  // Simulate a slow server-side connection to the protocol database
  await sleep(2000);

  const [products, posts, users] = await Promise.all([
    fetchProducts({ limit: 1 }),
    fetchPosts({ limit: 1 }),
    fetchUsers({ limit: 1 }),
  ]);

  const stats = [
    { label: "Active Products", value: products.total },
    { label: "Posts Logged", value: posts.total },
    { label: "Verified Users", value: users.total },
  ];

  return (
    <div className="flex items-center justify-center gap-8 py-4 animate-in fade-in slide-in-from-top-2 duration-1000">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            {stat.value.toLocaleString()}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-1">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchPostDetail } from "@/lib/api";
import { DummyPost } from "@/types";
import {
  ArrowLeft,
  History,
  Download,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { exportToCSV } from "@/lib/export";
import { Button } from "@/components/ui/Button";
import { DetailSkeleton } from "@/components/ui/skeletons";

interface PostDetailClientProps {
  id: string;
}

export default function PostDetailClient({ id }: PostDetailClientProps) {
  const [item, setItem] = useState<DummyPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAudit, setShowAudit] = useState(false);

  useEffect(() => {
    fetchPostDetail(id)
      .then(setItem)
      .finally(() => setLoading(false));
  }, [id]);

  const handleExport = () => {
    if (!item) return;
    exportToCSV(
      `report_data_${item.id}.csv`,
      ["Title", "Body", "Author ID", "Likes", "Dislikes", "Tags", "Views"],
      [
        item.title || "N/A",
        (item.body || "").replace(/\n/g, " "),
        item.userId ?? "N/A",
        item.reactions?.likes || 0,
        item.reactions?.dislikes || 0,
        (item.tags || []).join(";"),
        item.views || 0,
      ],
    );
  };

  const auditLogs = [
    {
      id: 1,
      action: "Report Validated",
      date: "1 hour ago",
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      id: 2,
      action: "Author Identity Verified",
      date: "4 hours ago",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      id: 3,
      action: "Content Integrity Check",
      date: "6 hours ago",
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      id: 4,
      action: "Registry Sync Success",
      date: "Yesterday",
      icon: ExternalLink,
      color: "text-primary-600",
    },
  ];

  if (loading) return <DetailSkeleton />;

  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-slate-900">
            Report Entry Not Found
          </h1>
          <Link
            href="/posts"
            className="text-primary-600 font-bold hover:underline"
          >
            Return to Registry
          </Link>
        </div>
      </div>
    );

  const imageUrl = `https://picsum.photos/seed/post-${item.id}/800/600`;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 group mb-12 text-slate-400 hover:text-slate-900 transition-all font-bold text-xs tracking-wider uppercase"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Reports
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <section className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-100 shadow-2xl shadow-blue-900/5 bg-slate-50">
              <Image
                src={imageUrl}
                alt={item.title || "Report"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </section>

          <section className="lg:col-span-7 pt-4">
            <div className="space-y-6 mb-12">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded-md bg-primary-600 text-white text-[10px] font-black uppercase">
                    REPORT
                  </div>
                  <span className="text-slate-400 text-[11px] font-bold uppercase">
                    Ref: {item.id}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                  {item.title}
                </h1>
              </div>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                {item.body}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-slate-100 pt-10">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Author ID
                </span>
                <div className="text-base font-bold text-slate-900">
                  {item.userId || "Unknown"}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Reactions
                </span>
                <div className="text-base font-bold text-slate-900">
                  {item.reactions?.likes || 0} Likes,{" "}
                  {item.reactions?.dislikes || 0} Dislikes
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Tags
                </span>
                <div className="text-base font-bold text-slate-900">
                  {item.tags?.join(", ") || "N/A"}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Views
                </span>
                <div className="text-base font-bold text-slate-900">
                  {item.views || 0}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 flex flex-wrap gap-4 border-t border-slate-100">
              <Button
                onClick={handleExport}
                icon={Download}
                size="lg"
                className="flex-1 min-w-[200px]"
              >
                Export Report Data
              </Button>
              <Button
                onClick={() => setShowAudit(!showAudit)}
                variant={showAudit ? "secondary" : "outline"}
                icon={History}
                size="lg"
                className="flex-1 min-w-[200px]"
              >
                Audit History
              </Button>
            </div>

            {showAudit && (
              <div className="mt-8 space-y-4 animate-in slide-in-from-top-4 duration-500">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">
                    Access Logs
                  </h3>
                  <div className="space-y-4">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="flex items-center gap-4">
                        <div
                          className={`p-1.5 rounded-lg bg-white border border-slate-200 ${log.color}`}
                        >
                          <log.icon className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 leading-none mb-1">
                            {log.action}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase">
                            {log.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

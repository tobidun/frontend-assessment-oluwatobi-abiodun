'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchProductDetail } from '@/lib/api'
import { DummyProduct } from '@/types'
import { 
  ArrowLeft, 
  History,
  Download,
  Clock,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react'
import { exportToCSV } from '@/lib/export'
import { Button } from '@/components/ui/Button'
import { DetailSkeleton } from '@/components/ui/skeletons'

interface ProductDetailClientProps {
  id: string
}

export default function ProductDetailClient({ id }: ProductDetailClientProps) {
  const [item, setItem] = useState<DummyProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAudit, setShowAudit] = useState(false)

  useEffect(() => {
    fetchProductDetail(id)
      .then(setItem)
      .finally(() => setLoading(false))
  }, [id])

  const handleExport = () => {
    if (!item) return;
    exportToCSV(
      `product_entity_${item.id}.csv`,
      ['Title', 'Brand', 'Category', 'Price', 'Rating', 'Stock', 'Description'],
      [
        item.title || 'N/A',
        item.brand || 'N/A',
        item.category || 'N/A',
        item.price ?? 0,
        item.rating ?? 0,
        item.stock ?? 0,
        (item.description || '').replace(/\n/g, ' ')
      ]
    );
  };

  const auditLogs = [
    { id: 1, action: 'Stock Level Verified', date: '40 mins ago', icon: CheckCircle2, color: 'text-green-600' },
    { id: 2, action: 'Entity Metadata Sync', date: '3 hours ago', icon: Clock, color: 'text-blue-600' },
    { id: 3, action: 'Security Protocol Checked', date: 'Yesterday', icon: ShieldCheck, color: 'text-primary-600' },
  ];

  if (loading) return <DetailSkeleton />

  if (!item) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-2xl font-bold">Product Entity Not Found</h1>
        <Link href="/products" className="text-primary-600 font-bold hover:underline">Return to Registry</Link>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12">
        <Link 
          href="/products"
          className="inline-flex items-center gap-2 group mb-12 text-slate-400 hover:text-slate-900 transition-all font-bold text-xs tracking-wider uppercase"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <section className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-100 shadow-2xl shadow-blue-900/5 bg-slate-50">
              <Image 
                src={item.thumbnail || '/placeholder.png'} 
                alt={item.title || 'Product'} 
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
                   <div className="px-2.5 py-1 rounded-md bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest">PRODUCT</div>
                   <span className="text-slate-400 text-[11px] font-bold uppercase">Ref: {item.id}</span>
                 </div>
                 <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">{item.title}</h1>
              </div>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">{item.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-slate-100 pt-10">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Brand</span>
                <div className="text-base font-bold text-slate-900">{item.brand || 'Generic Enterprise'}</div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</span>
                <div className="text-base font-bold text-slate-900">{item.category || 'Uncategorized'}</div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Price Points</span>
                <div className="text-base font-bold text-slate-900">${item.price || 0}</div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Registry Rating</span>
                <div className="text-base font-bold text-slate-900">{item.rating || 0} ⭐</div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Active Stock</span>
                <div className="text-base font-bold text-slate-900">{item.stock || 0} units</div>
              </div>
            </div>

            <div className="mt-12 pt-12 flex flex-wrap gap-4 border-t border-slate-100">
               <Button 
                onClick={handleExport}
                icon={Download}
                size="lg"
                className="flex-1 min-w-[200px]"
              >
                Export Entity Data
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
                  <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6">Entity Audit Logs</h3>
                  <div className="space-y-4">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="flex items-center gap-4">
                        <div className={`p-1.5 rounded-lg bg-white border border-slate-200 ${log.color}`}>
                          <log.icon className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 leading-none mb-1">{log.action}</div>
                          <div className="text-[10px] font-black text-slate-400 uppercase">{log.date}</div>
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
  )
}

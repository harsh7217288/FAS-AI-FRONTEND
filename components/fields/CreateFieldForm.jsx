"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FieldMap from "@/components/maps/FieldMap";
import { useLanguage } from "@/hooks/useLanguage";
import { polygonAreaHectares } from "@/lib/geo";

export default function CreateFieldForm(){
  const {t}=useLanguage();
  const router=useRouter();
  const [boundary,setBoundary]=useState(null);
  const [form,setForm]=useState({name:"",crop:"Wheat",area:"",location:"",soil:"Loamy",sowing:"",harvest:""});
  const set=(k,v)=>setForm({...form,[k]:v});

  useEffect(() => {
    const hectares = polygonAreaHectares(boundary);
    if (hectares !== null) set("area", hectares);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boundary]);

  const cropOptions=[["Wheat",t.wheat],["Rice",t.rice],["Maize",t.maize],["Cotton",t.cotton],["Vegetables",t.vegetables]];
  const soilOptions=[["Loamy",t.loamy],["Clay Loam",t.clayLoam],["Sandy Loam",t.sandyLoam],["Black Soil",t.blackSoil],["Alluvial",t.alluvial]];

  return <div>
    <div className="mb-5"><h1 className="text-2xl font-black text-fasai-900 sm:text-3xl">{t.addField}</h1><p className="mt-1 text-slate-500">{t.selectBoundary}</p></div>
    <div className="grid gap-5 xl:grid-cols-[1.3fr_.8fr]">
      <div className="card h-[360px] p-3 sm:h-[420px]"><FieldMap draw onBoundaryChange={setBoundary}/></div>
      <div className="card p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="text-sm font-bold">{t.fieldName}</span><input type="text" value={form.name} onChange={e=>set("name",e.target.value)} className="mt-1 min-h-12 w-full rounded-xl border p-3 outline-none focus:border-fasai-500"/></label>

          <label className="block">
            <span className="text-sm font-bold">{t.area}</span>
            <div className="relative mt-1">
              <input
                type="number"
                value={form.area}
                readOnly
                placeholder={t.areaAutoPlaceholder || "Draw boundary to calculate"}
                className="min-h-12 w-full rounded-xl border bg-slate-50 p-3 pr-16 text-slate-700 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">ha</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{t.areaAutoHint || "Auto-calculated from the boundary you draw on the map"}</p>
          </label>

          <label className="block"><span className="text-sm font-bold">{t.location}</span><input type="text" value={form.location} onChange={e=>set("location",e.target.value)} className="mt-1 min-h-12 w-full rounded-xl border p-3 outline-none focus:border-fasai-500"/></label>
          <label className="block"><span className="text-sm font-bold">{t.sowingDate}</span><input type="date" value={form.sowing} onChange={e=>set("sowing",e.target.value)} className="mt-1 min-h-12 w-full rounded-xl border p-3 outline-none focus:border-fasai-500"/></label>
          <label className="block"><span className="text-sm font-bold">{t.harvestingDate}</span><input type="date" value={form.harvest} onChange={e=>set("harvest",e.target.value)} className="mt-1 min-h-12 w-full rounded-xl border p-3 outline-none focus:border-fasai-500"/></label>

          <label><span className="text-sm font-bold">{t.cropType}</span><select value={form.crop} onChange={e=>set("crop",e.target.value)} className="mt-1 min-h-12 w-full rounded-xl border p-3">{cropOptions.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
          <label><span className="text-sm font-bold">{t.soilType}</span><select value={form.soil} onChange={e=>set("soil",e.target.value)} className="mt-1 min-h-12 w-full rounded-xl border p-3">{soilOptions.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
        </div>
        <div className="mt-6 flex gap-2">
          <button onClick={()=>router.back()} className="btn-secondary flex-1">{t.cancel}</button>
          <button onClick={()=>{localStorage.setItem("fasai_new_field",JSON.stringify({...form,boundary}));router.push("/fields/new-field")}} disabled={!form.name||!form.location} className="btn-primary flex-1 disabled:opacity-40">{t.createField}</button>
        </div>
      </div>
    </div>
  </div>;
}
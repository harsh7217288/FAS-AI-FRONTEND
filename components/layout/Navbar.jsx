"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogIn, UserPlus, LogOut, Languages } from "lucide-react";
import { navItems, dashboardItems } from "@/lib/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import Icon from "@/components/ui/Icon";

export default function Navbar({ dashboard = false }) {
  const path = usePathname();
  const router = useRouter();
  const { t, toggleLanguage, lang } = useLanguage();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const items = dashboard ? dashboardItems : navItems;
  const isActive = (href) => (href === "/" ? path === "/" : path.startsWith(href));
  const close = () => setOpen(false);
  const doLogout = () => {
    logout();
    close();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-[60] border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className={`container-fasai flex items-center justify-between gap-3 ${dashboard ? "h-[64px]" : "h-[68px]"}`}>
        {dashboard ? (
          <div className="flex min-w-0 cursor-default select-none items-center lg:hidden">
            <img src="/images/fasai-brand.png" alt="FasAI" className="pointer-events-none h-10 w-auto max-w-[155px] object-contain" />
          </div>
        ) : (
          <Link href="/" className="flex min-w-0 items-center" onClick={close} aria-label="FasAI home">
            <img src="/images/fasai-brand.png" alt="FasAI" className="h-11 w-auto max-w-[155px] object-contain" />
          </Link>
        )}

        {!dashboard && (
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive(item.href) ? "bg-fasai-50 text-fasai-700" : "text-slate-700 hover:bg-slate-50 hover:text-fasai-700"}`}>
                {t[item.key]}
              </Link>
            ))}
          </nav>
        )}

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <button type="button" onClick={toggleLanguage} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-bold text-slate-800 hover:border-fasai-500" aria-label="Switch language">
            <Languages size={17} /> {lang === "en" ? "हिंदी" : "English"}
          </button>
          {dashboard ? (
            user ? <button type="button" onClick={doLogout} className="btn-secondary min-h-11 py-2.5"><LogOut size={17} />{t.logout}</button> : null
          ) : user ? (
            <button type="button" onClick={doLogout} className="btn-secondary min-h-11 py-2.5"><LogOut size={17} />{t.logout}</button>
          ) : (
            <>
              <Link href="/login" className="btn-secondary min-h-11 py-2.5"><LogIn size={17} />{t.login}</Link>
              <Link href="/register" className="btn-primary min-h-11 py-2.5"><UserPlus size={17} />{t.register}</Link>
            </>
          )}
        </div>

        <button type="button" className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white lg:hidden" onClick={() => setOpen(v => !v)} aria-label={open ? t.close : t.menu} aria-expanded={open}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open && (
        <div className={`fixed inset-x-0 bottom-0 z-[70] bg-slate-950/30 backdrop-blur-[2px] lg:hidden ${dashboard ? "top-[64px]" : "top-[68px]"}`} onClick={close}>
          <aside className={`fixed inset-y-0 left-0 flex w-[min(88vw,320px)] flex-col border-r border-slate-200 bg-white p-4 shadow-2xl animate-[slideIn_.18s_ease-out] ${dashboard ? "top-[64px] h-[calc(100vh-64px)]" : "top-[68px] h-[calc(100vh-68px)]"}`} onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-sm font-black uppercase tracking-wider text-slate-400">{t.menu}</span>
              <button type="button" onClick={close} aria-label={t.close} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto">
              {items.map(item => (
                <Link key={item.key} href={item.href} onClick={close} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 font-semibold ${isActive(item.href) ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-50"}`}>
                  {dashboard && <Icon name={item.icon} size={19} />}
                  {t[item.key]}
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-2 border-t border-slate-100 pt-4">
              <button type="button" onClick={toggleLanguage} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 font-bold">
                <Languages size={18} /> {lang === "en" ? "हिंदी" : "English"}
              </button>
              {user ? (
                <button type="button" onClick={doLogout} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 font-bold text-red-700"><LogOut size={18} />{t.logout}</button>
              ) : !dashboard ? (
                <div className="grid grid-cols-2 gap-2"><Link href="/login" onClick={close} className="btn-secondary min-h-11">{t.login}</Link><Link href="/register" onClick={close} className="btn-primary min-h-11">{t.register}</Link></div>
              ) : null}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

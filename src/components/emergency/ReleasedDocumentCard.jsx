import { Download, FileCheck2, LockOpen, CalendarDays, HardDrive } from "lucide-react";
import Button from "../ui/Button";
import { formatDate } from "../../utils/formatDate";
import { formatFileSize } from "../../utils/fileUtils";

export default function ReleasedDocumentCard({ document, downloading=false, onDownload }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-emerald-500/20 bg-[var(--surface-primary)] shadow-[var(--card-shadow)]">
      <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-transparent p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600">
            <FileCheck2 className="h-7 w-7"/>
          </span>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[.1em] text-emerald-700">
              <LockOpen className="h-3.5 w-3.5"/>Access released
            </span>
            <h3 className="mt-3 truncate text-lg font-black text-[var(--text-primary)]">{document.title}</h3>
            <p className="truncate text-sm text-[var(--text-muted)]">{document.fileName}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[var(--border-primary)] p-3">
                <p className="text-[10px] font-black uppercase">Category</p>
                <p className="mt-1 text-sm font-bold">{document.category}</p>
              </div>
              <div className="rounded-xl border border-[var(--border-primary)] p-3">
                <div className="flex items-center gap-2"><HardDrive className="h-4 w-4"/><p className="text-[10px] font-black uppercase">Size</p></div>
                <p className="mt-1 text-sm font-bold">{formatFileSize(document.fileSize)}</p>
              </div>
              <div className="rounded-xl border border-[var(--border-primary)] p-3">
                <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4"/><p className="text-[10px] font-black uppercase">Released</p></div>
                <p className="mt-1 text-sm font-bold">{document.releasedAt ? formatDate(document.releasedAt):"--"}</p>
              </div>
            </div>
          </div>
        </div>
        <Button fullWidth className="mt-6" variant="secondary" leftIcon={Download} loading={downloading} loadingText="Downloading..." onClick={()=>onDownload(document)}>
          Download document
        </Button>
      </div>
    </article>
  );
}
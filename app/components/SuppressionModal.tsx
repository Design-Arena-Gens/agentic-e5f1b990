"use client";

import { useEffect, useRef, useState } from "react";

interface SuppressionModalProps {
  open: boolean;
  cve: string | null;
  onClose: () => void;
  onSubmit: (payload: { cve: string; justification: string; expiresAt: string }) => void;
}

export function SuppressionModal({ open, cve, onClose, onSubmit }: SuppressionModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [justification, setJustification] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  useEffect(() => {
    if (open) {
      setJustification("");
      setExpiresAt("");
      closeButtonRef.current?.focus();
    }
  }, [open, cve]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || !cve) {
    return null;
  }

  const activeCve = cve;

  const submitDisabled = justification.trim().length < 10 || !expiresAt;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitDisabled) return;
    onSubmit({ cve: activeCve, justification: justification.trim(), expiresAt });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur"
      role="presentation"
      aria-hidden={!open}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="suppression-title"
        aria-describedby="suppression-desc"
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl outline-none"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 id="suppression-title" className="text-xl font-semibold text-slate-900">
              Suppress {activeCve}
            </h2>
            <p id="suppression-desc" className="mt-1 text-sm text-slate-600">
              Provide justification and an expiration date to temporarily suppress this vulnerability across all projects.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            aria-label="Close suppression modal"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="justification" className="block text-sm font-medium text-slate-700">
              Justification
            </label>
            <textarea
              id="justification"
              name="justification"
              required
              minLength={10}
              placeholder="Outline the remediation plan or business justification"
              value={justification}
              onChange={(event) => setJustification(event.target.value)}
              className="mt-2 h-32 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
          <div>
            <label htmlFor="expiresAt" className="block text-sm font-medium text-slate-700">
              Expiration date
            </label>
            <input
              id="expiresAt"
              name="expiresAt"
              type="date"
              required
              aria-required="true"
              value={expiresAt}
              onChange={(event) => setExpiresAt(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
            <p className="mt-2 text-xs text-slate-500">Suppressions automatically expire and must be reviewed before renewal.</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">All suppressions are audited and require security approval.</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitDisabled}
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Confirm suppression
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

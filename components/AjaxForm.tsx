"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type Status = "idle" | "sending" | "sent" | "error";

type Props = {
  action: string;
  className?: string;
  statusClassName?: string;
  submitLabel: ReactNode;
  submitClassName?: string;
  children: ReactNode;
};

/**
 * Posts a form to a Formspree-style endpoint without leaving the page.
 * Without JavaScript the browser falls back to a normal HTML POST to `action`.
 */
export function AjaxForm({ action, className, statusClassName, submitLabel, submitClassName, children }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
        return;
      }
      const data = (await res.json().catch(() => null)) as { errors?: { message?: string }[] } | null;
      setError(data?.errors?.map((x) => x.message).filter(Boolean).join(" ") || "");
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={className} action={action} method="POST" acceptCharset="UTF-8" onSubmit={onSubmit}>
      {/* Honeypot: Formspree discards submissions where this is filled. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
      {children}
      <div className={statusClassName}>
        <button type="submit" className={submitClassName} disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        <p role="status" aria-live="polite" style={{ margin: 0 }}>
          {status === "sent" && "Thanks. Your message has been sent and we will be in touch soon."}
          {status === "error" && (error || "Something went wrong. Please try again or book a call instead.")}
        </p>
      </div>
    </form>
  );
}

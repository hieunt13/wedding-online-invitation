"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import type { RsvpConfig } from "@/types/wedding.types";

interface RsvpSectionProps {
  rsvp: RsvpConfig;
  defaultName?: string;
  floralImage?: string;
}

export function RsvpSection({ rsvp, defaultName, floralImage }: RsvpSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState(defaultName ?? "");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("");
  const [guestSide, setGuestSide] = useState("");
  const [guestCount, setGuestCount] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="jmii-section jmii-rsvp jmii-rsvp--success reveal-on-scroll revealed">
        <h3 className="jmii-rsvp__success-title jmii-script">{rsvp.successTitle}</h3>
        <p className="jmii-rsvp__success-msg">{rsvp.successMessage}</p>
      </section>
    );
  }

  return (
    <section className="jmii-section jmii-rsvp reveal-on-scroll">
      <p className="jmii-rsvp__intro">{rsvp.title}</p>

      <form className="jmii-rsvp__form" onSubmit={handleSubmit}>
        <label className="jmii-rsvp__field">
          <span className="sr-only">Tên</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={rsvp.namePlaceholder}
            className="jmii-input"
          />
        </label>

        <label className="jmii-rsvp__field">
          <span className="sr-only">Lời nhắn</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={rsvp.messagePlaceholder}
            rows={3}
            className="jmii-textarea"
          />
        </label>

        <label className="jmii-rsvp__field">
          <span className="sr-only">{rsvp.attendanceLabel}</span>
          <select
            required
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className="jmii-select"
          >
            {rsvp.attendanceOptions.map((opt) => (
              <option key={opt.value || "default"} value={opt.value} disabled={!opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="jmii-rsvp__field">
          <span className="sr-only">Số lượng</span>
          <input
            type="number"
            min={1}
            max={10}
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            placeholder={rsvp.guestCountPlaceholder}
            className="jmii-input"
          />
        </label>

        <label className="jmii-rsvp__field">
          <span className="sr-only">{rsvp.guestSideLabel}</span>
          <select
            required
            value={guestSide}
            onChange={(e) => setGuestSide(e.target.value)}
            className="jmii-select"
          >
            {rsvp.guestSideOptions.map((opt) => (
              <option key={opt.value || "default"} value={opt.value} disabled={!opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="jmii-btn">
          {rsvp.submitLabel}
        </button>
      </form>

      {floralImage ? (
        <div className="jmii-rsvp__floral" aria-hidden>
          <Image src={floralImage} alt="" fill className="object-contain object-bottom" sizes="100vw" />
        </div>
      ) : null}
    </section>
  );
}

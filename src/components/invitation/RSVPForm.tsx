"use client";

import { useState, FormEvent } from "react";
import type { RSVPField, RSVPFormData } from "@/types/wedding.types";

interface RSVPFormProps {
  deadline: string;
  fields: RSVPField[];
}

export function RSVPForm({ deadline, fields }: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: "",
    phone: "",
    wishes: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <section className="hm-section reveal-on-scroll reveal-delay-7 px-6 py-14">
        <div className="hm-card mx-auto max-w-md p-8 text-center">
          <p className="hm-display-couple text-hm-green mb-3">Cảm ơn bạn!</p>
          <p className="hm-body text-hm-green">
            Chúng tôi đã nhận được xác nhận. Hẹn gặp bạn trong ngày vui!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="hm-section reveal-on-scroll reveal-delay-7 px-6 py-14">
      <div className="hm-card mx-auto max-w-md p-8">
        <p className="text-center hm-label text-hm-green mb-2">XÁC NHẬN THAM DỰ</p>
        <p className="text-center hm-body-sm text-hm-green mb-8">
          Vui lòng phản hồi trước ngày {deadline}
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={formData[field.name as keyof RSVPFormData] || ""}
              onChange={handleChange}
            />
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="hm-open-btn w-full rounded-full py-3 hm-body-sm font-semibold tracking-widest uppercase disabled:opacity-70"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi xác nhận"}
          </button>
        </form>
      </div>
    </section>
  );
}

function FormField({
  field,
  value,
  onChange,
}: {
  field: RSVPField;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const inputClass =
    "w-full border-0 border-b border-hm-green/20 bg-transparent py-2 hm-body text-hm-green placeholder:text-hm-green/50 focus:border-hm-green focus:ring-0 focus:outline-none";

  return (
    <div>
      <label className="hm-label text-hm-green uppercase">
        {field.label}
      </label>
      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          className={`${inputClass} mt-1 resize-none`}
          placeholder={field.placeholder}
          rows={field.rows || 2}
          required={field.required}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={field.type}
          name={field.name}
          className={`${inputClass} mt-1`}
          placeholder={field.placeholder}
          required={field.required}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Liên hệ — Nguyễn Phúc Lộc" },
      {
        name: "description",
        content: "Gửi tin nhắn cho Lộc qua form, email hoặc mạng xã hội.",
      },
      { property: "og:title", content: "Liên hệ — Nguyễn Phúc Lộc" },
      { property: "og:description", content: "Liên hệ qua form, email hoặc mạng xã hội." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Thêm trạng thái loading
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Đã sửa thành hàm async để gọi API Web3Forms
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true); // Bắt đầu gửi
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // 👇 DÁN MÃ ACCESS KEY CỦA BẠN VÀO TRONG CẶP NGOẶC KÉP BÊN DƯỚI 👇
          access_key: "be788ceb-424c-402a-bc47-97d584536ebc", 
          
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `[Portfolio] Tin nhắn mới từ ${form.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" }); // Xóa trắng form sau khi gửi thành công
        
        // Ẩn thông báo thành công sau 5 giây
        setTimeout(() => setSent(false), 5000);
      }
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      alert("Đã có lỗi xảy ra. Bạn vui lòng thử lại sau nhé!");
    } finally {
      setIsSubmitting(false); // Gửi xong thì tắt trạng thái loading
    }
  }

  return (
    <SiteLayout>
      <header className="mb-10">
        <span className="chip">// ping me</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
          Nhắn cho mình một <span className="bg-pastel-beige px-2 rounded-md">tin</span> nhé 📡
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Hợp tác dự án, hỏi về board mạch, hay chỉ muốn rủ đi cà phê — cứ gửi
          mình một dòng.
        </p>
      </header>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
        <form onSubmit={onSubmit} className="sticker bg-card p-6 space-y-4">
          <Field label="Tên của bạn">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md border border-input bg-paper px-3 py-2 font-sans focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="VD: Trần Văn A"
            />
          </Field>
          <Field label="Email">
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-md border border-input bg-paper px-3 py-2 font-sans focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="ban@example.com"
            />
          </Field>
          <Field label="Lời nhắn">
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-md border border-input bg-paper px-3 py-2 font-sans resize-y focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Mình muốn rủ bạn làm một dự án..."
            />
          </Field>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`sticker sticker-hover bg-pastel-green px-5 py-2.5 font-mono text-sm ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Đang gửi..." : "→ Gửi tin nhắn"}
          </button>

          {sent && (
            <p className="text-sm text-green-600 font-mono mt-2">
              ✓ Tin nhắn đã được gửi đến Lộc thành công!
            </p>
          )}
        </form>

        <aside className="space-y-4">
          <div className="sticker bg-pastel-blue p-5">
            <div className="font-mono text-xs text-foreground/70">Email</div>
            <a
              href="mailto:ngloc0818@gmail.com"
              className="font-mono text-base font-bold break-all hover:underline"
            >
              ngloc0818@gmail.com
            </a>
          </div>

          <div className="sticker bg-pastel-beige p-5">
            <div className="font-mono text-xs text-foreground/70 mb-3">Mạng xã hội</div>
            <ul className="space-y-2 font-mono text-sm">
              {[
                { label: "Facebook", icon: "f", href: "https://facebook.com" },
                { label: "YouTube", icon: "▶", href: "https://youtube.com" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 hover:underline"
                  >
                    <span className="w-7 h-7 grid place-items-center rounded-md bg-card border-[1.5px] border-foreground text-xs">
                      {s.icon}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sticker bg-pastel-green p-5">
            <div className="font-mono text-xs text-foreground/70">Địa chỉ</div>
            <div className="text-sm mt-1">Hà Nội, Việt Nam</div>
          </div>
        </aside>
      </div>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-xs text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Kinh nghiệm — Nguyễn Phúc Lộc" },
      {
        name: "description",
        content: "Học vấn, kỹ năng và thành tích của Nguyễn Phúc Lộc.",
      },
      { property: "og:title", content: "Kinh nghiệm — Nguyễn Phúc Lộc" },
      { property: "og:description", content: "Học vấn, kỹ năng và kinh nghiệm." },
      { property: "og:url", content: "/resume" },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
  component: Resume,
});

const skills = {
  "Phần cứng": ["Altium Designer", "Proteus", "Ansys HFSS"],
  "Phần mềm": ["ESP32", "C/C++", "Arduino IDE", "Keil C"],
  "Tiếng Anh": ["Giao tiếp cơ bản", "Đọc hiểu tài liệu kỹ thuật"],
  "Kỹ năng mềm": ["Tư duy logic", "Giải quyết vấn đề thực tế", "Làm việc nhóm"],
};

const achievements = [
  {
    year: "Tháng 01/2026",
    title: "Thực tập sinh — Brother BIVN",
    desc: "Tìm hiểu quy trình sản xuất thực tiễn, quy chuẩn RBA và tiếp cận môi trường làm việc công nghiệp.",
    
    // ✅ BƯỚC QUAN TRỌNG: 
    // Hãy dán đường link ảnh bạn lấy từ GitHub vào bên trong 2 dấu ngoặc kép dưới đây:
    image: "https://github.com/user-attachments/assets/d9381901-a9d5-4ba2-a79a-eaf22e33d9bc", 
  },
];

function Resume() {
  return (
    <SiteLayout>
      <header className="mb-10">
        <span className="chip">// cat resume.md</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
          Kinh nghiệm &amp; <span className="bg-pastel-blue px-2 rounded-md">Kỹ năng</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Bản tóm tắt nhanh — phiên bản dài hơn có thể tải PDF (sắp có 👀).
        </p>
      </header>

      <div className="grid md:grid-cols-[1fr_1.3fr] gap-6">
        {/* Education */}
        <section className="sticker bg-card p-6">
          <h2 className="font-mono text-lg mb-4">🎓 Học vấn</h2>
          <div className="space-y-4">
            <div>
              <div className="font-mono text-xs text-muted-foreground">2022 — 2026</div>
              <div className="font-bold mt-1">Đại học Công nghiệp Hà Nội</div>
              <div className="text-sm text-muted-foreground">
                Cử nhân — Công nghệ Kỹ thuật Điện tử-Viễn thông
              </div>
              <div className="text-xs mt-1">CPA: 3.28 / 4.0</div>
            </div>
            <div className="border-t border-border pt-4">
              <div className="font-mono text-xs text-muted-foreground">Lĩnh vực trọng tâm</div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["Vi điều khiển", "Hệ thống nhúng", "Kỹ thuật mạch", "Truyền thông không dây"].map(
                  (s) => (
                    <span key={s} className="chip bg-pastel-green">
                      {s}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="sticker bg-card p-6">
          <h2 className="font-mono text-lg mb-4">🛠 Kỹ năng</h2>
          <div className="space-y-4">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <div className="font-mono text-sm font-bold">{group}</div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {items.map((s) => (
                    <span key={s} className="chip bg-pastel-beige">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Achievements */}
      <section className="mt-8 sticker bg-card p-6">
        <h2 className="font-mono text-lg mb-5">🏆 Kinh nghiệm</h2>
        <ol className="relative border-l-2 border-dashed border-foreground/40 ml-2 space-y-7">
          {achievements.map((a) => (
            <li key={a.title} className="pl-5 relative">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-pastel-blue border-[1.5px] border-foreground" />
              <div className="font-mono text-xs text-muted-foreground">{a.year}</div>
              <div className="font-bold text-lg mt-1">{a.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{a.desc}</div>
              
              {/* Phần hiển thị ảnh minh hoạ */}
              {a.image && (
                <div className="mt-3 max-w-sm rounded-md border-[1.5px] border-foreground/30 overflow-hidden bg-white/50">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-auto object-cover transition-transform hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="p-3 text-xs opacity-50 text-center font-mono">[ Chưa có ảnh minh hoạ ]</div>';
                    }}
                  />
                </div>
              )}

            </li>
          ))}
        </ol>
      </section>
    </SiteLayout>
  );
}
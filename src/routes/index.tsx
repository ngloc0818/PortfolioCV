import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import avatar from "@/assets/avt.jpg"
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nguyễn Phúc Lộc — Sinh viên Điện tử & IoT" },
      {
        name: "description",
        content:
          "Chào! Mình là Nguyễn Phúc Lộc, sinh viên năm 4 ngành Điện tử-Viễn thông, mê làm mạch và thích tìm hiểu về IoT.",
      },
      { property: "og:title", content: "Nguyễn Phúc Lộc — Sinh viên Điện tử & IoT" },
      {
        property: "og:description",
        content: "Sinh viên năm 4 tìm hiểu tò mò, thích biến ý tưởng thành sản phẩm IoT.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <section className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
        <div className="space-y-5">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
          Xin chào, tôi là{" "}
          {/* Đã thêm text-3xl sm:text-4xl md:text-5xl để tên nhỏ hơn 1 bậc so với câu chào */}
          <span className="bg-pastel-blue px-2 rounded-md text-3xl sm:text-4xl md:text-5xl">Nguyễn Phúc Lộc</span>{" "}
          <span className="inline-block animate-pulse">👋</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
          Sinh viên năm 4 ngành Công nghệ Kỹ thuật Điện tử-Viễn thông tại <strong>Đại học Công Nghiệp Hà Nội</strong>
          </p>
          <p className="text-base text-muted-foreground max-w-xl">
            Mục tiêu của tôi là biến lý thuyết trong sách thành những board mạch
            chạy được, những firmware nhẹ tênh, và những sản phẩm{" "}
            <span className="bg-pastel-green px-1.5 rounded">IoT tối ưu</span>{" "}
            mà người thường cũng xài được.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/projects"
              className="sticker sticker-hover px-5 py-2.5 font-mono text-sm bg-pastel-blue inline-block"
            >
              → Xem dự án
            </Link>
            <Link
              to="/contact"
              className="sticker sticker-hover px-5 py-2.5 font-mono text-sm bg-pastel-beige inline-block"
            >
              ✉ Liên hệ
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="sticker p-4 bg-pastel-beige max-w-sm mx-auto rotate-2">
            <img
              src={avatar}
              alt="Avatar minh hoạ Nguyễn Phúc Lộc"
              className="w-full aspect-square object-contain"
            />
            <div className="mt-3 text-center font-mono text-xs">
              📍 Việt Nam ·
            </div>
          </div>
          <div className="absolute -top-3 -left-3 sticker bg-pastel-green px-3 py-1.5 text-xs font-mono -rotate-6 hidden sm:block">
            $ whoami
          </div>
          <div className="absolute -bottom-3 -right-3 sticker bg-pastel-blue px-3 py-1.5 text-xs font-mono rotate-3 hidden sm:block">
            status: curious 🐛
          </div>
        </div>
      </section>

      <section className="mt-16 grid sm:grid-cols-3 gap-4">
        {[
          { t: "🧠 Học", d: "Điện tử-Viễn thông, năm 4, vẫn đang debug bản thân." },
          { t: "🛠 Làm", d: "Thiết kế mạch, lập trình firmware, dựng dashboard IoT." },
          { t: "🚀 Mơ", d: "Sản phẩm IoT nhỏ gọn, ngốn ít pin, ai cũng dùng được." },
        ].map((it) => (
          <div key={it.t} className="sticker p-5 bg-card">
            <h3 className="font-mono text-base mb-1">{it.t}</h3>
            <p className="text-sm text-muted-foreground">{it.d}</p>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}

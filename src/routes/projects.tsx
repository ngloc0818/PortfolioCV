import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Dự án tôi đã thực hiện nghiên cứu" },
      {
        name: "description",
        content: "Các dự án phần cứng và IoT của Nguyễn Phúc Lộc đã thực hiện được",
      },
      { property: "og:title", content: "Dự án tôi đã thực hiện nghiên cứu" },
      { property: "og:description", content: "Các dự án phần cứng và IoT." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

type Star = { situation: string; task: string; action: string[]; result: string };
type Project = {
  title: string;
  tagline: string;
  tech: string[];
  role: string;
  star: Star;
  // Đã thêm thuộc tính 'src' vào đây để lưu đường dẫn ảnh
  images: { src: string; caption: string; tone: "blue" | "green" | "beige" }[];
  accent: "blue" | "green" | "beige";
};

const projects: Project[] = [
  {
    title: "Thiết kế hệ thống báo cháy & giám sát qua Blynk IoT",
    tagline: "Cảm biến nhận tín hiệu đẩy về thông báo trên điện thoại 🔥📲",
    tech: ["ESP32", "Module 4G A7680C", "Blynk IoT", "C/C++", "Altium"],
    role: "Thiết kế phần cứng + Firmware",
    accent: "blue",
    star: {
      situation: "Các khu trọ và xưởng nhỏ thường thiếu hệ thống báo cháy có thể giám sát từ xa, chỉ có chuông kêu tại chỗ.",
      task: "Xây dựng một thiết bị giá rẻ, có thể đọc cảm biến khói/nhiệt, gửi cảnh báo realtime qua 4G và hiển thị trên app điện thoại.",
      action: [
        "Lên sơ đồ nguyên lý và thiết kế mạch cứng (Altium): khối nguồn, ESP32, giao tiếp UART với module 4G A7680C.",
        "Lập trình ESP32 đọc dữ liệu cảm biến khói, nhiệt độ; xử lý ngưỡng và gửi lên Blynk Cloud.",
        "Kết hợp cảnh báo tự động qua 4G (SMS + push notification) tăng độ chính xác.",
        "Thiết kế dashboard Blynk: gauge nhiệt độ, đèn trạng thái, lịch sử cảnh báo.",
      ],
      result: "Thiết bị chạy ổn định liên tục, độ trễ cảnh báo < 5 giây. Demo thành công ở môn đồ án, được đánh giá A.",
    },
    images: [
      // Nhớ copy ảnh của bạn vào thư mục public/images/ và sửa tên file ở đây cho khớp
      { src: "public/images/mach-alitum.png", caption: "Sơ đồ nguyên lý (Altium)", tone: "blue" },
      { src: "public/images/mach-thuc-te.jpg", caption: "Board mạch thực tế", tone: "beige" },
      { src: "public/images/Blynk.jpg", caption: "Dashboard Blynk", tone: "green" },
    ],
  },
  {
    title: "Thiết kế mô hình cảm biến nhiệt độ-độ ẩm",
    tagline: "Đo nhiệt độ-độ ẩm của môi trường thông qua giao tiếp truyền thông không dây",
    tech: ["ESP32", "Zigbee CC2530", "DHT11"],
    role: "Firmware + Tích hợp hệ thống",
    accent: "green",
    star: {
      situation: "Cần một giải pháp đo nhiệt độ - độ ẩm cho không gian nhỏ (phòng, nhà kính mini) mà không phải kéo dây phức tạp.",
      task: "Thiết kế thiết bị đo nhỏ gọn, giao tiếp truyền thông không dây và hiển thị dữ liệu trên màn hình.",
      action: [
        "Thiết kế phần cứng nhỏ gọn quanh ESP32 + cảm biến DHT11.",
        "Lập trình firmware đọc nhiệt độ/độ ẩm theo chu kỳ, lọc nhiễu cơ bản.",
        "Truyền dữ liệu không dây qua ZigBee tới gateway.",
      ],
      result: "Thiết bị hoạt động ổn định, sai số nhiệt độ ±1°C, tầm phát ZigBee ~15m trong nhà. Hoàn thành đúng tiến độ đồ án",
    },
    images: [
      { src: "public/images/node-phat-zigbee.png", caption: "Sơ đồ kết nối khối phát", tone: "green" },
      { src: "public/images/node-thu-zigbee.png", caption: "Sơ đồ kết nối khối thu", tone: "beige" },
      { src: "public/images/mach-zigbee.jpg", caption: "Mạch hoạt động hiển thị LCD", tone: "blue" },
    ],
  },
];

const toneClass: Record<"blue" | "green" | "beige", string> = {
  blue: "bg-pastel-blue",
  green: "bg-pastel-green",
  beige: "bg-pastel-beige",
};

function Projects() {
  return (
    <SiteLayout>
      <header className="mb-10">
        <span className="chip">// projects/</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
          Dự án mình từng <span className="bg-pastel-green px-2 rounded-md">thực hiện</span> được
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          {"\n"}
        </p>
      </header>

      <div className="space-y-14">
        {projects.map((p, idx) => (
          <article key={p.title} className="sticker p-5 sm:p-8 bg-card">
            <div className="grid md:grid-cols-[1fr_auto] gap-3 items-start mb-5">
              <div className="min-w-0">
                <div className="font-mono text-xs text-muted-foreground">
                  Dự án #{String(idx + 1).padStart(2, "0")}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mt-1">{p.title}</h2>
                <p className="mt-1 text-muted-foreground italic">{p.tagline}</p>
              </div>
              <span className={`chip ${toneClass[p.accent]}`}>{p.role}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {p.tech.map((t) => (
                <span key={t} className="chip bg-pastel-beige">
                  {t}
                </span>
              ))}
            </div>

            {/* Đã cập nhật Image gallery để hiển thị ảnh thật */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
              {p.images.map((img, i) => (
                <div
                  key={i}
                  className={`sticker p-3 ${toneClass[img.tone]} aspect-[4/3] flex flex-col`}
                >
                  <div className="flex-1 overflow-hidden rounded-md border-[1.5px] border-foreground/30 bg-white/50">
                    <img 
                      src={img.src} 
                      alt={img.caption} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      onError={(e) => {
                        // Hiển thị khung lỗi nếu tên ảnh bị sai
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<div class="grid place-items-center h-full text-xs opacity-50">Lỗi: Không tìm thấy ảnh</div>';
                      }}
                    />
                  </div>
                  <div className="mt-2 font-mono text-xs text-center">{img.caption}</div>
                </div>
              ))}
            </div>

            {/* STAR */}
            <div className="grid sm:grid-cols-2 gap-4">
              <StarBlock label="S — Situation" body={p.star.situation} tone="beige" />
              <StarBlock label="T — Task" body={p.star.task} tone="blue" />
              <div className="sm:col-span-2">
                <StarBlock
                  label="A — Action"
                  tone="green"
                  body={
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {p.star.action.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <StarBlock label="R — Result" body={p.star.result} tone="beige" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </SiteLayout>
  );
}

function StarBlock({
  label,
  body,
  tone,
}: {
  label: string;
  body: React.ReactNode;
  tone: "blue" | "green" | "beige";
}) {
  return (
    <div className={`rounded-lg border-[1.5px] border-foreground/80 p-4 ${toneClass[tone]}`}>
      <div className="font-mono text-xs font-bold mb-2">{label}</div>
      {typeof body === "string" ? <p className="text-sm">{body}</p> : body}
    </div>
  );
}
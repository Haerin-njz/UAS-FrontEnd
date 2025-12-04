export type Film = {
  slug: string;
  title: string;
  poster: string;
  genre: string;
  duration: string;
  director: string;
  age: string;
  summary: string;
};

export const films: Film[] = [
  {
    slug: "one-piece-red",
    title: "One Piece Red",
    poster: "/img/Gambar-Onepiece.jpg",
    genre: "Petualangan, Fantasi",
    duration: "2 Jam 00 Menit",
    director: "Goro Taniguchi",
    age: "R13+",
    summary:
      `Uta - penyanyi paling dicintai di dunia. Suaranya, yang dia nyanyikan sambil menyembunyikan identitas aslinya, telah digambarkan sebagai "dunia lain."`,
  },
  {
    slug: "frieren",
    title: "Frieren: Beyond Journey's End",
    poster: "/img/Gambar-Frieren.jpg",
    genre: "Fantasy, Adventure",
    duration: "1 Jam 45 Menit",
    director: "Tomohiro Ito",
    age: "R13+",
    summary: "Setelah perjalanan 10 tahun melawan Raja Iblis, penyihir Frieren dan timnya akhirnya menyelesaikan misinya. Namun, Frieren menyadari waktu bergerak berbeda baginya dan manusia lain. Dia memulai perjalanan baru untuk memahami kemanusiaan dan ikatan yang telah dia bentuk."
  },
  {
    slug: "wednesday",
    title: "Wednesday",
    poster: "/img/Gambar-Wednesday.jpg",
    genre: "Mystery, Drama",
    duration: "1 Jam 60 Menit",
    director: "Tim Burton",
    age: "R13+",
    summary: "Wednesday Addams, putri dari keluarga Addams yang aneh, dikirim ke Nevermore Academy. Di sana, dia mengungkap misteri pembunuhan yang mengguncang kota kecil sambil menavigasi kehidupan sekolah yang rumit dan hubungan yang kompleks."
  },
  {
    slug: "stranger-things-5",
    title: "Stranger Things Season 5",
    poster: "/img/Gambar-StrangerThings5.jpg",
    genre: "Science Fiction, Drama",
    duration: "2 Jam 15 Menit",
    director: "Duffer Brothers",
    age: "R13+",
    summary: "Musim final Stranger Things membawa pertarungan terakhir melawan kekuatan Upside Down. Sekelompok remaja dan orang dewasa mereka bergabung untuk menghentikan ancaman terakhir yang mengancam tidak hanya Hawkins, tetapi seluruh dunia."
  },
  {
    slug: "star-wars",
    title: "Star Wars: The Force Awakens",
    poster: "/img/Gambar-Starwars.jpg",
    genre: "Science Fiction, Action",
    duration: "2 Jam 18 Menit",
    director: "J.J. Abrams",
    age: "R13+",
    summary: "Puluhan tahun setelah kejatuhan Kekaisaran, Rey, seorang penjual sampah dari planet gurun, terjerat dalam konflik galaksi yang sudah lama berlangsung ketika dia menemukan droid misterius yang membawa informasi penting tentang Jedi."
  },
  {
    slug: "avengers",
    title: "Avengers: Endgame",
    poster: "/img/Gambar-Avengers.jpg",
    genre: "Action, Adventure",
    duration: "3 Jam 1 Menit",
    director: "Anthony & Joe Russo",
    age: "R13+",
    summary: "Setelah kehilangan setengah dari semua kehidupan di alam semesta, para pahlawan yang tersisa menginvestigasi keputusasaan Thanos dan merencanakan serangan balasan untuk memulihkan keseimbangan dan menyelamatkan mereka yang hilang."
  },
  {
    slug: "spiderman",
    title: "Spider-Man: No Way Home",
    poster: "/img/Gambar-Spiderman.jpg",
    genre: "Action, Adventure",
    duration: "2 Jam 48 Menit",
    director: "Jon Watts",
    age: "R13+",
    summary: "Setelah identitas Peter Parker terungkap, Peter meminta bantuan Doctor Strange untuk memperbaiki masalahnya. Namun, ritual magic mereka membuka multiverse dan menghadirkan berbagai musuh dari versi Spider-Man yang berbeda."
  },
  {
    slug: "forrest-gump",
    title: "Forrest Gump",
    poster: "/img/Gambar-Forrestgump.jpg",
    genre: "Drama, Romance",
    duration: "2 Jam 22 Menit",
    director: "Robert Zemeckis",
    age: "All Ages",
    summary: "Pria sederhana dengan IQ rendah namun hati yang tulus secara tidak sengaja mempengaruhi peristiwa penting selama paruh kedua abad ke-20 di Amerika Serikat sambil mengejar wanita impiannya, Jenny."
  },
  {
    slug: "good-will-hunting",
    title: "Good Will Hunting",
    poster: "/img/Gambar-Goodwillhunting.jpg",
    genre: "Drama, Romance",
    duration: "2 Jam 6 Menit",
    director: "Gus Van Sant",
    age: "R13+",
    summary: "Seorang genius matematika yang hidup sebagai pekerja pembersih di MIT ditemukan oleh profesor dan disarankan untuk belajar dengan psikolog, yang membantu dia menemukan tujuan dan potensi hidupnya yang sebenarnya."
  },
  {
    slug: "saving-private-ryan",
    title: "Saving Private Ryan",
    poster: "/img/Gambar-Savingpvtryan.jpg",
    genre: "War, Drama",
    duration: "2 Jam 49 Menit",
    director: "Steven Spielberg",
    age: "R13+",
    summary: "Setelah pendaratan D-Day, Kapten John Miller dan timnya ditugaskan untuk menemukan dan membawa pulang Prajurit James Ryan, satu-satunya yang selamat dari keluarganya, dalam misi yang berbahaya di balik garis musuh."
  },
];

function normalizeSlug(s: string | undefined) {
  return (s || "").toString().toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export function getFilmBySlug(slug: string | undefined) {
  const target = normalizeSlug(slug);
  return films.find((f) => normalizeSlug(f.slug) === target) || null;
}

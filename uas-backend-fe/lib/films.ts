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
      `Uta - penyanyi paling dicintai di dunia. Suaranya, yang dia nyanyikan sambil menyembunyikan identitas aslinya, telah digambarkan sebagai "dunia lain." Dia akan tampil di depan umum untuk pertama kalinya di konser live. Saat venue dipenuhi dengan semua jenis penggemar Uta - bajak laut yang bersemangat, Angkatan Laut yang mengawasi dengan cermat, dan Topi Jerami yang dipimpin oleh Luffy yang hanya datang untuk menikmati penampilannya yang nyaring - suara yang telah ditunggu-tunggu oleh seluruh dunia akan segera bergema. Cerita dimulai dengan fakta mengejutkan bahwa dia adalah "putri Shanks."`,
  },
  {
    slug: "spirited-away",
    title: "Spirited Away",
    poster: "/img/Gambar-Onepiece.jpg",
    genre: "Fantasi, Petualangan",
    duration: "2 Jam 05 Menit",
    director: "Hayao Miyazaki",
    age: "All Ages",
    summary:
      "Seorang gadis muda terperangkap di dunia roh dan bekerja di pemandian roh untuk menyelamatkan orang tuanya.",
  },
  {
    slug: "inception",
    title: "Inception",
    poster: "/img/Gambar-Onepiece.jpg",
    genre: "Sci-Fi, Thriller",
    duration: "2 Jam 28 Menit",
    director: "Christopher Nolan",
    age: "R13+",
    summary:
      "Seorang pencuri yang mencuri rahasia melalui infiltrasi mimpi diberi tugas menanam sebuah ide ke dalam pikiran target.",
  },
  {
    slug: "parasite",
    title: "Parasite",
    poster: "/img/Gambar-Onepiece.jpg",
    genre: "Drama, Thriller",
    duration: "2 Jam 12 Menit",
    director: "Bong Joon-ho",
    age: "R13+",
    summary:
      "Keluarga miskin menyusup ke kehidupan keluarga kaya, yang berujung pada konsekuensi yang tak terduga.",
  },
  {
    slug: "avengers-endgame",
    title: "Avengers: Endgame",
    poster: "/img/Gambar-Onepiece.jpg",
    genre: "Action, Sci-Fi",
    duration: "3 Jam 01 Menit",
    director: "Anthony & Joe Russo",
    age: "R13+",
    summary:
      "Para pahlawan yang tersisa berusaha membalikkan kehancuran yang dilakukan oleh Thanos.",
  },
];

export function getFilmBySlug(slug: string) {
  return films.find((f) => f.slug === slug) || null;
}

export type Poster = {
  slug: string;
  title: string;
  alt: string;
  width: number;
  height: number;
  productUrl: string | null;
};

// Public product pages and original image dimensions verified October 29, 2026.
// See public/posters/provenance.json. A null product URL marks display-only work.
export const posters: Poster[] = [
  { slug: "whiplash-aespa", title: "whiplash - aespa", alt: "Aespa Whiplash collage with torn-paper portraits and handwritten typography.", width: 1674, height: 1240, productUrl: "https://www.goneoffmars.com/posters/whiplash-aespa" },
  { slug: "souleater", title: "souleater", alt: "Soul Eater artwork arranged as a PlayStation 2 cover with character illustrations.", width: 1674, height: 1240, productUrl: "https://www.goneoffmars.com/posters/souleater" },
  { slug: "grimmjowcomm", title: "grimmjow", alt: "Blue and white Grimmjow collage with torn-paper edges, character artwork, and Sexta Espada and Living Jaguar typography.", width: 2560, height: 1440, productUrl: null },
  { slug: "serenity-koifish", title: "Serenity in Motion", alt: "Koi fish, green clover and textured brown lettering on a cream poster.", width: 1240, height: 1674, productUrl: "https://www.goneoffmars.com/posters/serenity-koifish" },
  { slug: "spiderlily", title: "spiderlily", alt: "Fine red-orange spider lilies and Japanese lettering on a pale textured background.", width: 1240, height: 1670, productUrl: "https://www.goneoffmars.com/posters/spiderlily" },
  { slug: "rukia-kuchiki", title: "rukia kuchiki", alt: "Rukia Kuchiki illustration with blue typography and a pale sweeping sword motif.", width: 1240, height: 1674, productUrl: "https://www.goneoffmars.com/posters/rukia-kuchiki" },
  { slug: "this-is-how-tommorow-moves", title: "this is how tommorow moves", alt: "Beabadoobee portraits and album notes in a red, cream and black paper collage.", width: 1240, height: 1674, productUrl: "https://www.goneoffmars.com/posters/this-is-how-tommorow-moves" },
];

export const posterSlots: (Poster | null)[] = posters;
export const posterHref = (poster: Poster) => `#/posters/${poster.slug}`;

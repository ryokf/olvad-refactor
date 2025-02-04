import { Poppins, Sour_Gummy } from "next/font/google";

export const poppins = Poppins({
    variable: "--font-poppins",
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
})

export const sourGummy = Sour_Gummy({
    variable: "--font-sour-gummy",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});



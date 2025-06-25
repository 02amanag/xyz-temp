import { z } from "zod";
import i18n from "i18next";
import tr from "../locales/tr.json";
import en from "../locales/en.json";
import { zodI18nMap } from "zod-i18n-map";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: { translation: en }, // "translation" isimli bir namespace ekliyoruz
    tr: { translation: tr },
};

export const languages = [
    {
        value: "en",
        label: "English",
        icon: "🇬🇧",
    },
    {
        value: "tr",
        label: "Türkçe",
        icon: "🇹🇷",
    },
] as const

export const ns = ["tr", "en"] as const

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "tr",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    })

export { default as i18n } from "i18next"

z.setErrorMap(zodI18nMap)

export { z }
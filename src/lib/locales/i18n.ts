import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import { en, pl, ua } from '.'
const translationPL = require('zod-i18n-map/locales/pl/zod.json')
const translationEn = require('zod-i18n-map/locales/en/zod.json')
const translationUa = require('zod-i18n-map/locales/ua/zod.json')

i18next.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
        pl: {
            zod: translationPL,
            translation: pl,
        },
        en: {
            zod: translationEn,
            translation: en,
        },
        ua: {
            translation: ua,
            zod: translationUa,
        }
    },
})
z.setErrorMap(zodI18nMap)

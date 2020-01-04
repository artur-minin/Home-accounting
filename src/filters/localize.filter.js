import store from '../store'

import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales = {
  'ru-RU': ru,
  'en-US': en
}

export default function localizeFilter(localizationKey) {
  const locale = store.getters.info.locale || 'ru-RU'
  const localizationErrorMessage =
    locale === 'ru-RU'
      ? `[Ошибка локализации]: ключ "${localizationKey}" не найден`
      : `[Localization error]: key "${localizationKey}" not found`
  return locales[locale][localizationKey] || localizationErrorMessage
}

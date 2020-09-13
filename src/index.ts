import { ArticlesResponse } from './types'

function getProp(key: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return PropertiesService.getScriptProperties().getProperty(key)!
}
function setProp(key: string, val: string) {
  return PropertiesService.getScriptProperties().setProperty(key, val)
}

const LAST_UPDATED_PROP_KEY = 'lastUpdated'
const WEBHOOK_ID = '4495f771-0ad9-4f94-bab2-0f483991bb43'
const WEBHOOK_SECRET = getProp('WEBHOOK_SECRET')
const ACCESS_TOKEN = getProp('URL_ENCODED_WIKI_API_TOKEN')

function sendMessage(message: string) {
  const signature = Utilities.computeHmacSignature(
    Utilities.MacAlgorithm.HMAC_SHA_1,
    message,
    WEBHOOK_SECRET,
    Utilities.Charset.UTF_8
  )
  const sign = signature.reduce((str, ch) => {
    const chr = (ch < 0 ? ch + 256 : ch).toString(16)
    return str + (chr.length === 1 ? '0' : '') + chr
  }, '')

  UrlFetchApp.fetch(`https://q.trap.jp/api/v3/webhooks/${WEBHOOK_ID}`, {
    method: 'post',
    contentType: 'text/plain; charset=utf-8',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-TRAQ-Signature': sign
    },
    payload: message
  })
}

function wikiUpdateNotificator() {
  const URL = `https://wiki.trap.jp/_api/pages.list?access_token=${ACCESS_TOKEN}&path=%2F`
  const data = UrlFetchApp.fetch(URL)
  const jsonData: ArticlesResponse = JSON.parse(data.getContentText())
  const articles = jsonData.pages

  const v = getProp(LAST_UPDATED_PROP_KEY)
  const lastUpdated = new Date(v)

  articles
    .filter(article => {
      const updated = new Date(article.updatedAt)
      return lastUpdated < updated
    })
    .forEach(article => {
      const text =
        `${article.revision.author.username}が[${article.path}](https://wiki.trap.jp${article.path})を更新しました\n` +
        `\n\n` +
        `> ${article.revision.body.split('\r\n').slice(0, 4).join('\n> ')}`
      sendMessage(text)
    })

  setProp(LAST_UPDATED_PROP_KEY, articles[0].updatedAt)
}

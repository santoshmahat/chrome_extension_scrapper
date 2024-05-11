/*global chrome */

const API_BASE_URL = 'http://localhost:4001'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    const { source, targetUrl } = message;
    new Promise(() => {
      try {
        fetch(targetUrl)
          .then((response) => response.text())
          .then((html) => saveProductsData(source, html))
          .then((response) => response.json())
          .then((products) => sendResponse({ success: true, data: products }))
          .catch(() => sendResponse({ success: false }))
      } catch (error) {
        sendResponse({ success: false })
      }
    })
    return true
  } catch (error) {
    sendResponse({ success: false })
  }
})

const saveProductsData = (target, html) => {
  const productNames = extractMatches(REGEX_PATTERN[target].name, html);
  const imageUrls = extractMatches(REGEX_PATTERN[target].imageUrl, html);
  const prices = extractMatches(REGEX_PATTERN[target].price, html);
  const currencies = extractMatches(REGEX_PATTERN[target].currency, html);

  const products = []

  for (let i = 0; i < productNames.length; i++) {
    products.push({
      name: productNames[i],
      image_url: imageUrls[i],
      price: prices[i],
      currency: currencies[i],
      source: target,
      entity: "product"
    });
  }

  return fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    body: JSON.stringify(products),
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

const REGEX_PATTERN = {
  KAPADAA: {
    name: /<h3 class="product-name product_title">.*?<a.*?>(.*?)<\/a>/g,
    imageUrl: /<img.*?src="(.*?)".*?>/g,
    price: /<del aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">[^<]+<\/span>&nbsp;([^<]+)<\/bdi><\/span><\/del>\s*<ins><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">[^<]+<\/span>&nbsp;([^<]+)<\/bdi><\/span><\/ins>/g,
    currency: /<span class="woocommerce-Price-currencySymbol">([^<]+)<\/span>/g
  }
}

const extractMatches = (regex, html) => {
  const matches = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1]);
  }
  return matches;
};
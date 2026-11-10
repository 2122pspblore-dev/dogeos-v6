import { mango } from './of.js';

const check = (inp, engine) => {
  const trimmed = inp.trim();
  if (!trimmed) return '';

  const isUrl =
    /^https?:\/\//i.test(trimmed) ||
    /^[\w-]+\.[\w.-]+/i.test(trimmed) ||
    trimmed.startsWith('localhost');

  if (isUrl) {
    return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
  } else {
    return engine + encodeURIComponent(trimmed);
  }
};

/**
 * Resolve an address or search query without sending it through a proxy.
 * Sites open in a normal browser tab because many websites block iframes.
 */
export const process = (input, decode = false, _prType, engine = "https://www.bing.com/search?q=") => {
  if (decode) {
    const prefix = input.includes('/portal/k12/') ? '/portal/k12/' : input.includes('/ham/') ? '/ham/' : null;
    if (!prefix) return input;
    const encoded = input.split(prefix)[1];
    return encoded ? mango.dnc(encoded) : input;
  }

  const trimmed = String(input || '').trim();
  if (!trimmed) return null;
  if (/^https?:\\/\\//i.test(trimmed)) return trimmed;
  if (/^[\\w-]+\\.[\\w.-]+(?::\\d+)?(?:[/?#]|$)/i.test(trimmed) || trimmed.startsWith('localhost')) {
    return 'https://' + trimmed;
  }
  return engine + encodeURIComponent(trimmed);
};


export function openEmbed(url) {
  var win = window.open();
  win.document.body.style.margin = "0";
  win.document.body.style.height = "100vh";
  var iframe = win.document.createElement("iframe");
  iframe.style.border = "none";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.margin = "0";
  iframe.src = url;
  win.document.body.appendChild(iframe);
}
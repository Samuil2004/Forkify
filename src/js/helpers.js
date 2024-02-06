import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

/**
 * A timeout function that checks if the loading of the page has taken too long
 * @param {int} s for seconds
 * @returns a promise with reject
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * This function creates the connection between the url link that holds all the recipes and the menu and this webpage
 * @param {string} url
 * @param {Object || Object[]} uploadData
 * @returns
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

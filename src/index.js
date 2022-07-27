const {fetch} = require('undici');
const {version} = require('../package.json');

/**
 *  Response
 *  @typedef {Object} LoopsResponse
 *  @property {string} success - Whether the request was successful or not.
 *  @property {string} [message] - A message describing the response.
 */

/**
* Node.JS module for interacting with the loops.so API
* ![Loops logo](https://imgcache.pingstreak.com/https://i.imgur.com/bsNEZKJ.png)
*/
class Api {
  /**
  * @param {string} apiKey - Your API key
  */
  constructor(apiKey) {
    this.apiKey = apiKey;
    if (!apiKey) throw Error('No API key was provided, you can generate one at https://app.loops.so/settings#API');
  }

  /**
   * @private
   * @async
   * @param {string} method
   * @param {string} path
   * @param {Object} body
   * @param {string} apiKey'
   * @return {Promise}
   */
  async _request(method, path, body, apiKey) {
    const apiBase = 'https://app.loops.so/api/v1/';
    const response = await fetch(`${apiBase}${path}`, {
      body: body ? JSON.stringify(body) : null,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': `loops-js v${version}`,
      },
    });
    return response.json();
  }

  /**
   * @description Tests whether the API key is valid
   * @async
   * @return {Promise<LoopsResponse>}
   * @example const Loops = require('loops-js');
    const client = new Loops('apiKey');
    await client.testApiKey();
   */
  async testApiKey() {
    return this._request('GET', 'api-key', null, this.apiKey);
  }

  /**
   * @description Creates a new contact
   * @async
   * @param {string} email
   * @param {string} [firstName]
   * @param {string} [lastName]
   * @param {string} [userGroup]
   * @param {string} [source="API"]
   * @return {Promise<LoopsResponse>}
   * @example const Loops = require('loops-js');
    const client = new Loops('apiKey');
    await client.createContact('john.doe@example.com', 'John', 'Doe', 'payingCustomer', 'example.com');
   */
  async createContact(email, firstName, lastName, userGroup, source) {
    return this._request('POST',
        'contacts/create',
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          userGroup: userGroup,
          source: source,
        },
        this.apiKey);
  }

  /**
   * @description Updates an existing contact
   * @async
   * @param {string} email
   * @param {string} [firstName]
   * @param {string} [lastName]
   * @param {string} [userGroup]
   * @param {string} [source]
   * @return {Promise<LoopsResponse>}
   * @example const Loops = require('loops-js');
    const client = new Loops('apiKey');
    await client.updateContact('john.doe@example.com', 'John', 'Doe', 'payingCustomer', 'example.com');
   */
  async updateContact(email, firstName, lastName, userGroup, source) {
    return this._request('PUT',
        'contacts/update',
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          userGroup: userGroup,
          source: source,
        },
        this.apiKey);
  }

  /**
   * @description Searches for a contact
   * @async
   * @param {string} email
   * @return {Promise<Object>}
   * @example const Loops = require('loops-js');
    const client = new Loops('apiKey');
    await client.findContact('test@example.com');
   */
  async findContact(email) {
    return this._request('GET', `contacts/find?email=${encodeURI(email)}`, null, this.apiKey);
  }

  /**
   * @description sends an event to a contact
   * @async
   * @param {string} email
   * @param {string} eventName
   * @return {Promise<LoopsResponse>}
   * @example const Loops = require('loops-js');
    const client = new Loops('apiKey');
    await client.sendEvent('test@example.com', 'conversion');
   */
  async sendEvent(email, eventName) {
    return this._request('POST',
        'events/send',
        {
          email: email,
          eventName: eventName,
        },
        this.apiKey);
  }
}


module.exports = Api;

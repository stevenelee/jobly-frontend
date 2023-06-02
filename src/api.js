import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  static token = "";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on all companies. */
  static async getCompanies(nameLike) {
    let res = await this.request("companies", { nameLike });
    return res.companies;
  }

  /** Get details on all jobs. */
  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Return token when creating a new user. */
  static async register({ username, password, firstName, lastName, email }) {
    let res = await this.request(
      "auth/register",
      { username, password, firstName, lastName, email },
      "post"
    );
    return res.token;
  }

  /** Return token when logging in as existing user. */
  static async login({ username, password }) {
    let res = await this.request("auth/token", { username, password }, "post");
    return res.token;
  }

  /** Get details on specific user. */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update details for specific user. */
  static async update({ username, firstName, lastName, email }) {
    let res = await this.request(`users/${username}`, { firstName, lastName, email }, "patch");
    return res.user;
  }
}

export default JoblyApi;

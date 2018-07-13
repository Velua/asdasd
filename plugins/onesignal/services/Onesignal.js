"use strict";

const axios = require("axios");

/**
 * Onesignal.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  pushNotification: async (message, playerids) => {
    // Add your own logic here.
    console.log("RAN")
    console.log(message, playerids);
    const appId = "11940624-80ad-45c0-8995-0e7847ee4ecc";
    const authKey = "YjljM2YzODMtMjcyOC00MWVmLTkzMTktMDQ1ZDJkODhlZWVi";

    const instance = axios.create({
      baseURL: "https://onesignal.com/api/v1",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authKey}`
      }
    });

    const myPhoneId = "0819e347-dc13-4fdb-8698-bf74a5c6ab00";

    instance
      .post("/notifications", {
        app_id: appId,
        include_player_ids: [myPhoneId],
        contents: {
          en: "Hello world"
        }
      })
  }
}

"use strict";

const api_key = "bfc5bb6811e900277a244880c3e0afc0";

const fetchDataFromServer = function (url, callback) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => callback(data))
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export { api_key, fetchDataFromServer };

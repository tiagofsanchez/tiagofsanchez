import axios from "axios";
const airtable_api_key = process.env.GATSBY_AIRTABLE_API_KEY;
const airtable_app_id = process.env.GATSBY_AIRTABLE_APP_ID;

//convertKit
export const addEmailToConvertKit = (name, email) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = `https://api.convertkit.com/v3/forms/1515689/subscribe`;
  const data = {
    //API IS NOT SET UP YET
    api_key: ``,
    email: email,
    first_name: name,
  };

  axios
    .post(url, data, axiosConfig)
    .then((resp) => console.log(resp))
    .catch((error) => console.log(error));
};

//AIRTABLE
export const addEmailToAirtable = (name, email) => {
  const view = "MailingList";

  const data = {
    records: [
      {
        fields: {
          Name: name,
          Email: email,
        },
      },
    ],
  };

  let url = "https://api.airtable.com/v0/" + airtable_app_id + "/" + view;
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + airtable_api_key,
      "Content-Type": "application/json",
    },
  };

  axios
    .post(url, data, axiosConfig)
    .then((resp) => console.log("Email received"))
    .catch((error) => console.log(error));
};

import axios from "axios";
const airtable_api_key = process.env.AIRTABLE_API_KEY;
const airtable_app_id = process.env.AIRTABLE_APP_ID;

const convertkit_api_key = process.env.CONVERTKIT_API_KEY;
const convertkit_form = process.env.CONVERTKIT_FORM;


//convertKit
export const addEmailToConvertKit = (name, email) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = `https://api.convertkit.com/v3/forms/${convertkit_form}/subscribe`;
  const data = {
    //API IS NOT SET UP YET
    api_key: convertkit_api_key ,
    email: email,
    first_name: name,
  };  
  axios
    .post(url, data, axiosConfig)
    .then(() => console.log("Email received in convertkit"))
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
    .then(() => console.log("Email received in Airtable"))
    .catch((error) => console.log(error));
};

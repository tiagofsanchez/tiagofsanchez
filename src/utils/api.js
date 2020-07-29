import axios from "axios";
const airtable_api_key = process.env.GATSBY_AIRTABLE_API_KEY;
const airtable_app_id = process.env.GATSBY_AIRTABLE_APP_ID;

const convertkit_api_key = process.env.GATSBY_CONVERTKIT_API_KEY;
const convertkit_form = process.env.GATSBY_CONVERTKIT_FORM;

//convertKit
export const addEmailToConvertKit = (name, email) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = `https://api.convertkit.com/v3/forms/${convertkit_form}/subscribe`;
  const data = {
    api_key: convertkit_api_key,
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

//Firebase: Getting my likes
export const gedLikesFromDB = (title, setId, setLikes) => {
  const url = "https://blog-likes.firebaseio.com/likes.json";
  axios.get(url).then((resp) => {
    const allLikes = resp.data;
    allLikes &&
      Object.keys(allLikes).map((ingKey) => {
        if (allLikes[ingKey].title === title) {
          setId(ingKey);
          setLikes(allLikes[ingKey].likes);
        }
        return null;
      });
  });
};

//Firebase: adding more likes
export const addLikesToDB = (id, likes, title, setLikes, setId) => {
  const url = "https://blog-likes.firebaseio.com/likes.json";

  if (id === "" && likes === "") {
    const newLikes = Number(likes) + 1;
    axios
      .post(url, {
        title: title,
        likes: newLikes,
      })
      .then((resp) => {
        setLikes(newLikes);
        setId(resp.data.name);
      });
  } else {
    axios
      .put(
        `https://blog-likes.firebaseio.com/likes/${id}/likes.json`,
        Number(likes) + 1
      )
      .then(() => setLikes(Number(likes) + 1));
  }
};

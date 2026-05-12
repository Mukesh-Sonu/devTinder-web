export const BASE_URL = "http://localhost:3000";

export const PROFILE_FIELDS = [
  {
    legend: "FirstName",
    name: "firstName",
    placeholder: "Enter FirstName",
    type: "text",
  },
  {
    legend: "LastName",
    name: "lastName",
    placeholder: "Enter LastName",
    type: "text",
  },
  {
    legend: "EmailId",
    name: "emailId",
    placeholder: "Enter Email",
    disabled: true,
    type: "text",
  },
  {
    legend: "Age",
    name: "age",
    placeholder: "Enter Age",
    type: "text",
  },
  {
    legend: "Gender",
    name: "gender",
    placeholder: "Enter Gender",
    type: "select",
  },
  {
    legend: "About",
    name: "about",
    placeholder: "Enter About",
    type: "textarea",
  },
  {
    legend: "PhotoUrl",
    name: "photoUrl",
    placeholder: "Enter PhotoUrl",
    type: "text",
  },
  {
    legend: "Skills",
    name: "skills",
    placeholder: "Add Skills (comma seperated values)",
    type: "textarea",
  },
];

export const autoClose = 2000;
export const position = "top-right";

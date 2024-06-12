import snackbar from "snackbar";
import { FetchWrapper } from "./fetch-wrapper";
import { calculateCalories, capitalize } from "./utils";

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/0x"
);

const list = document.querySelector("#food-list");
const form = document.querySelector("#create-form");
const name = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  API.post("/", {
    fields: {
      name: { stringValue: name.value },
      carbs: { integerValue: carbs.value },
      protein: { integerValue: protein.value },
      fat: { integerValue: fat.value },
    },
  }).then((data) => {
    console.log(data);

    if (data.error) {
      // there was an error
      snackbar.show("Some data is missing.");
      return;
    }

    snackbar.show("Food added successfully.");

    list.insertAdjacentHTML(
      "beforeend",
      `<li class="card">
        <div>
          <h3 class="name">${capitalize(name.value)}</h3>
          <div class="calories">${calculateCalories(
            carbs.value,
            protein.value,
            fat.value
          )} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${
              carbs.value
            }g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${
              protein.value
            }g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${
              fat.value
            }g</div></li>
          </ul>
        </div>
      </li>`
    );

    name.value = "";
    carbs.value = "";
    protein.value = "";
    fat.value = "";
  });
});

function init() {
  // the ?pageSize=100 is optional
  API.get("/?pageSize=100").then((data) => {
    data.documents?.forEach((doc) => {
      const fields = doc.fields;

      list.insertAdjacentHTML(
        "beforeend",
        `<li class="card">
            <div>
              <h3 class="name">${capitalize(fields.name.stringValue)}</h3>
              <div class="calories">${calculateCalories(
                fields.carbs.integerValue,
                fields.protein.integerValue,
                fields.fat.integerValue
              )} calories</div>
              <ul class="macros">
                <li class="carbs"><div>Carbs</div><div class="value">${
                  fields.carbs.integerValue
                }g</div></li>
                <li class="protein"><div>Protein</div><div class="value">${
                  fields.protein.integerValue
                }g</div></li>
                <li class="fat"><div>Fat</div><div class="value">${
                  fields.fat.integerValue
                }g</div></li>
              </ul>
            </div>
          </li>`
      );
    });
  });
}

init();

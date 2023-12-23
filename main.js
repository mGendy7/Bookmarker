// Assigning variables
var siteName = document.getElementById("siteName");
var siteLink = document.getElementById("siteLink");
var addBtn = document.getElementById("addBtn");
var editBtn = document.getElementById("editBtn");
var mainBody = document.body;
var popUpScreen = document.getElementById("popUpScreen");
var popUpBtn = document.getElementById("popUpBtn");
var checkCorrect = document.getElementById("checkCorrect");
var checkWrong = document.getElementById("checkWrong");
var checkCorrectTwo = document.getElementById("checkCorrectTwo");
var checkWrongTwo = document.getElementById("checkWrongTwo");
console.log(checkCorrectTwo, checkWrongTwo);
var websitesList = [];

// display the bookmarks if there are any in local storage
if (localStorage.getItem("websites") != null) {
  websitesList = JSON.parse(localStorage.getItem("websites"));
  displayWebsites();
}

// adding a bookmark if valid, else show pop up
function addBookmark() {
  if (validateName() && validateLink()) {
    var website = {
      name: siteName.value,
      link: siteLink.value,
    };
    websitesList.push(website);
    localStorage.setItem("websites", JSON.stringify(websitesList));
    clearForm();
    displayWebsites();
  } else {
    popUp();
  }
}

// function to clear form
function clearForm() {
  siteName.value = "";
  siteLink.value = "";
}

// bookmark list creator
function displayWebsites() {
  var content = ``;
  for (let i = 0; i < websitesList.length; i++) {
    content += `<tr>
        <td>${i + 1}</td>
        <td>${websitesList[i].name}</td>
        <td><button class="btn text-white visit-in-table"><a target="_blank" href="${
          websitesList[i].link
        }"><i class="fa-regular fa-eye pe-2"></i>Visit</a></button></td>
        <td><button onclick="settingEditForm(${i})" class="btn text-white edit-in-table"><i class="fa-regular fa-pen-to-square pe-2"></i>Edit</button></td>
        <td><button onclick="deleteBookmark(${i})" class="btn  text-white delete-in-table"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
      </tr>`;
  }
  document.getElementById("tableBody").innerHTML = content;
}

// deletion of a bookmark
function deleteBookmark(index) {
  websitesList.splice(index, 1);
  localStorage.setItem("websites", JSON.stringify(websitesList));
  displayWebsites();
}

// setting the form for editing
function settingEditForm(i) {
  addBtn.classList.replace("d-block", "d-none");
  editBtn.classList.replace("d-none", "d-block");
  siteName.value = websitesList[i].name;
  siteLink.value = websitesList[i].link;

  editBtn.onclick = function () {
    if (validateName() && validateLink()) {
      edit(i, siteName.value, siteLink.value);
      localStorage.setItem("websites", JSON.stringify(websitesList));
      displayWebsites();
      finishedEdit();
    }
  };
}

// the update
function edit(i, newName, newLink) {
  websitesList[i].name = newName;
  websitesList[i].link = newLink;
}

// transition between edit and submit
function finishedEdit() {
  editBtn.classList.replace("d-block", "d-none");
  addBtn.classList.replace("d-none", "d-block");
  clearForm();
}

// filtering and showing the filtered results
function filter(term) {
  var content = ``;
  for (let i = 0; i < websitesList.length; i++) {
    if (websitesList[i].name.toLowerCase().includes(term)) {
      content += `<tr>
              <td>${i + 1}</td>
              <td>${websitesList[i].name}</td>
              <td><button class="btn bg-warning text-white"><a target="_blank" href="${
                websitesList[i].link
              }">Visit</a></button></td>
              <td><button onclick="settingEditForm(${i})" class="btn bg-info text-white">Edit</button></td>
              <td><button onclick="deleteBookmark(${i})" class="btn bg-danger text-white">Delete</button></td>
            </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = content;
}

// validation
function validateName() {
  let nameRegex = /.{3,}/;
  return nameRegex.test(siteName.value);
}

function validateLink() {
  var urlRegex = /^(https|http):\/\/(www.)?\w+.\w{2,6}(\/)?/gi;
  return urlRegex.test(siteLink.value);
}

// pop up setting
function popUp() {
  popUpScreen.classList.add("activated");
  mainBody.classList.add("popUpBg");
  popUpBtn.onclick = function () {
    popUpScreen.classList.remove("activated");
    mainBody.classList.remove("popUpBg");
  };
}

// on typing changes in input
siteName.oninput = function () {
  if (validateName()) {
    siteName.classList.remove("static");
    siteName.classList.remove("not-valid");
    siteName.classList.add("valid");
    siteName.nextElementSibling.classList.remove("d-none");
  } else {
    siteName.nextElementSibling.classList.add("d-none");
  }
  if (!validateName()) {
    siteName.classList.remove("static");
    siteName.classList.remove("valid");
    siteName.classList.add("not-valid");
    siteName.nextElementSibling.nextElementSibling.classList.remove("d-none");
  } else {
    siteName.nextElementSibling.nextElementSibling.classList.add("d-none");
  }
};

siteLink.oninput = function () {
  if (validateLink()) {
    siteLink.classList.remove("static");
    siteLink.classList.remove("not-valid");
    siteLink.classList.add("valid");
    siteLink.nextElementSibling.classList.remove("d-none");
  } else {
    siteLink.nextElementSibling.classList.add("d-none");
  }
  if (!validateLink()) {
    siteLink.classList.remove("static");
    siteLink.classList.remove("valid");
    siteLink.classList.add("not-valid");
    siteLink.nextElementSibling.nextElementSibling.classList.remove("d-none");
  } else {
    siteLink.nextElementSibling.nextElementSibling.classList.add("d-none");
  }
};

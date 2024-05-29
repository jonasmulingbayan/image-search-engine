const accessKey = "tn_0PILlEdGafWMIzwMGyM_6lWB0BmwwnkPMjLO5K9k";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const clearButton = document.getElementById("clear");

let keyword = localStorage.getItem("searchKeyword") || "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  localStorage.setItem("searchKeyword", keyword);

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;
  results.forEach((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });
  showMoreBtn.style.display = "flex";
  if (keyword !== "") {
    clearButton.style.display = "inline"; // Show the clear button if keyword exists
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});

clearButton.addEventListener("click", () => {
  searchBox.value = ""; // Clear the search box
  clearButton.style.display = "none"; // Hide the clear button
  showMoreBtn.style.display = "none";
});

searchBox.addEventListener("input", () => {
  if (searchBox.value.trim() !== "") {
    clearButton.style.display = "inline"; // Show the clear button if search box is not empty
  } else {
    clearButton.style.display = "none"; // Hide the clear button if search box is empty
  }
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent form submission
    page = 1;
    searchImages();
  }
});

window.onload = () => {
  searchBox.value = keyword;
  if (keyword !== "") {
    searchImages(); // Call the function to display search results if keyword exists
  }
};

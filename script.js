// Defining variables
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const newResults = document.getElementById('list-new-result');
const showMoreBtn = document.getElementById('show-more-btn');
const footerSection = document.getElementById('footer');
const api_Key = 'p3NwMtkPPTYtG8wxEpX24tWEpBO2B3PWxAKo5WbNtoM';
let keyword = '';
let page = 1;

// Function to get keyboard input value and to call searchImages function
function searchByKeyword(keyword) {
    searchInput.value = keyword;
    searchImages();
}

// Function to fetch data from Unsplash API for search images
async function searchImages() {
    keyword = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${api_Key}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();
    const resultsList = data.results;
    if (page === 1) {
        searchResult.innerHTML = "";
    }
    newResults.style.display = 'none';
    updateSearchData(resultsList);
    showMoreBtn.style.display = 'block';
}

// Function to Update the search data
function updateSearchData(resultsList) {
    resultsList.map((results) => {
        const container = document.createElement('div');
        container.className = 'container';

        // To update main image
        const image = document.createElement('img');
        image.src = results.urls.small;
        image.alt = results.alt_description;
        image.id = 'mainImage';
        const imagelink = document.createElement("a");
        imagelink.href = results.links.html;
        imagelink.target = "_blank";
        imagelink.appendChild(image);

        // To update user profile
        const profileUser = document.createElement('div');
        profileUser.className = 'user_profile';
        const profileImageDiv = document.createElement('div');
        profileImageDiv.className = 'profileImageDiv';

        // To update user image
        const profileImage = document.createElement('img');
        profileImage.src = `${results.user.profile_image.small}`;
        profileImage.alt = `Profile photo of ${results.user.name}`;
        profileImage.className = 'profile-image';
        profileImageDiv.appendChild(profileImage);
        profileUser.appendChild(profileImageDiv);

        // To update user name
        const nameElement = document.createElement('h3');
        nameElement.textContent = `${results.user.name}`;
        profileUser.appendChild(nameElement);

        // To download image
        const downloadDiv = document.createElement('div');
        downloadDiv.className = 'downloadDiv';

        // To update download button
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.className = 'download-button';
        downloadButton.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = `https://unsplash.com/photos/${results.id}/download`;
            link.download = `${results.alt_description}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
        downloadDiv.appendChild(downloadButton);

        // User info contain user profile and download button
        const userInfo = document.createElement('div');
        userInfo.className = 'user_info';

        // Append child to it's parent 
        userInfo.appendChild(profileUser);
        userInfo.appendChild(downloadDiv);
        container.appendChild(imagelink);
        container.appendChild(userInfo);
        searchResult.appendChild(container);
    })
}

// Function to fetch data from Unsplash API for new images
async function newImages() {
    const url = `https://api.unsplash.com/photos?page=${page}&client_id=${api_Key}&per_page=9`;
    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
        searchResult.innerHTML = "";
    }
    updateNewData(data);
}

// Function to Update the new data
function updateNewData(data) {
    data.map((results) => {
        const container = document.createElement('div');
        container.className = 'container';

        // To update main image
        const image = document.createElement('img');
        image.src = results.urls.small;
        image.alt = results.alt_description;
        image.id = 'mainImage';
        const imagelink = document.createElement("a");
        imagelink.href = results.links.html;
        imagelink.target = "_blank";
        imagelink.appendChild(image);

        // To update user profile
        const profileUser = document.createElement('div');
        profileUser.className = 'user_profile';
        const profileImageDiv = document.createElement('div');
        profileImageDiv.className = 'profileImageDiv';

        // To update user image
        const profileImage = document.createElement('img');
        profileImage.src = `${results.user.profile_image.small}`;
        profileImage.alt = `Profile photo of ${results.user.name}`;
        profileImage.className = 'profile-image';
        profileImageDiv.appendChild(profileImage);
        profileUser.appendChild(profileImageDiv);

        // To update user name
        const nameElement = document.createElement('h3');
        nameElement.textContent = `${results.user.name}`;
        profileUser.appendChild(nameElement);

        // To download image
        const downloadDiv = document.createElement('div');
        downloadDiv.className = 'downloadDiv';

        // To update download button
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.className = 'download-button';
        downloadButton.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = `https://unsplash.com/photos/${results.id}/download`;
            link.download = `${results.alt_description}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
        downloadDiv.appendChild(downloadButton);

        // User info contain user profile and download button
        const userInfo = document.createElement('div');
        userInfo.className = 'user_info';

        // Append child to it's parent 
        userInfo.appendChild(profileUser);
        userInfo.appendChild(downloadDiv);
        container.appendChild(imagelink);
        container.appendChild(userInfo);
        newResults.appendChild(container);
    })
}

// Event Listener for Search Button
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

// Event Listener for show more button
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
})

// Event Listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    page = 1;
    newImages();
});
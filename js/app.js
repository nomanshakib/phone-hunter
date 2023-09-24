const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.innerText = '';
    
    /* Display 9 phones only */
    const showMore = document.getElementById("show-more");
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showMore.classList.remove('d-none');
    }
    else {
        showMore.classList.add('d-none')
    }
    

    /* Display no phone found message */
    const noPhoneFoundMessage = document.getElementById("no-found-message");
    if (phones.length === 0) {
        noPhoneFoundMessage.classList.remove('d-none');
    }
    else {
        noPhoneFoundMessage.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    
    /* Stop loader */
    toggleSpinner(false);
};

const processSearch = (dataLimit) => {
    /* Start loader */
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchFieldValue = searchField.value;
    loadPhones(searchFieldValue, dataLimit);
};

/* handle search button click */
document.getElementById("search-button").addEventListener('click', function () {
    /* Start loader */
    processSearch(10);
});

/* Search input field enter key handler */
document.getElementById("search-field").addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        //code for enter
        processSearch(10);
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("loader");
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add("d-none");
    }
};

/* Not the best way to show more */
document.getElementById("btn-show-more").addEventListener('click', function () {
    processSearch();
});

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById("phoneDetailsModalLabel");
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.innerHTML = `
        <P>Brand : ${phone.brand ? phone.brand : 'No brand name found!'}. </p>
        <P>Release Date : ${phone.releaseDate ? phone.releaseDate : 'No release date found!'}. </p>
        <P>Chip Set : ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No chip set details found'}. </p>
        <P>Display Size : ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No display size details found'}. </p>
        <P>Memory : ${phone.mainFeatures ? phone.mainFeatures.memory : 'No memory details found'}. </p>
        <P>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage details found'}. </p>
        <P>Sensors : ${phone.mainFeatures ? phone.mainFeatures.sensors : 'No sensors details found'}. </p>
    `;
}
loadPhones('apple');
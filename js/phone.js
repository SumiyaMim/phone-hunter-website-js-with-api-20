const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);

}
const displayPhones = (phones, isShowAll) => {
    // console.log(phones)
    // 1. get the container element where you want to add the new elements
    const phoneContainer = document.getElementById('phone-container');
     
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // Check if no data is available
    if (phones.length === 0) {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No data available.';
        phoneContainer.appendChild(noDataMessage);
        
        // Hide loading spinner
        toggleLoadingSpinner(false);
        return;
    }

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // console.log('is show all', isShowAll)

    // console.log(phones.length);
    // display only first 12 phones if not show All
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone)
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-lg`;
        // 3. set inner html
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}"/>
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title mb-2">${phone.phone_name}</h2>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-accent">Show Details</button>
            </div>
        </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);

        // hide loading spinner
        toggleLoadingSpinner(false);
    })
}
// handle show details button
const handleShowDetail = async (id) => {
    // console.log(id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
     const phone = data.data;
    
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <div class="flex justify-center p-3 mb-2">
       <img src="${phone.image}" alt="" class="h-28"/>
    </div>
    <p class="text-xs"><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p class="text-xs"><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p class="text-xs"><span class="font-bold">ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
    <p class="text-xs"><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p class="text-xs"><span class="font-bold">Slug: </span>${phone?.slug}</p>
    <p class="text-xs"><span class="font-bold">Release Date: </span>${phone?.releaseDate}</p>
    <p class="text-xs"><span class="font-bold">Brand: </span>${phone?.brand}</p>
    <p class="text-xs"><span class="font-bold">GPS: </span>${phone.others?.GPS || 'No GPS available'}</p>
    <!-- another way for GPS -->
    <!-- <p class="text-xs"><span class="font-bold">GPS: </span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available'}</p> -->
    `

    // show the modal
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

// spinner or loading
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all button
const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();
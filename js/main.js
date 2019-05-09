
// Constants
const searchInput = document.getElementById("search");
const matchList = document.getElementById("match-list");


const searchStates = async input => {
    if (input.length > 0) {
        // Origin
        const res = await fetch('../data/states.json');
        const statesData = await res.json();

        // Get values according to text input
        let matches = statesData.filter(state => {
            const regex = new RegExp(`^${input}`, 'gi');
            return state.name.match(regex) || state.abbr.match(regex);
        });

        convertToHtml(matches);
    } else {
        matchList.innerHTML = "";
    }
};

const convertToHtml = (statesArray) => {
    let text = ""
    let html = statesArray.map(state => {
        text +=
        `
        <div class="card card-body mb-1">
            <h4>
                ${state.name} (${state.abbr})
                <span class="text-primary">${state.capital}</span>
            </h4>
            <h4>
            <small>Lat: ${state.lat} / Long: ${state.long}</small>
            </h4>
        </div>
        `
    });
    matchList.innerHTML = text;
};

// Event Listener
searchInput.addEventListener("input", () => searchStates(searchInput.value));
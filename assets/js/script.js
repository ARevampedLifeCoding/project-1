let searchForm = document.querySelector("#search-form");
let resultsTable = document.querySelector("#results-table");
let watchList = document.querySelector("#watch-list");
let watchListArray = [];


const baseStockUrl = "https://financialmodelingprep.com/api/v3/"
const financialModelAPIKey = "&apikey=6404b2cc55178671f57f48fc947b5f75"



function renderResults(apiData){
    apiData.forEach(element => {
        // create table row
        let newTr = document.createElement("tr");
        newTr.setAttribute("class", "search-result");
        
        let tdName = document.createElement("td");
        tdName.textContent = element.name;
        newTr.appendChild(tdName);
        let tdSymbol = document.createElement("td");
        tdSymbol.textContent = element.symbol;
        newTr.appendChild(tdSymbol);
        let tdCurrency = document.createElement("td");
        tdCurrency.textContent = element.currency;
        newTr.appendChild(tdCurrency);
        let tdExchange = document.createElement("td");
        tdExchange.textContent = element.exchangeShortName;
        newTr.appendChild(tdExchange);

        let tdAdd = document.createElement("td");
        tdAdd.setAttribute("class", "add-line");
        let addBtn = document.createElement("button");
        addBtn.setAttribute("class", "button primary");
        addBtn.setAttribute("id", "add-btn");
        addBtn.innerHTML = "ADD";
        tdAdd.appendChild(addBtn);
        newTr.appendChild(tdAdd);

        let tdMore = document.createElement("td");
        tdMore.setAttribute("class", "more-line");
        let moreBtn = document.createElement("button");
        moreBtn.setAttribute("class", "button secondary");
        moreBtn.setAttribute("id", "more-btn");
        moreBtn.innerHTML = "More Info";
        tdMore.appendChild(moreBtn);
        newTr.appendChild(tdMore);

        resultsTable.appendChild(newTr);   
    });
    $(".add-line").on("click", "button", function(event){
    let selectedName = $(this).closest("tr").children().first().text();
    let selectedSymbol = $(this).closest("tr").children().eq(1).text();
    addToYourList(selectedName,selectedSymbol)
    });
    $(".add-line").on("click", "button", function(event){
    let selectedSymbol = $(this).closest("tr").children().eq(1).text();
    // call function - detailedInfo(selectedSymbol);
    });
}

var stockSearch = function(searchTerm, exchangeChoice) {

    if (exchangeChoice !== "all") {
        fetch(baseStockUrl + "search?query=" + searchTerm + "&limit=10&exchange=" + exchangeChoice + financialModelAPIKey)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (data) {
                    renderResults(data);
                });
            } else {
                console.log("Error" + response.statusText);
            }
        })
        .catch(function (error) {
            console.log("unable to connect to financial model");
        });
    } else {
        fetch(baseStockUrl + "search?query=" + searchTerm + "&limit=10" + financialModelAPIKey)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (data) {
                renderResults(data);
                });
            } else {
                console.log("Error" + response.statusText);
            }
        })
        .catch(function (error) {
            console.log("unable to connect to financial model");
        });
    } 
};

function detailedInfo(ticker) {
    localStorage.setItem("ticker", ticker);
    document.location.replace("../stock-details.html");
}




searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    // Need to clear the previous TR's that were added by search
    let searchText = document.querySelector("#search-text").value
    let exchangeSelect = document.querySelector("#exchange-select").value

    if (searchText) {
        stockSearch(searchText, exchangeSelect);
    }
    else {
        //need to replace this alert later with a modal
        alert("You must enter something into the company/ticker field.")
    }  
})


// function to add your selection to your list.
function addToYourList(companyName, stockSymbol){
    // var yourListArray =[{"theCompanyName" = companyName, "theStockSymbol" = stockSymbol}];
    let tr= document.createElement("tr")
    let tdOne= document.createElement("td")
    let tdTwo= document.createElement("td")
    tdOne.innerHTML= companyName
    tdTwo.innerHTML= stockSymbol
    tr.appendChild(tdOne)
    tr.appendChild(tdTwo)
    watchList.appendChild(tr)
}
//when I click add it should add the information to my list.

//Then store the data
// var = addToYourList 

// watchList.addEventListener("ADD", function(event) {
//     event.preventDefault();
// let addToYourList = document.querySelector("#add-btn").value
// let yourList = document.querySelector("#your-list").value
// if (addToYourList){
// //you click the add button 
// //add data to Your List 
// }
// })

//create a function that allows results to be added t





const currencySource ={

    apiCall(params) {
        return fetch(BASE_URL+params, {
            "method": "GET",              // HTTP method
            "headers": {                  // HTTP headers
                'X-Mashape-Key' : API_KEY,
                "x-rapidapi-host": "v6.exchangerate-api.com/v6/08f84c6fc378e03c6ea34345/enriched/",   /*Addresserna ska ändras*/
            }
        })
        // check HTTP response: 
        .then(response=> {if (response.ok) {return response}
        else {throw response.statusText}})
        .then(response => response.json());
    },
        searchCurrency(params) {return currencySource.apiCall("" + newURLSearchParams(params)).then(data=> data.results) },
        getCurrencyDetails(id) {return currencySource.apiCall("" + id + "" );}


    /*    "v6.exchangerate-api.com/v6/08f84c6fc378e03c6ea34345/enriched/" + currency.id */
};
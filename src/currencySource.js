
//const currencySource ={

    function apiCall(params) {
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
    }
        function searchCurrency(params) {return apiCall("v6/08f84c6fc378e03c6ea34345/enriched" + new URLSearchParams(params)).then(data=> data.results) }
        function getCurrencyValues(id) {return apiCall("currencyModel.mainCurrency" + id + "conversion_rate" );}


    /*    "v6.exchangerate-api.com/v6/08f84c6fc378e03c6ea34345/enriched/" + currency.id */
//};
export {getCurrencyValues, searchCurrency};
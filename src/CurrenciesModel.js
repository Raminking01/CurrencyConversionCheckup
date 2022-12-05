import {getCurrencyValues, searchCurrency} from "./currencySource.js";

class CurrencyModel{
    constructor(currencyArray = [], exchangeRateArray = []){
        this.currencies = currencyArray;
        this.exchangeRates = exchangeRateArray;
        this.observers = [];
        this.mainCurrency = null;
        this.searchResultsPromiseState= {};
        this.searchParams = {};
        this.mainCurrencyPromiseState = {};
        this.currenciesPromiseState = {};
        this.exchangeRatePromiseState = {};
    }

    addObserver(callback){
        this.observers = [...this.observers, callback]
    }
    removeObserver(callback){
        function removeCheck(arg){
            return callback !== arg
        }
            this.observers.filter(removecheck)
        
    }
    notifyObservers(){
        this.observers.forEach(cb => {try { cb() } catch (error) { console.log(error) } });
    }
    setMainCurrency(id){
        if(this.mainCurrency === id) return;
        this.mainCurrency = id;
        this.mainCurrencyValues = null;
        this.mainCurrencyError = null;
        this.notifyObservers();

        if(getCurrencyValues(this.currency)){
            getCurrencyValues(id)
            .then(result => {
                if(this.currency === id) {
                    this.mainCurrencyValues = result;
                    this.notifyObservers();
                }
            })
            .catch (error => {
                if(this.currency === id){
                    this.mainCurrencyError = error;
                    this.notifyObservers();
                }
            })
        }
    }

    addCurrency(currency){
        this.currencies = [...mainCurrency, currency];
        this.notifyObservers();
    };
    
    removeCurrency(currencyData){
        this.currencies = this.currencies.filter(d => d.id !=currencyData.id);
        this.notifyObservers();
    };


}

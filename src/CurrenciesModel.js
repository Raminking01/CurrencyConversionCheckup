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
    /*Inte riktigt färdig än med setMainCurrency*/
    setMainCurrency(id){
        if(this.mainCurrency === id) return;
        this.mainCurrency = id;
        this.mainCurrencyResult = null;
        this.mainCurrencyError = null;
        this.notifyObservers();

        if(getCurrencyValues(this.mainCurrency)){
            getCurrencyValues(id)
            .then(result => {
                if(this.mainCurrency === id) {
                    this.mainCurrencyResult = result;
                    this.notifyObservers();
                }
            })
            .catch (error => {
                if(this.mainCurrency === id){
                    this.mainCurrencyError = error;
                    this.notifyObservers();
                }
            })
        }
        if(this.mainCurrency === id)
            this.exchangeRates = exchangeRates.map (x => this.getCurrencyValues(x));


    }


    addCurrency(currency){
        this.currencies = [...mainCurrency, currency];
        this.notifyObservers();
    };

    removeCurrency(currencyData){
        this.currencies = this.currencies.filter(d => d.id !=currencyData.id);
        this.notifyObservers();
    };

    compareCurrencies(id, pos){
       if(this.currencies[pos] === id)
       return 1;
       this.exchangeRateResult = null;
       this.exchangeRateError = null;
        getCurrencyValues(id) 
        .then(result => {
            if(this.currencies[pos] === id) {
                this.exchangeRateResult = result;
                this.notifyObservers();
            }
        })
        .catch(error => {
            if(this.currencies[pos] === id) {
                this.exchangeRateError = error;
                this.notifyObservers();
            }
        })
    }

}

class CurrencyModel{
    constructor(){
        this.currencies = [];
        this.mainCurrency = null;
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
        if(this.currentCurrency === id) return;
        this.currentCurrency = id;
        this.currentCurrencyDetails = null;
        this.currentCurrencyError = null;
        this.notifyObservers();
    }
    addCurrency(currency){
        this.currencies = [...mainCurrency, currency];
        this.notifyObservers();
    };
    removeCurrency(currencyData){
        this.currencies = this.currencies.filter(d => d.id !=currencyData.id);
        this.notifyObservers();
    };

    if(currencySource.getCurrencyValues(this.currencies)){
        currencySource.getCurrencyValues(id)
        .then(result -> {
            if(this.currencies === id) {
                this.currentCurrencyDetails = result;
                this.notifyObservers();
            }
        })
        .catch (error -> {
            if(this.currencies === id){
                this.currentCurrencyError = error;
                this.notifyObservers();
            }
        })
    }
}

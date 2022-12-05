import CurrenciesModel from "./CurrenciesModel.js";
import { getCurrencyDetails } from "./currencySource.js";
import firebaseConfig from "./firebaseConfig.js";

// Initialise firebase
firebase.initializeApp(firebaseConfig);
const REF="currenciesModel";

function observerRecap(model) {
    function checkPayload(payload) {
        console.log(payload)
    }
    model.addObserver(checkPayload)
}

function firebaseModelPromise() {
    function makeBigPromiseACB(firebaseData) {
        if (!firebaseData.val() || Object.keys(firebaseData.val()).length === 0) { return new CurrenciesModel(); }
        const currencyPromiseArray= Object.keys(firebaseData.val().currencies || []).map(makeCurrencyPromiseCB);
        function createModelACB(currencyArray){
            return new CurrenciesModel(firebaseData.val()./*TODO*/, currencyArray);
        }
        return Promise.all(currencyPromiseArray).then(createModelACB);
    }
    function makeCurrencyPromiseCB(currencyId){
        return getCurrencyDetails(currencyId);
    }
    return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

function updateFirebaseFromModel(model) {
    function observePayloadACB(payload) {
        if (!payload || payload<0 ) { return; }
        
        else if(payload.mainCurrency){
            firebase.database().ref(REF+"/mainCurrency").set(model.mainCurrency)
        }
        else if (payload.addCurrency) {
            firebase.database().ref(REF+"/currencies/"+ payload.addCurrency.id).set(payload.addCurrency.title)
        }
        else if (payload.removeCurrency) {
            firebase.database().ref(REF+"/currencies/"+ payload.removeCurrency.id).set(null)
        }    
    }
    model.addObserver(observePayloadACB)
    return;
}
console.log(updateFirebaseFromModel)

function updateModelFromFirebase(model) {
    function currencyChangedInFirebaseACB(firebaseData){ model.setMainCurrency(firebaseData.val());}
    firebase.database().ref(REF+"/mainCurrency").on("value", currencyChangedInFirebaseACB);

    function currencyAddedInFirebaseACB(firebaseData){
        function responseCurrencyDataACB(currency) {
            model.addCurrency(currency);
        }
        function fetchCurrencyDataBasedOnID(currencyId) {
            function checkCurrencyDuplicateCB(currency) {
                return currency.id === currencyId;
            }
            return model.currencies.find(checkCurrencyDuplicateCB);    
        }
        if (!fetchCurrencyDataBasedOnID(+firebaseData.key)) {
            getCurrencyDetails(+firebaseData.key).then(responseCurrencyDataACB);
        }
    }
    firebase.database().ref(REF+"/currencies").on("child_added", currencyAddedInFirebaseACB);

    function currencyRemovedInFirebaseACB(firebaseData){ model.removeFromMenu({ id: +firebaseData.key });}
    firebase.database().ref(REF+"/currencies").on("child_removed",  currencyRemovedInFirebaseACB);
    return;
}
export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};
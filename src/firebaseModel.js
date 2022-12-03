//import DinnerModel from "./DinnerModel.js";
import { getDishDetails } from "./dishSource.js";
import firebaseConfig from "./firebaseConfig.js";

// Initialise firebase
firebase.initializeApp(firebaseConfig);
const REF="dinnerModel123";

function observerRecap(model) {
    function checkPayload(payload) {
        console.log(payload)
    }
    model.addObserver(checkPayload)
}

function firebaseModelPromise() {
    function makeBigPromiseACB(firebaseData) {
        if (!firebaseData.val() || Object.keys(firebaseData.val()).length === 0) { return new /*TODO model keyname*/(); }
        const currencyPromiseArray= Object.keys(firebaseData.val()./*TODO (dishes equivalent)*/ || []).map(makeCurrencyPromiseCB);
        function createModelACB(/*TODO the currency array (dishArray)*/){
            return new /*TODO model keyname*/(firebaseData.val()./*TODO check payload (numberOfGuests) */, /*TODO the currency array (dishArray)*/);
        }
        return Promise.all(/*TODO promise all for the entire promise array (dishPromiseArray)*/).then(createModelACB);
    }
    function makeCurrencyPromiseCB(/*TODO the currency ID (dishId)*/){
        return getCurrencyDetails(/*TODO the currency ID (dishId)*/);
    }
    return firebase.database().ref(REF /* <-- note! Whole object! */).once("value").then(makeBigPromiseACB);
}

function updateFirebaseFromModel(model) {
    function observePayloadACB(payload) {
        if (!payload || payload<0 ) { return; }
        
        else if (payload./*TODO check payload (numberOfGuests)*/) {
            firebase.database().ref(REF+"/numberOfGuests").set(model.numberOfGuests)
        }
        else if(payload./*TODO check payload (dishID)*/){
            firebase.database().ref(REF+"/currentDish").set(model.currentDish)    
        }
        else if (payload./*TODO check payload (addDish)*/) {
            firebase.database().ref(REF+"/dishes/"+ payload.addDish.id).set(payload.addDish.title)
        }
        else if (payload./*TODO check payload (removeDish)*/) {
            firebase.database().ref(REF+"/dishes/"+ payload.removeDish.id).set(null)
        }    
    }
    model.addObserver(observePayloadACB)
    return;
}
console.log(updateFirebaseFromModel)

function updateModelFromFirebase(model) { /*TODO check functions in model */
    function guestsChangedInFirebaseACB(firebaseData){ model.setNumberOfGuests(firebaseData.val());}
    firebase.database().ref(REF+"/numberOfGuests").on("value", guestsChangedInFirebaseACB);
    
    function dishChangedInFirebaseACB(firebaseData){ model.setCurrentDish(firebaseData.val());}
    firebase.database().ref(REF+"/currentDish").on("value", dishChangedInFirebaseACB);

    function dishAddedInFirebaseACB(firebaseData){
        function responseDishDataACB(dish) {
            model.addToMenu(dish);
        }
        function fetchDishDataBasedOnID(dishId) {
            function checkDishDuplicateCB(dish) {
                return dish.id === dishId;
            }
            return model.dishes.find(checkDishDuplicateCB);    
        }
        if (!fetchDishDataBasedOnID(+firebaseData.key)) {
            getDishDetails(+firebaseData.key).then(responseDishDataACB);
        }
    }
    firebase.database().ref(REF+"/dishes").on("child_added", dishAddedInFirebaseACB);

    function dishRemovedInFirebaseACB(firebaseData){ model.removeFromMenu({ id: +firebaseData.key });}
    firebase.database().ref(REF+"/dishes").on("child_removed",  dishRemovedInFirebaseACB);
    return;
}

// Remember to uncomment the following line:
export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};
import DetailsView from "../views/detailsView";
import promiseNoData from "../views/promiseNoData";

export default
function Details(props){
    function currentDishInMenuCB(dish){ return dish.id === props.model.currentDish }
    function onAddToMenuACB(){ 
        props.model.addToMenu(props.model.currentDishPromiseState.data); }
    // console.log("Dishes: "+props.model.dishes)
    return promiseNoData(props.model.currentDishPromiseState) || 
            <DetailsView dishData={props.model.currentDishPromiseState.data}
                        isDishInMenu={props.model.dishes?props.model.dishes.filter(currentDishInMenuCB).length > 0?true:false:false}
                        guests={props.model.numberOfGuests}
                        onAddToMenu={onAddToMenuACB}/>
}
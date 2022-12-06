import GraphView from "../views/graphView.js";
import promiseNoData from "../views/promiseNoData";

export default
function Graph(props){
    function mainCurrencyInMenuCB(currency){ return currency.id === props.model.maincurrency }
    function onAddCurrencyACB(){ 
        props.model.addCurrency(props.model.maincurrencyPromiseState.data); }
    return promiseNoData(props.model.maincurrencyPromiseState) || 
            <GraphView  currencyData={props.model.mainCurrencyPromiseState.data}
                        isCurrencyInMenu={props.model.currencies?props.model.currencies.filter(mainCurrencyInMenuCB).length > 0?true:false:false}
                        onAddCurrency={onAddCurrencyACB}/>
}
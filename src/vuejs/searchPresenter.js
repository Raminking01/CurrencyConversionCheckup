import promiseNoData from "../views/promiseNoData.js";
import SearchFormView from "../views/searchFormView.js";
import SearchResultsView from "../views/searchResultsView.js";
import { searchCurrencies } from "../currencySource.js"
import resolvePromise from "../resolvePromise.js"

const Search={
    props: ["model"],
    data(){ return { searchQuery: "" ,
                searchResultsPromiseState: {promise: "", data: "", error: ""} } },
    created(){ if (!this.searchResultsPromiseState.promise) {resolvePromise(searchCurrencies({}), this.searchResultsPromiseState)}; },
    render(){
        function onValueChangeACB(text){ this.searchQuery = text; }
        function onSearchACB(){ resolvePromise(searchCurrencies({query: this.searchQuery}), this.searchResultsPromiseState) }
        function onSearchResultACB(result){ this.model.setMainCurrency(result.id); }
        return (
            <div>
                <SearchFormView onValueChange={onValueChangeACB.bind(this)}
                                onButtonPress={onSearchACB.bind(this)}/>
                {promiseNoData(this.searchResultsPromiseState)||
                <SearchResultsView searchResults={this.searchResultsPromiseState.data}
                                    onSearchResult={onSearchResultACB.bind(this)}/>}
                
            </div>
        )
    }
};
export default Search;
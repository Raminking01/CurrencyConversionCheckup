function SearchResultsView(props){
    function showSearchResultsCB(result){
        function onSearchResultACB(){ 
            props.onSearchResult(result);
            /* TODO window.location.hash = "#details"; */
        }
        return (
            <span class="searchResult"
            onClick={onSearchResultACB}>
                <img src={result.target_data.flag_url}height="100">
                </img>
                <div>
                    {result.target_data.currency_name}
                </div>
            </span>
        );
    }
    return (
    <div>
        {
            props.searchResults.map(showSearchResultsCB)
        }
    </div>
    );
}

export default SearchResultsView;
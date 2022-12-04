function searchPresenter(props){   // assume a model prop

    return <searchView searchTerm={props.model.searchTerm}
        changeSearchTerm={x => props.model.changeSearchTerm(x)}
        showCurrencies={x => props.model.showCurrencies(x)}
    />
}
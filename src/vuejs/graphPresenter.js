function graphPresenter(props){   // assume a model prop

    return <graphView
        currencies={props.model.currencies}
        mainCurrency={props.model.mainCurrency}
        setMainCurrency={x => props.model.setMainCurrency(x)}
        removeCurrency={x => props.model.removeCurrency(x)}
        //time={props.model.time}
        //changeTime={x => props.model.changeTime(x)}
    />
}
function loginPresenter(props){   // assume a model prop

    return <loginView
        userName={props.model.userName}
        changeUserName={x => props.model.changeUserName(x)}
    />
}
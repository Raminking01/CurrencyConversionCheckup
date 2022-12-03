import { firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase } from "../firebaseModel";
import resolvePromise from "../resolvePromise";
import App from "../views/app";
import promiseNoData from "../views/promiseNoData";

const VueRoot = { 
    data() { return {promiseState: {}}; 
    }, 
    created() {
        function connectToFirebaseACB() { 
            if (!this.promiseState.data) return;
            updateFirebaseFromModel(this.promiseState.data);
            updateModelFromFirebase(this.promiseState.data);
        }
            resolvePromise(firebaseModelPromise(), this.promiseState, connectToFirebaseACB.bind(this));
    },
    render() {
        return promiseNoData(this.promiseState) || <App model={this.promiseState.data} />;
    },
};
export default VueRoot;
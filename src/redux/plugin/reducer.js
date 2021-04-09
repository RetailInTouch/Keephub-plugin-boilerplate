const initialState = {

};

export default function plugin(state = initialState, action) {

    switch (action.type) {

        case 'ACTION':

            return Object.assign({}, state, {});
        default:
            return state;
        
    }
    
}
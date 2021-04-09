import {
    Switch,
    Route
} from 'react-router-dom';
  
import { Provider as ReduxProvider } from 'react-redux';
  
import { PersistGate } from 'redux-persist/integration/react';
   
import { KeephubProvider, KeephubRouter } from 'keephub-plugin-bridge';

import configureStore from './redux/store';

import Demo from './modules/demo/Demo';
import Demo2 from './modules/demo/Demo2';

const { store, persistor } = configureStore();

const App = () => {

    const onBeforeLift = ({ preferredLanguage }) => {
        return new Promise((resolve) => {
			resolve();
		});
    }

	return (
		<ReduxProvider store={store}>
            <PersistGate persistor={persistor}>

                <KeephubProvider>
                    <KeephubRouter>

                        <Switch>
                            <Route path="/" exact component={Demo} />
                            <Route path="/demo2" exact component={Demo2} />
                            <Route path="*">
                                <div>Not found!</div>
                            </Route>
                        </Switch> 
        
                    </KeephubRouter>
                </KeephubProvider>

            </PersistGate>
		</ReduxProvider>
	);
}

export default App;
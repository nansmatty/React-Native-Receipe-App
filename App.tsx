import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import {AuthProvider} from './src/context/AuthContext';
import {ReceipeProvider} from './src/context/ReceipeContext';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <ReceipeProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </ReceipeProvider>
    </AuthProvider>
  );
}

export default App;

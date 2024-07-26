import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Python from './src/Python/Pythoninstructions';
import Java from './src/Java/Javainstruction';
import SQL from './src/SQL/SQLinstructions';
import CPlus from './src/C++/CPlusinstructions';
import Javascript from './src/Javascript/Javascriptinstructions';
import CTestpage from './src/CProgram/CTestpage';
import JavaTestpage from './src/Java/JavaTestpage';
import SQLTestpage from './src/SQL/SQLTestpage';
import PythonTestpage from './src/Python/PythonTestpage';
import CPlusTestpage from './src/C++/CplusTestpage';
import JavascriptTestpage from './src/Javascript/JavascriptTestpage';
import CinstructionPage from './src/CProgram/Cinstruction page';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (

    <View style={styles.container}>

      <View style={[styles.content,]}>
        <View style={[styles.icon, { position: 'absolute', top: -60 }]}>
          {/* ------------------------cprogram----------------------------------- */}
          <View style={[styles.box]}>
            <TouchableOpacity onPress={() => navigation.navigate('C')}>
              <Image source={require('../MyNewExpoProject/assets/c .png')} style={styles.image} />
              <Text style={styles.text}>C</Text>
            </TouchableOpacity>
          </View >
          {/* ------------------------------python----------------------------------- */}
          <View style={[styles.box, {}]}>
            <TouchableOpacity onPress={() => navigation.navigate('Python')}>
              <Image source={require('../MyNewExpoProject/assets/python 1.png')} style={styles.image} />
              <Text style={styles.text}>Python</Text>
            </TouchableOpacity>
          </View>
          {/* ---------------------------------java-------------------------------------- */}
        </View>
        <View style={styles.box}>
          <TouchableOpacity onPress={() => navigation.navigate('Java')}>
            <Image source={require('../MyNewExpoProject/assets/java 1.png')} style={styles.image} />
            <Text style={styles.text}>Java</Text>
          </TouchableOpacity>
        </View>
        {/* --------------------------------------sql------------------------------------------ */}
        <View style={styles.box}>
          <TouchableOpacity onPress={() => navigation.navigate('SQL')}>
            <Image source={require('../MyNewExpoProject/assets/sql2 1.png')} style={styles.image} />
            <Text style={styles.text}>SQL</Text>
          </TouchableOpacity>
        </View>
        {/* ----------------------------------------c++------------------------------------------- */}
        <View style={styles.box}>
          <TouchableOpacity onPress={() => navigation.navigate('C++')}>
            <Image source={require('../MyNewExpoProject/assets/c++ 1.png')} style={styles.image} />
            <Text style={styles.text}>C++</Text>
          </TouchableOpacity>
        </View>
        {/* -------------------------------------javascript------------------------------------------ */}
        <View style={styles.box}>
          <TouchableOpacity onPress={() => navigation.navigate('JavaScript')}>
            <Image source={require('../MyNewExpoProject/assets/javascript 1.png')} style={styles.image} />
            <Text style={styles.text}>JavaScript</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="C" component={CinstructionPage} />
        <Stack.Screen name="Python" component={Python} />
        <Stack.Screen name="Java" component={Java} />
        <Stack.Screen name="SQL" component={SQL} />
        <Stack.Screen name="C++" component={CPlus} />
        <Stack.Screen name="JavaScript" component={Javascript} />
        <Stack.Screen name="CTestpage" component={CTestpage} />
        <Stack.Screen name="JavaTestpage" component={JavaTestpage} />
        <Stack.Screen name="JavascriptTestpage" component={JavascriptTestpage} />
        <Stack.Screen name="CPlusTestpage" component={CPlusTestpage} />
        <Stack.Screen name="PythonTestpage" component={PythonTestpage} />
        <Stack.Screen name="SQLTestpage" component={SQLTestpage} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    justifyContent: 'center',
  },
  icon: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  box: {
    width: 130,
    height: 150,
    margin: 15,
    backgroundColor: '#FFFDFD',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 20,
    borderRadius: 20,
    elevation: 5,
    flexDirection: 'column',

  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  content: {

    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#E9D6F5',
    position: 'absolute',
    bottom: 2,
    paddingTop: 120,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38
  },
  image: {
    width: 96,
    height: 92,
    margin: 5,
  },
});

export default App;
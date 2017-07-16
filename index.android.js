import React from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  StyleSheet,
  Alert,
  TextInput,
  ListView,
  FlatList,
  ListItem
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  
  static navigationOptions = {
  title: 'Main Page',
  };
  
  constructor(props){
    super(props)
    
    this.state = {
    username: '',
    password: '',
    login: '',
    }
    
    this.mortgageAmount;
    this.interest;
    this.payment;
    this.months = 0;
    var array = [];
    
    var kreditdauerM;
    var kreditdauerJ;
    
  }
  
  _handlePress() {
    
    const {navigate} = this.props.navigation;
    
    mortgageAmount = this.state.username;
    interest = this.state.password;
    payment = this.state.login;
    months = this.state.months;
    array = this.state.array;
    console.log("Mortgage amount: " + mortgageAmount);
    console.log("Interest rate: " + interest);
    console.log("Montly payment: " + payment);
    
    if (mortgageAmount == null || mortgageAmount == "" || interest == null || interest == "" || payment == null || payment == "") {
      alert("Some of the values are invalid.");
    } else {
    
    this._calculateMortgage();
    
    navigate('Chat');
    }
  }
  
   _calculateMortgage() {
     
    array = [];
    
    while (mortgageAmount > payment) {
      var tilgung = payment - (mortgageAmount*(interest/100))/12;
      mortgageAmount = mortgageAmount - tilgung;
      this.months++;
      array.push(this.months + ". Rest: " + mortgageAmount.toFixed(2) + "€ Tilgung: " + tilgung.toFixed(2) + "€ Zinsen: " + (payment-tilgung).toFixed(2)) + "€";
      //this.array.push("I was pushed into array");
    }
    
    kreditdauerM = this.months+1;
    kreditdauerJ = (kreditdauerM/12).toFixed(1);
    
    console.log(kreditdauerM + "Letzter Monat mit Restbetrag von " + mortgageAmount + " Kredit ausbezahlt");
    console.log("Kreditdauer " + kreditdauerM + " Monate oder ca. " + kreditdauerJ + " Jahre");
    console.log("---------------------");
    console.log(array);
     
     var c2 = new ChatScreen();
     c2._createDataSource();
    
    this.months = 0;
    
  }
  
  _getArray() {
    //array.push("shits broken mate");
    return (array);
    console.log("_get Array has this: " + array);
  }
  
  _getKreditdauerM() {
    return(kreditdauerM);
  }
  
  _getKreditdauerJ() {
    return(kreditdauerJ.toFixed(2));
  }
  
  
  render() {
    const { navigate } = this.props.navigation;
    return (
            
            <View style={styles.container}>
            <Text style={styles.welcome}>
            Mortgage amount
            </Text>
            
            <TextInput
            style={{textAlign: 'center', marginTop: 0, marginBottom: 10, borderColor: 'gray', borderWidth:0, height: 45, width: 250, fontSize: 20}}
            //placeholder="ayy lmao"
            keyboardType = {'numeric'}
            onChangeText={(text) => this.setState({username:text})}
            />
            
            <Text style={styles.welcome}>
            Interest rate, %
            </Text>
            
            <TextInput
            style={{textAlign: 'center', marginTop: 0, marginBottom: 10, borderColor: 'gray', borderWidth:0, height: 45, width: 250, fontSize: 20}}
            //placeholder="uwot"
            keyboardType = {'numeric'}
            onChangeText={(text) => this.setState({password:text})}
            />
            
            <Text style={styles.welcome}>
            Monthly payment
            </Text>
            
            <TextInput
            style={{textAlign: 'center', marginTop: 0, marginBottom: 10, borderColor: 'gray', borderWidth:0, height: 45, width: 250, fontSize: 20}}
            keyboardType = {'numeric'}
            onChangeText={(text) => this.setState({login:text})}
            //placeholder="m8"
            />
            
            <Button
            //onPress={() => navigate('Chat')}
            onPress={() => this._handlePress()}
            title="Calculate"
            color="#841584" />
            
            </View>
            
            /*<View>
            <Text>Hello, Chat App!</Text>
            <Button
            onPress={() => navigate('Chat')}
            title="Calculate"
            />
            </View>*/
            );
  }
}

class ChatScreen extends React.Component {
  
  constructor(props) {
    super(props);
    
    
    
    var c1 = new HomeScreen();
    
    /*this.newarray = c1._getArray();
    console.log("i got dis array" + this.newarray);
    
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state = {
    dataSource: ds.cloneWithRows(this.newarray),
  };*/
  
  } //end of constructor
  
  _createDataSource() {
   
    var c1 = new HomeScreen();
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.newarray = c1._getArray();
    /*this.state = {
    dataSource: ds.cloneWithRows(this.newarray),
    };*/
    console.log("this is what i got now: " + this.newarray);
    dataSource = ds.cloneWithRows(this.newarray);
    
  }
  
  static navigationOptions = {
  title: 'Monthly breakdown',
  };
  render() {
    
    
    return (
            
            <View style={styles.listview}>
            <ListView
            //dataSource={this.state.dataSource}
            dataSource={dataSource}
            renderRow={(data) => <View><Text>{data}</Text></View>}
            />
            
            <Text style={styles.instructions}>
            Mortgage repaid in {kreditdauerM} months or {kreditdauerJ} years
            </Text>
            
            </View>
            
            
            );
  }
}

const SimpleApp = StackNavigator({
                                 Home: { screen: HomeScreen },
                                 Chat: { screen: ChatScreen },
                                 });

const styles = StyleSheet.create({
                                 container: {
                                 flex: 1,
                                 //justifyContent: 'center',
                                 alignItems: 'center',
                                 padding: 30,
                                 backgroundColor: '#FFFFFF',
                                 },
                                 welcome: {
                                 fontSize: 20,
                                 textAlign: 'center',
                                 margin: 10,
                                 },
                                 instructions: {
                                 textAlign: 'center',
                                 color: '#333333',
                                 marginBottom: 0,
                                 justifyContent: 'center',
                            
                                 },
                                 listview: {
                                 flex: 10,
                                 backgroundColor: '#FFFFFF',
                                 padding: 5,
                                 },
                                 bottombar: {
                                 flex: 4,
                                 backgroundColor: '#00FF00',
                                 padding: 10,
                                 },
                                 });

AppRegistry.registerComponent('TestProject', () => SimpleApp);

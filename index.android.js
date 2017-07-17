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
    }
    
    kreditdauerM = this.months+1;
    kreditdauerJ = (kreditdauerM/12).toFixed(1);
     
     var c2 = new ChatScreen();
     c2._createDataSource();
    
    this.months = 0;
    
  }
  
  _getArray() {
    return (array);
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
            keyboardType = {'numeric'}
            onChangeText={(text) => this.setState({username:text})}
            />
            
            <Text style={styles.welcome}>
            Interest rate, %
            </Text>
            
            <TextInput
            style={{textAlign: 'center', marginTop: 0, marginBottom: 10, borderColor: 'gray', borderWidth:0, height: 45, width: 250, fontSize: 20}}
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
            />
            
            <Button
            onPress={() => this._handlePress()}
            title="Calculate"
            color="#841584" />
            
            </View>
            
            );
  }
}

class ChatScreen extends React.Component {
  
  constructor(props) {
    super(props);
    
    var c1 = new HomeScreen();
  
  } //end of constructor
  
  _createDataSource() {
   
    var c1 = new HomeScreen();
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.newarray = c1._getArray();
    dataSource = ds.cloneWithRows(this.newarray);
    
  }
  
  static navigationOptions = {
  title: 'Monthly breakdown',
  };
  render() {
    
    
    return (
            
            <View style={styles.listview}>
            <ListView
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

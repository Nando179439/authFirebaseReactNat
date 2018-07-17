import React, { Component} from 'react';
import { View } from 'react-native';
import Header from './common/Header';
import Button from './common/Button';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Spinner from './common/Spinner';
import * as firebase from 'firebase';
import LoginForm from './LoginForm';


class App extends Component {
    state = { loggedIn: null };
    
    componentWillMount() {
        const firebaseConfig = {
            apiKey: 'AIzaSyAymtoxynwiLQljiqSKRkVc_IgoWF6hGBY',
            authDomain: 'authentication-7efa0.firebaseapp.com',
            databaseURL: 'https://authentication-7efa0.firebaseio.com',
            projectId: 'authentication-7efa0',
            storageBucket: 'authentication-7efa0.appspot.com',
            messagingSenderId: '922910390579'
        };
        const firebaseApp = firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState( {loggedIn: true })
            } else {
                this.setState( {loggedIn: false })
            }
        });
    };

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button>
                                Log out
                            </Button>
                        </CardSection>
                    </Card>
                );
            case false:
                return <LoginForm />;
            default:
                return (
                    <View>
                        <Spinner size = {'large'} />
                    </View>
                );
        }
    }

    render () {
        return (
            <View>
                <Header headerText='Authentication'></Header>
                {this.renderContent()}
            </View>
        );
    };
}

export default App;
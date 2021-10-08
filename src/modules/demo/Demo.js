import React from 'react';

import { useKeephub } from 'keephub-plugin-bridge';
import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import Page from '../../components/page/Page';

const Demo = () => {
    const { user, userGroups, languages, bridge, orgunits: orgUnits } = useKeephub();
    const history = useHistory();

    const { name, email, groups=[], orgunits=[], preferredLanguage } = user?.user ?? user; // user.user fix

    const navigateVnext = () => {
        bridge.navigate('home');
    }

    const navigatePlugin = () => {
        history.push('/demo2');
    }

    return (
        <Page>

            <Container maxWidth="sm">

                <Card style={{marginBottom: 10}}>
                    <CardHeader title="Demo plugin" style={{height: '40px' }} />
                    <CardContent>

                        <div style={{marginBottom: 30}}>
                            <Typography variant="h6">Gebruiker:</Typography>
                            <Typography>{ name }</Typography>
                            <Typography>{ email }</Typography>
                        </div>

                        <div style={{marginBottom: 30}}>
                            <Typography variant="h6">Groepen:</Typography>
                            {
                                groups.map((group, index) => {
                                    const { name } = userGroups[group];

                                    if (name[preferredLanguage]) {
                                        return <Typography key={index}>{ name[preferredLanguage] }</Typography>
                                    }else {
                                        return <Typography key={index}>No translation</Typography>
                                    }
                        
                                })
                            }
                        </div>

                        <div style={{marginBottom: 30}}>
                            <Typography variant="h6">Organisatie:</Typography>
                            {
                                orgunits.map((unit, index) => {
                                    const { name } = orgUnits[unit];
                   
                                    return <Typography key={index}>{ name}</Typography>
                              
                                })
                            }
                        </div>

                        
                        <div style={{marginBottom: 30}}>
                            <Typography variant="h6">Talen:</Typography>
                            {
                                languages.map((language, index) => {
                                    return <Typography key={index}>{ language }</Typography>
                                })
                            }
                        </div>

                    </CardContent>
                </Card>

                <Card style={{marginBottom: 10}}>
                    <CardHeader title="Navigatie" style={{height: '40px' }} />
                    <CardContent>
                        <Button variant="contained" color="primary" style={{marginRight: 20}} onClick={ navigateVnext }> vNext naar home </Button>  
                        <Button variant="contained" color="primary" onClick={ navigatePlugin }> Plugin navigatie </Button> 
                    </CardContent>
                </Card>

                <Card style={{marginBottom: 10}}>
                    <CardHeader title="Plugins" style={{height: '40px' }} />
                    <CardContent>

                        <Typography variant="h6">Interface:</Typography>
                        <a href="https://material-ui.com/">Material ui</a><br/><br/>

                        <Typography variant="h6">Navigatie:</Typography>
                        <a href="https://reacttraining.com/react-router/">React router</a><br/><br/>

                        <Typography variant="h6">Data opslag: </Typography>

                        <a href="https://redux.js.org/">Redux</a><br/>
                        <a href="https://github.com/rt2zz/redux-persist">Redux-persist</a><br/>
                        <a href="https://github.com/reduxjs/reselect">Reselect</a><br/>
                        
                        
                    </CardContent>
                </Card>

            </Container>
            
        </Page> 
    );

}

export default Demo;
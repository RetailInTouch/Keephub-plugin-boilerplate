import React from 'react';

import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Page from '../../components/page/Page';

const Demo2 = () => {
    const history = useHistory();

    const navigateBack = () => {
        history.push('/');
    }
 
    return (
        <Page>

            <Container maxWidth="sm">

                <Card style={{marginBottom: 10}}>
                    <CardHeader title="Demo plugin" style={{height: '40px' }} />
                    <CardContent>

                        <Button variant="contained" color="primary" onClick={ navigateBack }>
                            Terug
                        </Button> 
                    </CardContent>
                </Card>

            </Container>
            
        </Page> 
    );
    
}

export default Demo2;
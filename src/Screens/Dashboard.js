import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import 'typeface-roboto'

class Dashboard extends Component {
    render() {

        const { categories } = this.props;
        return (
            <div className="App">

                <div style={{ margin: '80px 3% 3% 3%' }}>

                    {categories.map((value, index) => {
                        return (

                            <Card
                                // className={classes.card}
                                style={{ maxWidth: 345, display: 'inline-block', margin: '1%' }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        // className={classes.media}
                                        style={{ objectFit: 'cover' }}
                                        height="160"
                                        image={value.image}
                                        title={value.name}
                                    />

                                    <CardContent> 
                                        <Typography variant= 'h6'>{value.name}</Typography>
                                    </CardContent>

                                </CardActionArea>

                                <CardActions> 
                                    <Button size="small" color="primary">
                                        Report File 
                                    </Button>

                                </CardActions>

                            </Card>
                        )
                    })}
                </div>

            </div>
        );
    }
}

export default Dashboard;
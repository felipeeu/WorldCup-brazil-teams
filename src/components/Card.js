import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        width: 250,
        margin:10
    },
    media: {
        height: 0,
        paddingTop: 350,

    },
};

function SimpleMediaCard(props) {
    const {classes, name, position, img} = props;
    return (
        <div>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={img}
                    title={name}
                />
                <CardContent>
                    < Typography
                    gutterBottom
                    variant = "headline"
                    component = "h2" >
                        {name}
                    </Typography>
                    < Typography
                    component = "p" >
                        {position}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);

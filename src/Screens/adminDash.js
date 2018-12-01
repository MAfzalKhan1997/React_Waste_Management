import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Avatar from '@material-ui/core/Avatar';

import 'typeface-roboto'

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
        // alignItems: 'left',
        textAlign: 'left',
    },
    column: {
        flexBasis: '70%',
        // alignItems: 'left',
        // textAlign: 'left',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        // padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        paddingLeft: `${theme.spacing.unit * 2}px`,
        marginRight: '-20px'
        // alignItems: 'right',
        // textAlign: 'left',
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        textTransform: 'capitalize',
        fontWeight: 'bolder',
        // '&:hover': {
        //     textDecoration: 'underline',
        // },
    },
    bigAvatar: {
        // boxShadow: '0 0 40px rgb(155, 0, 72)',
        marginRight: 20,
        width: 60,
        height: 60,
    },

    // paper: {
    //     position: 'absolute',
    //     maxWidth: theme.spacing.unit * 50,
    //     backgroundColor: theme.palette.background.paper,
    //     boxShadow: theme.shadows[5],
    //     padding: theme.spacing.unit * 4,
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: '70%',
    //     borderRadius: '5px'
    // },

    // popupAvatar: {
    //     boxShadow: '0px 0px 0px 12px rgba(42, 196, 127, 0.9), 0px 0px 0px 28px rgba(42, 196, 127, 0.2)',
    //     margin: '10px -10px',
    //     width: 100,
    //     height: 100,
    // },
});


class AdminDash extends Component {

    constructor() {
        super()

        this.state = {
            complainers: [],

            // postPopup: true
        }
    }


    getData() {

        let { complainers } = this.state;
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));
 
        firebase.database().ref(`/complaints`).on('value', (data) => {
            complainers = []
            let child = data.val()
            // console.log(child)
            for (let key in child) {
                coomplainers.push(child[key])
            }

            this.setState({
                complainers,
            }) 
        })
    }

    componentWillMount() {
        this.getData()
    }

    acceptComplaint(complaint, status) {

        const complaintObj = {
            displayName: complaint.displayName,
            avatarURL: complaint.avatarURL,
            contact: complaint.contact,
            email: complaint.email,
            uid: complaint.uid,
 
            status: status,
            selectedDate: complaint.selectedDate,
            selectedLoc: complaint.selectedLoc,
            key: complaint.key,
        }

        firebase.database().ref(`/complaints/${complaint.uid}/+${complaint.key}`).set(complaintObj)
            .then(resp => {
                console.log('***',resp)
            })
    }

    render() {

        // const { categories } = this.props;
        const { complainers } = this.state;

        return (
            <div>
                {
                    complainers.length !== 0 ?
                        // 'meetings available'

                        <div className={classes.root}>

                            {complainers.map((value, index) => {
                                let complaints = []

                                // let data = value
                                for (let key in value) {
                                    // console.log(value[key])
                                    complaints.push(data[key])
                                    // console.log(complaints)
                                }
                                return <ExpansionPanel key={index}>

                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <div>
                                            <Avatar
                                                className={classes.bigAvatar} 
                                                alt={value.displayName}// isme funtion se get huawa data dalna ha user ki profile ka
                                                src={value.avatarURL}// isme funtion se get huawa data dalna ha user ki profile ka
                                            />
                                        </div>
                                        <div style={{ textAlign: 'left', }}>
                                            <Typography variant="body2">profile se get huwa name</Typography> 
                                            {/* <Typography variant="caption">4.5</Typography> */}
                                        </div>
                                    </ExpansionPanelSummary>

                                    {complaints.map((value, index) => {

                                        let event = {
                                            title: `Take action on ${'profile se get huawa name'} Request`,
                                            description: `${value.description}`,
                                            // location: `${value.selectedLoc.name},${value.selectedLoc.location.address},${value.selectedLoc.location.city},${value.selectedLoc.location.country}`,
                                            // startTime: `${moment(value.selectedDate).zone("-00:00").format('LLLL')}`,
                                            // endTime: `${moment(value.selectedDate).add(value.duration[0], 'm').zone("-00:00").format('LLLL')}`
                                        };
                                        let icon = { textOnly: 'none' };
                                        let items = [
                                            { google: 'Google' },
                                            { apple: 'Apple' },
                                            // { yahoo: 'Yahoo!' },
                                        ];

                                        return <div key={index} >

                                            <ExpansionPanelDetails className={classes.details}>
                                                {/* <div className={classes.column} /> */}
                                                <div className={classes.column}>
                                                    <Typography variant="subheading">{value.selectedLoc.name}</Typography>
                                                    <Typography variant="body1">{value.selectedDate}</Typography>
                                                </div>
                                                <div className={classes.helper}>
                                                    <Typography variant="body1">{value.selectedLoc.location.address}</Typography>
                                                    <Typography variant="caption">
                                                        Status: <span className={classes.link}>{value.status}</span>
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelDetails>

                                            {(value.status !== 'PENDING') &&
                                                <div style={{ marginTop: '-10px' }}>
                                                    <AddToCalendar
                                                        event={event}
                                                        buttonTemplate={icon}
                                                        listItems={items}
                                                        buttonLabel="Add to Calendar"
                                                    />
                                                </div>
                                            }

                                            <Divider />
                                            <ExpansionPanelActions>
                                                <Button size="small"
                                                    disabled={value.status !== 'PENDING' ? true : false}
                                                    onClick={() => this.acceptComplaint(value, 'ACCEPTED')}
                                                >
                                                    Accept
                                                </Button>
                                            </ExpansionPanelActions>

                                        </div>
                                    })}

                                </ExpansionPanel>
                            })
                            }

                        </div>
                        :
                        <Typography variant="subtitle2" >
                            You haven’t any request yet!
                        </Typography>
                }
            </div>
        );
    }
}


AdminDash.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminDash);
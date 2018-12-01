import React, { Component } from 'react';
// import './Dashboard.css';

// import firebase from '../../../Config/firebase';
// import AddToCalendar from "react-add-to-calendar";
// import 'react-add-to-calendar/dist/react-add-to-calendar.css'
// import moment from "moment";

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

import Modal from '@material-ui/core/Modal';

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
        // marginRight: '20px',
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

    paper: {
        position: 'absolute',
        maxWidth: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        borderRadius: '5px'
    },

    popupAvatar: {
        boxShadow: '0px 0px 0px 12px rgba(42, 196, 127, 0.9), 0px 0px 0px 28px rgba(42, 196, 127, 0.2)',
        margin: '10px -10px',
        width: 100,
        height: 100,
    },
});


class DashRequests extends Component {

    constructor() {
        super()

        this.state = {
            complaints: [],

            postPopup: true
        }
    }

    getData() {

        let { complaints } = this.state;

        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        firebase.database().ref(`/complaints/${userProfile.uid}/`).on('value', (data) => {
            complaints = []
            let child = data.val()

            for (let key in child) {
                complaints.push(child[key])
            }
            this.setState({
                complaints,
            })

        })
    }


    componentWillMount() {
        this.getData()
    }

    giveReview(complaint, status) {

        // const { complaints } = this.state;

        const complaintObj = {
            displayName: complaint.displayName,
            avatarURL: complaint.avatarURL,
            contact: complaint.contact,
            email: complaint.email,
            uid: complaint.uid,

            status: status,
            snapURL: complaint.snapURL,
            selectedDate: complaint.selectedDate,
            selectedLoc: complaint.selectedLoc,
            key: complaint.key,
        }

        // console.log(meetingObj)

        firebase.database().ref(`/complaints/${complaint.uid}/+${complaint.key}`).set(complaintObj)
            .then(resp => {
                console.log('***', resp)
            })

    }


    postPopupClose = () => {
        this.setState({ postPopup: false });
    };

    render() {
        // console.log(this.state.complaints)

        const { complaints } = this.state;
        const { classes } = this.props;

        return (
            <div>
                {
                    complaints.length !== 0 ?

                        <div className={classes.root}>

                            {complaints.map((value, index) => {

                                return <div key={index}>

                                    {value.status === 'done' &&

                                        <Modal
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                            open={this.state.postPopup}
                                            onClose={this.postPopupClose}
                                        >
                                            <center>
                                                <div className={classes.paper}>

                                                    <Typography variant="h6" id="modal-title">
                                                        Hey, {'yahan pr hmara naam iga'} !
                                                    </Typography>

                                                    <br />
                                                    <Typography style={{ fontSize: '18px' }} variant="body2" id="modal-title" >
                                                        Are you Satisfied with our work ?
                                                                </Typography>
                                                    <br />

                                                    <img
                                                        src={value.snapURL}
                                                        alt='Effected Area'
                                                    />

                                                    <Typography variant="caption" id="modal-title">
                                                        {/* Thursday, Nov 12, 2018, 4:05 A.M */}
                                                        Reported Date and Time: {value.selectedDate}
                                                    </Typography>
                                                    <br />

                                                    <Button variant="contained" color="primary" autoFocus onClick={() => this.giveReview(value, 'UNSATISFIED')} >
                                                        Unsatisfied
                                                    </Button> &nbsp; &nbsp;
                                                    <Button variant="contained" color="secondary" onClick={() => this.giveReview(value, 'SATISFIED')} >
                                                        Satisfied
                                                    </Button>

                                                </div>
                                            </center>
                                        </Modal>
                                    }

                                    <ExpansionPanel>

                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <div>
                                                <Typography variant="body1">{value.selectedDate}</Typography>
                                            </div>
                                            <div >
                                                <Typography variant="caption">
                                                    Status: <span className={classes.link}>{status}</span>
                                                </Typography>
                                            </div>
                                        </ExpansionPanelSummary>

                                        <ExpansionPanelDetails className={classes.details}>
                                            <div >
                                                <img
                                                    src={value.snapURL}
                                                    alt='Effected Area'
                                                />
                                            </div>
                                        </ExpansionPanelDetails>

                                        <Divider />

                                        <ExpansionPanelActions>

                                        </ExpansionPanelActions>

                                    </ExpansionPanel>
                                </div>
                            })
                            }

                        </div>
                        :
                        <Typography variant="subtitle2" >
                            You haven’t file any report yet!
                        </Typography>
                }
            </div>
        );
    }
}


DashRequests.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashRequests);
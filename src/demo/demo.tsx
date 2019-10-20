import React, { useState } from 'react';
import {
    Box,
    Toolbar,
    Container,
    makeStyles,
    createStyles,
    Typography,
    Button,
    Grid,
    Snackbar,
    IconButton,
    SnackbarContent,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { ImagePicker } from 'react-file-picker';

import { demoData } from '../data';
import { computeScore } from '../shared/service';
import { Presets } from './';
import { Evaluation } from '../data/demo/scores';
import { Addresses } from './addresses';
import { Evaluation as EvalComp } from './evaluation';

const useStyles = makeStyles(
    (theme) => createStyles({
        demo: {
            paddingTop: 25,
            marginBottom: 50,
        },
        title: {
            color: theme.palette.secondary.main,
            marginBottom: 20,
            marginTop: '5%',
            userSelect: 'none',
        },
        description: {
            maxWidth: 450,
            margin: 'auto',
        },
        center: {
            margin: 'auto',
        },
        container: {
            paddingTop: '32px',
            paddingBottom: '32px',
        },
        close: {
            padding: theme.spacing(0.5),
            color: 'white',
        },
        error: {
            backgroundColor: theme.palette.error.dark,
            color: 'white',
        },
        customViewer: {
            height: '400px',
        },
        viewerPlaceholder: {
            height: '100%',
            width: '400px',
        },
    }),
);

export const Demo: React.FC = () => {
    const classes = useStyles();

    const initializer: Evaluation = {
        imgAlt: '',
        imgSrc: '',
        isLoaded: false,
        payload: [],
        score: 0,
    };

    const [state, setState] = useState({
        snackBarOpen: false,
        snackBarMessage: '',
        evaluation: initializer,
    });

    const fileConfirmed = (base64: string) => {
        const address = 'TEST';

        computeScore({
            address,
            image: base64.split(',')[1], // Strip out the type
        }).then((result) => {
            if (!result.result || result.result.length === 0) {
                snackbarError('Error Processing Image.');
                return;
            }

            // Set state to the correct response with image
            const evaluation: Evaluation = {
                imgAlt: address,
                imgSrc: base64,
                isLoaded: false,
                payload: result.result[0],
                score: result.score,
            };

            setState({
                snackBarOpen: false,
                snackBarMessage: '',
                evaluation,
            });
        }).catch(() => snackbarError('Error Processing Image.'));
    };

    const snackbarError = (error: string) => {
        setState({
            snackBarOpen: true,
            snackBarMessage: error,
            evaluation: initializer,
        });
    };

    const snackBarClose = () => {
        setState({
            snackBarOpen: false,
            snackBarMessage: '',
            evaluation: initializer,
        });
    };

    return (
        <>
            <Box minHeight='100vh'>
                <Toolbar/>
                <Container
                    maxWidth='lg'
                    className={classes.demo}
                >
                    <Typography
                        variant='h1'
                        align='center'
                        className={classes.title}
                    >
                        {demoData.title}
                    </Typography>
                    <Typography
                        variant='h6'
                        align='center'
                        className={classes.description}
                    >
                        {demoData.description}
                    </Typography>
                    <Presets/>
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        spacing={4}
                        className={classes.container}
                    >
                        <Grid item>
                            <ImagePicker
                                extensions={['jpg', 'jpeg', 'png']}
                                dims={{minWidth: 100, maxWidth: 1000, minHeight: 100, maxHeight: 1000}}
                                onChange={fileConfirmed}
                                onError={snackbarError}
                            >
                                <Button
                                    variant='outlined'
                                    color='secondary'
                                    size='large'
                                >
                                    Upload Image
                                </Button>
                            </ImagePicker>
                        </Grid>
                        <Grid item className={classes.customViewer}>
                            {
                                state.evaluation.imgSrc &&
                                <EvalComp {...state.evaluation}/>
                            }
                            {
                                !state.evaluation.imgSrc &&
                                <Box
                                    className={classes.viewerPlaceholder}
                                    border={1}
                                    borderColor='secondary.main'
                                    borderRadius={16}
                                />
                            }
                        </Grid>
                    </Grid>
                    <Addresses/>
                </Container>
            </Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={state.snackBarOpen}
                autoHideDuration={6000}
                onClose={snackBarClose}
            >
                <SnackbarContent
                    className={classes.error}
                    action={[
                        <IconButton
                            key='close'
                            aria-label='close'
                            className={classes.close}
                            onClick={snackBarClose}
                        >
                            <Close/>
                        </IconButton>,
                    ]}
                    message={<span>{state.snackBarMessage}</span>}
                />
            </Snackbar>
        </>
    );
};

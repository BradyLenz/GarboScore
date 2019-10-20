import React from 'react';
import {
    createStyles,
    makeStyles,
    Grid,
    Box,
    Typography,
} from '@material-ui/core';

import { timelineData } from '../data';

const useStyles = makeStyles(
    (theme) => createStyles({
        header: {
            margin: 'auto',
            marginBottom: 40,
        },
        stepHeader: {
            scrollMarginTop: 32,
            marginBottom: 32,
        },
        snapshotHeader: {
            color: theme.palette.text.hint,
        },
        image: {
            height: 300,
        },
        hr: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            margin: 'auto',
            marginBottom: 32,
            '&::before': {
                backgroundColor: theme.palette.text.hint,
                content: '""',
                display: 'block',
                height: 2,
                position: 'relative',
                verticalAlign: 'middle',
                width: 100,
                maxWidth: 200,
                marginRight: 10,
                top: 3,
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                },
            },
            '&::after': {
                backgroundColor: theme.palette.text.hint,
                content: '""',
                display: 'block',
                height: 2,
                position: 'relative',
                verticalAlign: 'middle',
                width: 100,
                maxWidth: 200,
                marginLeft: 10,
                top: 3,
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                },
            },
        },
    }),
);

export const Timeline: React.FC = () => {
    const classes = useStyles();
    return (
        <Box>
            <Typography
                variant='h3'
                align='center'
                color='secondary'
                className={classes.header}
            >
                {timelineData.header}
            </Typography>
            <Grid
                container
                justify='center'
                direction='column'
                wrap='nowrap'
                spacing={4}
            >
                {
                    timelineData.snapshots.map((snapshot, index) => {
                        return (
                            <Grid
                                item
                                key={index}
                            >
                                <Typography
                                    variant='h6'
                                    align='center'
                                    color='secondary'
                                    className={classes.stepHeader}
                                >
                                    Step {index + 1}
                                </Typography>
                                <Box className={classes.hr}>
                                    <Typography
                                        variant='h4'
                                        align='center'
                                        className={classes.snapshotHeader}
                                    >
                                        {snapshot.header}
                                    </Typography>
                                </Box>
                                <Grid
                                    container
                                    direction={(index % 2 === 0) ? 'row' : 'row-reverse'}
                                    spacing={4}
                                >
                                    <Grid item>
                                        <Typography
                                            variant='body1'
                                            align={(index % 2 === 0) ? 'right' : 'left'}
                                        >
                                            {snapshot.description}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <img
                                            src={snapshot.image.imgSrc}
                                            alt={snapshot.image.imgAlt}
                                            className={classes.image}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
};
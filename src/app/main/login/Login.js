import React, {useState} from 'react'
import {Card, CardContent, Typography, Tabs, Tab} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import JWTLoginTab from './tabs/JWTLoginTab';
import FirebaseLoginTab from './tabs/FirebaseLoginTab';
import Auth0LoginTab from './tabs/Auth0LoginTab';
import OfficeLoginTab from './tabs/OfficeLoginTab';
import {makeStyles} from '@material-ui/styles';
import Language from '../../fuse-configs/languageConfig';

const useStyles = makeStyles(theme => ({
    root: {
        background:
            "linear-gradient(to right, " +
            theme.palette.primary.dark +
            " 0%, " +
            darken(theme.palette.primary.dark, 0.5) +
            " 100%)",
        color: theme.palette.primary.contrastText
    }
}));

const loginOptions = true;
const availableOptions = ['office','jwt'];

function Login()
{
    const [userInfo, setUserInfo] = useState(null);
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('selectedTab') ? parseInt(localStorage.getItem('selectedTab')) : 0 );

    function accountInfoCallback(user)
    {
        setUserInfo(user);
    }

    function handleTabChange(event, value)
    {
        setSelectedTab(value);
        localStorage.setItem('selectedTab', selectedTab);
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

                <FuseAnimate animation="transition.expandIn">
                    <img
                        className="w-256 mb-64"
                        src="assets/images/logos/siigo.png"
                        alt="logo"
                    />
                </FuseAnimate>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h3" color="inherit" className="font-light">
                        {Language.Login.welcome}
                    </Typography>
                </FuseAnimate>

                <FuseAnimate delay={400}>
                    <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                        {Language.Login.quote}
                    </Typography>
                </FuseAnimate>
            </div>

            <FuseAnimate animation={{translateX: [0, '100%']}}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="text-center md:w-full mb-48">{Language.Login.openText}</Typography>

                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            className="w-full mb-32"
                            style={{display: loginOptions ? 'block' : 'none' }}
                        >
                            <Tab
                                icon={<img className="h-40" src="assets/images/logos/jwt.svg" alt="firebase"/>}
                                className="min-w-0"
                                style = {{display: availableOptions.find( function(data) {
                                    return data === 'jwt'
                                    })  ? 'block' : 'none'}}
                                label="JWT"
                            />
                            <Tab
                                icon={<img className="h-40" src="assets/images/logos/firebase.svg" alt="firebase"/>}
                                className="min-w-0"
                                style = {{display: availableOptions.find( function(data) {
                                        return data === 'firebase'
                                    })  ? 'block' : 'none'}}
                                label="Firebase"
                            />
                            <Tab
                                icon={<img className="h-40" src="assets/images/logos/auth0.svg" alt="auth0"/>}
                                className="min-w-0"
                                style = {{display: availableOptions.find( function(data) {
                                        return data === 'auth0'
                                    })  ? 'block' : 'none'}}
                                label="Auth0"
                            />
                            <Tab
                                icon={<img className="h-40" src="assets/images/logos/office.svg" alt="office"/>}
                                className="min-w-0"
                                style = {{display: availableOptions.find( function(data) {
                                        return data === 'office'
                                    })  ? 'block' : 'none'}}
                                label="Office"
                            />
                        </Tabs>

                        {selectedTab === 0 && <JWTLoginTab/>}
                        {selectedTab === 1 && <FirebaseLoginTab/>}
                        {selectedTab === 2 && <Auth0LoginTab/>}
                        {selectedTab === 3 && <OfficeLoginTab accountInfoCallback={accountInfoCallback}/>}

                        {userInfo && (
                            <div>
                                {JSON.stringify(userInfo)}
                            </div>
                        )}

                        <div className="flex flex-col items-center justify-center pt-32" style={{display: 'none'}}>
                            <Link className="font-medium" to="/register">{Language.Login.signUpText}</Link>
                        </div>

                    </CardContent>
                </Card>
            </FuseAnimate>
        </div>
    )
}

export default Login;

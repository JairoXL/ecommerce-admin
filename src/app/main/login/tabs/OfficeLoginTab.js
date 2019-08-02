import React from 'react';
import { AzureAD, LoginType, MsalAuthProviderFactory } from 'react-aad-msal';
import {AUTH_CONFIG} from '../../../services/officeService/officeServiceConfig';
import Language from "../../../fuse-configs/languageConfig";
import { basicReduxStore } from "../../../reducer/auth/reduxStore";
import {Button} from "@material-ui/core";
//import {useDispatch} from 'react-redux';

function OfficeLoginTab(props)
{

    function unauthenticatedFunction (loginFunction) {
        return (<Button onClick={loginFunction}
                       type="submit"
                       variant="contained"
                       color="primary"
                       className="w-full mx-auto mt-16 normal-case">
                {Language.Login.submitOfficeButton}
                </Button>);
    }

    function userJustLoggedIn (receivedAccountInfo) {
        props.accountInfoCallback(receivedAccountInfo);
    }

    function authenticatedFunction(logout){
        return (
            <div>
                You're logged in!
                <Button onClick={logout}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case">
                    {Language.Login.signOutText}
                </Button>
            </div>
        );
    }

    return (
        <AzureAD
            provider={
                new MsalAuthProviderFactory(
                    {
                        auth: {
                            clientId: AUTH_CONFIG.clientId,
                            authority: AUTH_CONFIG.authority,
                            redirectUri: 'http://localhost:3000/login',
                            postLogoutRedirectUri: 'http://localhost:3000/login',
                        },
                        cache: {
                            cacheLocation: 'localStorage',
                            storeAuthStateInCookie: true,
                        },
                    },
                    {
                        scopes: ['openid'],
                    },
                    LoginType.Popup,
                )
            }
            unauthenticatedFunction={unauthenticatedFunction}
            reduxStore={basicReduxStore}
            authenticatedFunction={authenticatedFunction}
            accountInfoCallback={userJustLoggedIn}
        />
    );
}

export default OfficeLoginTab;

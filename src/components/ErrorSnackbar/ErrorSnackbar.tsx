import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import { AppRootStateType } from '../../app/store'
import {useDispatch, useSelector } from 'react-redux'
import { setAppErrorAC } from '../../app/app-reducer'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    //const [open, setOpen] = React.useState(true)

    const error = useSelector<AppRootStateType, string | null>(state=>state.app.error)
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
        //setOpen(false)
    }

    return (
        <Snackbar open={error!== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                This is an error message!
            </Alert>
        </Snackbar>
    )
}


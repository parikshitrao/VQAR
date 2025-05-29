import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
/**
 * @component
 * @returns 
 */
export default function MySnackbar({ open, handleClose, msg }) {
	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
				{msg}
			</Alert>
		</Snackbar>
	);
}

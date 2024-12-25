import {
    Button, 
    Dialog,
    DialogActions,
    DialogContent, 
    DialogContentText, 
    DialogTitle,
} from '@mui/material'
import { darkBorder, cardGradient } from '../constants/color'

const confirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            PaperProps={{
                sx: {
                    background: cardGradient,
                    border: `1px solid ${darkBorder}`,
                    minWidth: { xs: "300px", sm: "400px" },
                }
            }}
        >
            <DialogTitle sx={{ color: "white", borderBottom: `1px solid ${darkBorder}` }}>
                Confirm Delete Group
            </DialogTitle>
            <DialogContent sx={{ my: 2 }}>
                <DialogContentText sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Are you sure you want to delete this group? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: `1px solid ${darkBorder}` }}>
                <Button 
                    onClick={handleClose}
                    sx={{ 
                        color: 'white',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={deleteHandler}
                    variant="contained"
                    color="error"
                    sx={{
                        borderWidth: 2,
                        '&:hover': {
                            backgroundColor: 'error.dark',
                        }
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default confirmDeleteDialog
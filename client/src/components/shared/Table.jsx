import { Container, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { matBlack } from '../../constants/color'

const Table = ({ rows, cols, heading, rowHeight = 52 }) => {
    return (
        <Container
            sx={{
                height: "100vh",

            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "none",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    margin: "auto",

                }}
            >
                <Typography
                    textAlign={"center"}
                    variant={"h4"}
                    sx={{
                        margin: "2rem",
                        textTransform: "uppercase",

                    }}

                >{heading}</Typography>
                <DataGrid
                    rows={rows}
                    columns={cols}
                    pageSize={10}
                    rowHeight={rowHeight}
                    style={{
                        height: "80%",

                    }}
                    sx={{
                        border: "none",
                        ".table-header": {
                            bgcolor: "black",
                            color: "white",
                        },

                    }}
                >
                </DataGrid>

            </Paper>
        </Container>
    )
}

export default Table
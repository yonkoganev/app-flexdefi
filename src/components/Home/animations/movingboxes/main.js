import { Box } from "@mui/material";
import PlatformGreyBoxes from "./platformgreyboxes";
import StackedBoxes from "./stackedboxes";
import MovingBoxes from "./MovingBoxes";
import MovingBlueBox from "./MovingBlueBox";
import { blue, grey, orange } from "@mui/material/colors";

const Main = () => {
    return(
        <Box
            sx={{
                width: 160,
                height: 160,
                zIndex: 991,
                bottom: -60,
                scale: 0.7,
                position: "relative",
                transform: 'translateX(200px)',
                "@keyframes changingColor": {
                    "0%": { backgroundColor: blue[400] },
                    "45%": { backgroundColor: blue[400] },
                    "55%": { backgroundColor: grey[700] },
                    "90%": { backgroundColor: grey[700] },
                    "100%": { backgroundColor: blue[400] }
                },
                "@keyframes changingColor2": {
                    "0%": { backgroundColor: blue[300] },
                    "45%": { backgroundColor: blue[300] },
                    "55%": { backgroundColor: grey[400] },
                    "90%": { backgroundColor: grey[400] },
                    "100%": { backgroundColor: blue[300] }
                },
                "@keyframes changingColor3": {
                    "0%": { backgroundColor: blue[200] },
                    "45%": { backgroundColor: blue[200] },
                    "55%": { backgroundColor: grey[300] },
                    "90%": { backgroundColor: grey[300] },
                    "100%": { backgroundColor: blue[200] }
                }
            }}
        >
            <PlatformGreyBoxes />
            <StackedBoxes />
            <MovingBlueBox />
            <MovingBoxes />
        </Box>
    )
}

export default Main;

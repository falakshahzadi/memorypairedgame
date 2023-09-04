
import './App.css'
import { Box } from "@mui/material";
import Maincopy from './Components/Maincopy';
import Maincard from './Components/Maincard';

function App() {
  return (
    <>
     <Box py={'120px'}  sx={{backgroundColor:"#96E2F9"}}>
     <Maincard/>
     </Box>
    </>
  );
}

export default App;

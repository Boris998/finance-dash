import FlexBetween from "@/components/FlexBetween";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import AutoGraphSharpIcon from "@mui/icons-material/AutoGraphSharp";
import { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  const flexDirectionQuery = useMediaQuery("(max-width: 465px)");

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0" color={palette.grey[300]} flexDirection={flexDirectionQuery?'column':'row'}>
      {/* left */}
      <FlexBetween
        gap="0.75rem"
        sx={{
          "&:hover": {
            color: palette.primary[200],
            cursor: 'pointer'
          },
        }}
      >
        <AutoGraphSharpIcon sx={{ fontSize: "2.5rem" }} />
        <Typography variant="h1" fontSize="1.5rem">
          MoneyLens
        </Typography>
      </FlexBetween>

      {/* left */}
      <FlexBetween gap="2rem" padding={flexDirectionQuery?'1rem':'0'}>
        <Box sx={{ "&:hover": { color: palette.primary[200] } }}>
          <Link
            to="/dashboard"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[200] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;

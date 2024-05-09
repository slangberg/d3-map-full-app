import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function MarkerStep({
  children,
  nextClick,
  nextDisabled,
  prevClick,
  index,
  activeStep,
}) {
  return (
    <Box sx={{ display: activeStep === index ? "block" : "none" }}>
      <Box sx={{ pb: 2 }}>{children}</Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: prevClick ? "space-between" : "flex-end",
        }}
      >
        {prevClick && (
          <Button variant="contained" onClick={prevClick}>
            Previous Step
          </Button>
        )}
        {nextClick && (
          <Button
            variant="contained"
            disabled={nextDisabled}
            onClick={nextClick}
          >
            Next Step
          </Button>
        )}
      </Box>
    </Box>
  );
}

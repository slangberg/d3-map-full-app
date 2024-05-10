import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function MarkerStep({
  children,
  nextClick,
  stepValid,
  prevClick,
  index,
  activeStep,
}) {
  const btnRowAlignment = () => {
    if (prevClick && nextClick) {
      return "space-between";
    }
    if (!prevClick && nextClick) {
      return "flex-end";
    }
    return "flex-start";
  };

  return (
    <Box sx={{ display: activeStep === index ? "block" : "none" }}>
      <Box sx={{ pb: 2 }}>{children}</Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: btnRowAlignment(),
        }}
      >
        {prevClick && (
          <Button variant="contained" onClick={prevClick}>
            Previous Step
          </Button>
        )}
        {nextClick && (
          <Button variant="contained" disabled={!stepValid} onClick={nextClick}>
            Next Step
          </Button>
        )}
      </Box>
    </Box>
  );
}

import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

function LoadingAccounts() {
  return (
    <>
      <Typography fontWeight={600} mb={1} fontSize={15} width="20%">
        <Skeleton />
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", width: "100%" }}>
          {[0, 1, 2, 3].map((account) => (
            <Card
              key={account}
              sx={{
                width: "calc(100%/4)",
                marginRight: 2,
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", columnGap: 2 }}
              >
                <Grid container columnGap={2}>
                  <Grid item xs={3}>
                    <Box sx={{ aspectRatio: 1 / 1 }}>
                      <Skeleton width="100%" height="100%" variant="circular" />
                    </Box>
                  </Grid>
                  <Grid item xs={7}>
                    <Box
                      sx={{
                        height: "100%",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Box>
                        <Typography fontWeight={600} fontSize={14}>
                          <Skeleton />
                        </Typography>
                        <Typography fontSize={14}>
                          <Skeleton />
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default LoadingAccounts;

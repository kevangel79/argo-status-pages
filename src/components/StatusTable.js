import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BuildIcon from "@mui/icons-material/Build";
import FlagIcon from "@mui/icons-material/Flag";
import WarningIcon from "@mui/icons-material/Warning";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const StatusTable = (props) => {
  const badges = [
    { icon: CheckCircleIcon, text: "No Issues", color: "success" },
    { icon: BuildIcon, text: "Maintenance", color: "action" },
    { icon: FlagIcon, text: "Notice", color: "info" },
    { icon: WarningIcon, text: "Incident", color: "warning" },
    { icon: RemoveCircleIcon, text: "Outage", color: "error" },
  ];

  const services = [
    {
      name: "Service1",
      status: "No issues",
      description: "Description",
      icon: CheckCircleIcon,
      color: "success",
    },
    {
      name: "Service2",
      status: "No issues",
      description: "Description",
      icon: BuildIcon,
      text: "Maintenance",
      color: "action",
    },
    {
      name: "Service3",
      status: "No issues",
      description: "Description",
      icon: FlagIcon,
      text: "Notice",
      color: "info",
    },
    {
      name: "Service4",
      status: "No issues",
      description: "Description",
      icon: WarningIcon,
      text: "Incident",
      color: "warning",
    },
    {
      name: "Service5",
      status: "No issues",
      description: "Description",
      icon: RemoveCircleIcon,
      text: "Outage",
      color: "error",
    },
  ];

  const header = (
    <Grid container spacing={2}>
      <Grid item xs sx={{ marginTop: "auto", marginBottom: "auto" }}>
        <Typography
          sx={{ fontSize: "16px", fontWeight: "700" }}
          color="#414141"
        >
          Current Status by Service
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          {badges.map((item) => {
            return (
              <Grid
                item
                sx={{
                  display: "inline-flex",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <Box component="div" sx={{ display: "inline" }}>
                  <item.icon fontSize="small" color={item.color} />
                </Box>
                <Box component="div" sx={{ display: "inline" }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#1d1d1d",
                    }}
                    color="text.secondary"
                  >
                    {item.text}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Card>
      <CardHeader title={header} subheader={props.CardHeaderSubTitle} />
      <CardContent sx={{ margin: "10px" }}>
        <Grid container spacing={2}>
          {services.map((item) => {
            return (
              <Grid item container sx={{ paddingBottom: "16px" }}>
                <Grid item xs direction="column" spacing={2}>
                  <Grid item>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#414141",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body2">
                      {item.status + " " + item.description}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <item.icon fontSize="medium" color={item.color} />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatusTable;

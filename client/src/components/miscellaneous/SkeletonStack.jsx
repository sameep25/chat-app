import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const SkeletonStack = () => {
  return (
    <Stack sx={{margin:"1em auto 0 auto" }} spacing={1}>
      <Skeleton variant="rectangular" width={210} height={50} />
      <Skeleton variant="rectangular" width={210} height={50} />
      <Skeleton variant="rectangular" width={210} height={50} />
      <Skeleton variant="rectangular" width={210} height={50} />
      <Skeleton variant="rectangular" width={210} height={50} />
      <Skeleton variant="rectangular" width={210} height={50} />
      <Skeleton variant="rectangular" width={210} height={50} />
      <Skeleton variant="rectangular" width={210} height={50} />
    </Stack>
  );
};

export default SkeletonStack;

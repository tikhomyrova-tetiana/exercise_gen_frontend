import * as React from "react";

export default function Statistics(props) {
  const { name, bodyPart, date } = props;

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{bodyPart}</td>
        <td>{date}</td>
      </tr>
    </>
  );
}

// import { ThemeProvider } from "@emotion/react";
// import { CardContent, createTheme, Typography } from "@mui/material";
// import React from "react";

// const theme = createTheme({
//   status: {
//     danger: "#e53e3e",
//   },
//   palette: {
//     primary: {
//       main: "#00695c",
//     },
//     secondary: {
//       main: "#004d40",
//     },
//   },
// });

// export default function Statistics(props) {
//   const { name, bodyPart, date } = props;
//   return (
//     <div>
//       <CardContent>
//         <ThemeProvider theme={theme}>
//           <Typography variant="p" color="secondary">
//             {name}
//           </Typography>
//           <Typography variant="body1" color="secondary">
//             {bodyPart}
//           </Typography>
//           <Typography variant="body1" color="secondary">
//             {date}
//           </Typography>
//         </ThemeProvider>
//       </CardContent>
//     </div>
//   );
// }

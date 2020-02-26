import { injectGlobal } from "react-emotion";
import normalize from "./normalize";
import globals from "./globals";
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  ${normalize}
  ${globals}
`;

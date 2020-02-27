import { css } from "react-emotion";

export default css`
  body {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    position: relative;
    vertical-align: middle;
  }

  figure {
    margin: 2rem 0;
  }

  figcaption {
    font-size: 80%;
  }

  table {
    width: 100%;
    font-size: 85%;
    border-collapse: collapse;
  }

  .rbc-toolbar .rbc-toolbar-label {
    padding: 0 0px;
  }

  .rbc-row {
    position: relative;
  }

  .rbc-row-segment {
    height: 100vh;
  }

  .rbc-event {
    height: 100%;
  }

  .rbc-day-slot .rbc-event {
    top: 0% !important;
    height: 100% !important;
  }
`;

import React from "react";

import styles from "../css/about.scss";

export default function About() {
  return (
    <div className={styles.container}>
      <p>Work in progess: interactive data visualization</p>
      <p>
        This piece is based on a video installation piece that I made in 2014 called{" "}
        <a href="https://www.mikewesthad.com/projects/public-insecurities.html">
          Public Insecurities
        </a>
        . When you search something on the main page of this site, it pulls Google search
        suggestions for the phrase you entered and types them back to you. These suggestions come
        from private searches, recorded by Google, which are anonymized and re-presented to us. By
        typing a few, charged words into a search bar, expressions of collective, private
        insecurities can be uncovered.
      </p>
    </div>
  );
}

/* <img src="./images/hhear-large.jpg" />
<img src="./images/inside-large.jpg" />
<img src="./images/outside-large.jpg" />
<iframe
  src="https://player.vimeo.com/video/103603472"
  width="100%"
  height="480"
  frameBorder="0"
  allowFullScreen
/> */

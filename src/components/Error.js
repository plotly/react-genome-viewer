import React, { PureComponent } from "react";


export const Error = () => {
    return(
        <div>
            <h4>You did not supply the required data for a GenomeViewer component.</h4>
            <p>GenomeViewer (based on pileup.js) requires:</p>
                <ul>
                    <li>Genome data in .2bit format</li>
                    <li>Track data in .bam format</li>
                    <li>Track index for the track data</li>
                    <li>Range info as an object with 'config', 'start' and 'stop' keys</li>
                </ul>
        </div>
    );
}

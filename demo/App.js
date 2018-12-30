import React, { Component } from 'react';
import { GenomeViewer } from '../src/index';


export default class App extends Component {

    render() {
        return (
            <div
                style={{
                    fontFamily: ["helvetica", "sans-serif"],
                    padding: 16,
                    background: "#F5F5F5",
                    height: "100vh"
                }}
            >
                <h1>react-genome-viewer Demo</h1>
                <div
                    style={{
                        height: 500
                    }}
                >
                    <GenomeViewer
                        genomedata="http://www.biodalliance.org/datasets/hg19.2bit"
                        trackdata="demo/data/synth3.normal.17.7500000-7515000.bam"
                        trackindex="demo/data/synth3.normal.17.7500000-7515000.bam.bai"
                        variantdata="demo/data/snv.chr17.vcf"
                        genedata="http://www.biodalliance.org/datasets/ensGene.bb"
                        range = {{
                            contig: "chr17",
                            start: 7512284,
                            stop: 7512644
                        }}
                    />
                </div>
            </div>
        );
    }
}

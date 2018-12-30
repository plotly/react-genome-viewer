import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "pileup";

import "./pileup.css"
import { Error } from "./Error"


export default class GenomeViewer extends PureComponent {

    constructor(props) {
        super(props);

        const {
            // Required
            genomedata,
            trackdata,
            trackindex,
            range,
            // Optional
            showscale,
            showlocation,
            showvariants,
            variantdata,
            showgenes,
            genedata,
            showcoverage,
            compare
        } = props;

        const track = pileup.formats.bam({
            url: trackdata,
            indexUrl: trackindex
        });

        this.tracks = [];

        // Reference data
        this.tracks.push({
            viz: pileup.viz.genome(),
            isReference: true,
            data: pileup.formats.twoBit({
                url: genomedata
            }),
            name: "Reference"
        });

        // Showscale and location for above
        if (showscale) {
            this.tracks.push({
                viz: pileup.viz.scale(),
                name: "Scale"
            });
        }

        if (showlocation) {
            this.tracks.push({
                viz: pileup.viz.location(),
                name: "Location"
            });
        }

        // Show variant track if supplied
        if (showvariants && variantdata) {
            this.tracks.push({
                viz: pileup.viz.variants(),
                data: pileup.formats.vcf({
                    url: variantdata
                }),
                options: {
                    variantHeightByFrequency: true,
                    onVariantClicked: function(data) {
                        var content = "Variants:\n";
                        for (var i =0;i< data.length;i++) {
                            content +=data[i].id+" - "+data[i].vcfLine+"\n";
                        }
                        alert(content);
                    },
                },
                name: "Variants"
            });
        }

        // Show gene track if supplied
        if (showgenes && genedata) {
            this.tracks.push({
                viz: pileup.viz.genes(),
                data: pileup.formats.bigBed({
                    url: genedata
                }),
                name: "Genes"
            });
        }

        // Show coverage
        if (showcoverage) {
            this.tracks.push({
                viz: pileup.viz.coverage(),
                data: track,
                cssClass: "normal",
                name: "Coverage"
            });
        }

        // Show track
        this.tracks.push({
            viz: pileup.viz.pileup(),
            data: track,
            cssClass: "normal",
            name: "Alignments"
        });

        // Secondary track as pairs if viewed
        if (compare) {
            this.tracks.push({
                viz: pileup.viz.coverage(),
                data: track,
                cssClass: "tumor",
                name: "Coverage"
            });
            this.tracks.push({
                viz: pileup.viz.pileup({
                    viewAsPairs: true
                }),
                data: track,
                cssClass: "tumor",
                name: "Alignments"
            });
        }

        this.range = range;
    }

    componentDidMount() {
        const {
            trackdata,
            trackindex,
            genomedata,
            range
        } = this.props;

        // Only load if all data is supplied
        if (trackdata && trackindex && genomedata && range) {
            this.pileup = pileup.create(this.refs.pileup, {
                range: this.range,
                tracks: this.tracks
            });
        } else {
            ReactDOM.render(<Error />, this.refs.pileup);
        }
    }

    render() {
        return (
            <div ref="pileup"></div>
        );
    }
}


GenomeViewer.defaultProps = {
    showscale: true,
    showlocation: true,
    showvariants: true,
    showgenes: true,
    showcoverage: true,
    compare: false
}

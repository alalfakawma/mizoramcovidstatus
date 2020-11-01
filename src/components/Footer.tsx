import * as React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="py-6 text-xs text-center">
                <p>The data shown here is sourced from <a className="underline" href="https://api.covid19india.org">api.covid19india.org</a> and the creator of this page has no affiliation or mutual connection with the website.</p>
            </div>
        );
    }
}

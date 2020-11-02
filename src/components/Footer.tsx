import * as React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="px-2 py-6 text-xs text-center sm:px-0">
                <p>The data shown here is sourced from <a className="underline" href="https://mcovid19.mizoram.gov.in/">mcovid19.mizoram.gov.in</a>.</p>
            </div>
        );
    }
}

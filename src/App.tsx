import * as React from 'react';
import Cards from './components/Cards';
import Footer from './components/Footer';
import moment from 'moment';

export default class App extends React.Component {

    state = {
        data: []
    };

    componentDidMount() {
        const date = moment().subtract(1, 'day');
        const url = `https://api.covid19india.org/v4/data-${date.year()}-${date.format('MM')}-${date.format('DD')}.json`;

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error("HTTP error " + res.status);
                }
                return res.json();
            })
            .then(data => {
                const { recovered, confirmed, deceased } = data.MZ.total;

                this.setState({
                    data: [confirmed, recovered, (confirmed - recovered), deceased]
                });
            })
            .catch(e => {
                console.error(e);
            });
    }

    render() {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-2/4">
                    <div className="py-6 text-center">
                        <div className="text-3xl font-semibold">Mizoram Covid19 Status</div>
                        <div className="text-xs">Data as on: { moment().subtract(1, 'day').format('DD-MM-YYYY') }</div>
                    </div>
                    <Cards data={ this.state.data } />
                    <Footer />
                </div>
            </div>
        );
    }
}

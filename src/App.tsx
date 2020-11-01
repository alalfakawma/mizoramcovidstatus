import * as React from 'react';
import Cards from './components/Cards';
import Footer from './components/Footer';
import moment from 'moment';
import thangchhuah from './assets/thangchhuah_pattern.png';

export default class App extends React.Component {

    state = {
        data: [],
        newData: []
    };

    componentDidMount() {
        const date = moment().subtract(1, 'day');
        const url = `https://api.covid19india.org/v4/data-${date.year()}-${date.format('MM')}-${date.format('DD')}.json`;
        let data = undefined;

        if (localStorage.getItem('status_data')) {
            data = JSON.parse(localStorage.getItem('status_data'));
        } else {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("HTTP error " + res.status);
                    }
                    return res.json();
                })
                .then(data => {
                    data = data.MZ;
                    localStorage.setItem('status_data', JSON.stringify(data.MZ));
                })
                .catch(e => {
                    console.error(e);
                });
        }

        if (data) {
            const { recovered, confirmed, deceased } = data.total;
            const { confirmed: confirmed_new, recovered: recovered_new } = data.delta;

            this.setState({
                data: [confirmed, recovered, (confirmed - recovered), deceased],
                newData: [confirmed_new, recovered_new, confirmed_new, null]
            });
        } else {
            this.setState({
                data: Array(4).fill("No Data Yet")
            });
        }
    }

    render() {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-2/4">
                    <div className="relative py-6 text-center">
                        <div className="absolute inset-0 max-w-full max-h-full" style={{ backgroundImage: `url(${thangchhuah})`, opacity: 0.2, zIndex: -1 }}></div>
                        <div className="text-3xl font-bold">Mizoram Covid19 Status</div>
                        <div className="text-xs">Data as on: { moment().subtract(1, 'day').format('DD-MM-YYYY') }</div>
                    </div>
                    <Cards data={ this.state.data } newData={ this.state.newData } />
                    <Footer />
                </div>
            </div>
        );
    }
}

import * as React from 'react';
import Cards from './components/Cards';
import Footer from './components/Footer';
import thangchhuah from './assets/thangchhuah_pattern.png';

export default class App extends React.Component {

    constructor(props: any) {
        super(props);

        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    state = {
        data: [],
        newData: [],
        lastUpdated: '',
        fetching: false
    };

    async populateData() {
        const url = `https://mcovid19.mizoram.gov.in/api/home-stats`;
        let data = undefined;

        if (localStorage.getItem('status_data')) {
            data = JSON.parse(localStorage.getItem('status_data'));
        } else {
            this.setState({ fetching: true });
            await fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("HTTP error " + res.status);
                    }
                    return res.json();
                })
                .then(fetch_data => {
                    this.setState({ fetching: false });

                    data = fetch_data.stats;

                    localStorage.setItem('status_data', JSON.stringify(data));
                })
                .catch(e => {
                    console.error(e);
                });
        }

        if (data) {
            const { recovered, samplesTestedPositive: confirmed, deaths } = data;

            this.setState({
                data: [confirmed, recovered, (parseFloat(confirmed) - parseFloat(recovered)), deaths],
            });
        } else {
            this.setState({
                data: Array(4).fill("No Data Yet")
            });
        }
    }

    componentDidMount() {
        this.populateData();
    }

    copyToClipboard() {
        const copyText = `Total Cases: ${this.state.data[0]}\nDischarged: ${this.state.data[1]}\nActive Cases: ${this.state.data[2]}\nDeaths: ${this.state.data[3]}`;

        navigator.clipboard.writeText(copyText).then(function() {
            alert('Data copied to clipboard, you can now share it!');
        }, function(err) {
            console.error('Error copying text', err);
        });
    }

    refreshData() {
        localStorage.removeItem('status_data');
        this.populateData();
    }

    render() {
        let copyToClipboard = null;
        
        if (this.state.data) {
            copyToClipboard = <a onClick={ this.copyToClipboard } className="cursor-pointer hover:underline">copy</a>;
        }

        const fetching = this.state.fetching ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center w-screen h-screen bg-gray-300 bg-opacity-95">
                <div className="text-lg font-semibold animate-pulse">
                    Fetching data...
                </div>
            </div>
        ) : null;

        return (
            <div className="flex items-center justify-center h-screen">
                { fetching }
                <div className="flex-grow lg:flex-grow-0 lg:w-2/4">
                    <ul className="flex justify-end px-2 py-2 md:px-0">
                        <li className="px-2">
                            { copyToClipboard }
                        </li>
                        <li className="px-2">
                            <a onClick={ this.refreshData } className="cursor-pointer hover:underline">refresh</a>
                        </li>
                    </ul>
                    <div className="relative py-6 text-center">
                        <div className="absolute inset-0 max-w-full max-h-full" style={{ backgroundImage: `url(${thangchhuah})`, opacity: 0.2, zIndex: -1 }}></div>
                        <div className="text-3xl font-bold">Mizoram Covid19 Status</div>
                    </div>
                    <Cards data={ this.state.data } newData={ this.state.newData } />
                    <Footer />
                </div>
            </div>
        );
    }
}

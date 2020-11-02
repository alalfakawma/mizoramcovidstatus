import * as React from 'react';
import Cards from './components/Cards';
import Footer from './components/Footer';
import thangchhuah from './assets/thangchhuah_pattern.png';

export default class App extends React.Component {

    constructor(props: any) {
        super(props);

        this.copyToClipboard = this.copyToClipboard.bind(this);
    }

    state = {
        data: [],
        newData: [],
        lastUpdated: ''
    };

    async componentDidMount() {
        const url = `https://api.covid19india.org/data.json`;
        let data = undefined;

        if (localStorage.getItem('status_data')) {
            console.log('asd');
            data = JSON.parse(localStorage.getItem('status_data'));
        } else {
            await fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("HTTP error " + res.status);
                    }
                    return res.json();
                })
                .then(fetch_data => {
                    fetch_data.statewise.forEach((statedata: any) => {
                        if (statedata.statecode === 'MZ') {
                            data = statedata;
                        }
                    });

                    localStorage.setItem('status_data', JSON.stringify(data));
                })
                .catch(e => {
                    console.error(e);
                });
        }

        if (data) {
            const { recovered, confirmed, deaths, deltaconfirmed: confirmed_new, deltarecovered: recovered_new, deltadeaths: deaths_new, lastupdatedtime } = data;

            this.setState({
                data: [confirmed, recovered, (parseFloat(confirmed) - parseFloat(recovered)), deaths],
                newData: [confirmed_new, recovered_new, confirmed_new, deaths_new],
                lastUpdated: lastupdatedtime
            });
        } else {
            this.setState({
                data: Array(4).fill("No Data Yet")
            });
        }
    }

    copyToClipboard() {
        const copyText = `Total Cases: ${this.state.data[0]}\nDischarged: ${this.state.data[1]}\nActive Cases: ${this.state.data[2]}\nDeaths: ${this.state.data[3]}`;

        navigator.clipboard.writeText(copyText).then(function() {
            alert('Data copied to clipboard, you can now share it!');
        }, function(err) {
            console.error('Error copying text', err);
        });
    }

    render() {
        let copyToClipboard = null;
        
        if (this.state.data) {
            copyToClipboard = <a onClick={ this.copyToClipboard } className="cursor-pointer hover:underline">copy</a>;
        }

        return (
            <div className="flex items-center justify-center h-screen">
                <div className="max-w-full lg:w-2/4">
                    <ul className="flex justify-end py-2">
                        <li>
                            { copyToClipboard }
                        </li>
                    </ul>
                    <div className="relative py-6 text-center">
                        <div className="absolute inset-0 max-w-full max-h-full" style={{ backgroundImage: `url(${thangchhuah})`, opacity: 0.2, zIndex: -1 }}></div>
                        <div className="text-3xl font-bold">Mizoram Covid19 Status</div>
                        <div className="text-xs">Last updated: { this.state.lastUpdated }</div>
                    </div>
                    <Cards data={ this.state.data } newData={ this.state.newData } />
                    <Footer />
                </div>
            </div>
        );
    }
}

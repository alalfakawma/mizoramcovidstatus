import * as React from 'react';
import Card from './Card';

type CardsProps = {
    data: Array<number>
}

export default class Cards extends React.Component<CardsProps> {

    constructor(props: CardsProps) {
        super(props);
    }

    state = {
        cards: ['Total Cases', 'Discharged', 'Active Cases', 'Deaths'],
    };

    render() {
        return (
            <div className="flex justify-around">
                { 
                    this.state.cards.map((card, i) => {
                        return <Card key={ card } name={ card } count={ this.props.data[i] } />
                    }) 
                }
            </div>
        );
    }
}

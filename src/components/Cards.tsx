import * as React from 'react';
import Card from './Card';

export default class Cards extends React.Component {
    state = {
        cards: ['Test', 'Test']
    };

    render() {
        return (
            <div className="flex">
                { 
                    this.state.cards.map(card => {
                        return <Card key={ card } name={ card } />
                    }) 
                }
            </div>
        );
    }
}

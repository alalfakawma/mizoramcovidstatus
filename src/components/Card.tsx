import * as React from 'react';

type CardProps = {
    name: string,
    count: number,
    newCount: number
};

export default class Card extends React.Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
    }

    render() {
        return (
            <div className="w-1/4 max-w-sm overflow-hidden">
                <div className="px-6 py-10">
                    <div className="mb-2 text-xl font-bold text-center">{ this.props.name }</div>
                    <p className="text-base font-bold text-center text-gray-700">
                        { this.props.count } { (parseFloat(this.props.newCount as any) !== 0) && `(+${this.props.newCount})` }
                    </p>
                </div>
            </div>
        );
    }
} 

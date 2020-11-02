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
                <div className="py-10 sm:px-6">
                    <div className="mb-2 text-xs font-bold text-center sm:text-xl">{ this.props.name }</div>
                    <p className="text-base font-bold text-center text-gray-700">
                        { this.props.count }
                    </p>
                </div>
            </div>
        );
    }
} 

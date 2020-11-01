import * as React from 'react';

type CardProps = {
    name: string
};

export default class Card extends React.Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
    }

    render() {
        return (
            <div className="max-w-sm rounded overflow-hidden">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{ this.props.name }</div>
                    <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
            </div>
        );
    }
} 

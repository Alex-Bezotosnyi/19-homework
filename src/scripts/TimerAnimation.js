import React from "react";

const CountdownCircle = ({radius}) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke="#333"
            strokeWidth="6"
            d={describeArc(50, 50, 66, 0, radius)}
        />
    </svg>
);

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    let start = polarToCartesian(x, y, radius, endAngle);
    let end = polarToCartesian(x, y, radius, startAngle);
    let largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    let d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(' ');

    return d;
}

export default CountdownCircle;
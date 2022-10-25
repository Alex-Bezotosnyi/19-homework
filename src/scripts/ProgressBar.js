import React from "react";

const containerStyle = {
    background: '#ededed',
    width: '75%'
};

const contentStyle = {
    background: 'linear-gradient(100deg, rgba(255,57,57,1) 0%, rgba(233,255,3,1) 50%, rgba(0,255,128,1) 100%)',
    opacity: '0.8',
    height: '12px',
    textAlign: 'center',
    lineHeight: '24px',
    fontFamily: 'sans-serif',
    transition: '0.3s'
};

const ProgressBar= ({progress}) => {
    const state = `${progress}%`;
    return (
        <div className="progressbar-container" style={containerStyle}>
            <div className="progressbar" style={{...contentStyle, width: state}}>
            </div>
        </div>
    );
};

export default ProgressBar;
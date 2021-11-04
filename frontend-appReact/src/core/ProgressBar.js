import React from "react";
const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      height: 30,
      width: "100%",
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      marginTop: 10,
      transition: "all .5s ease",
      WebkitTransition: "all .5s ease",
      MozTransition: "all .5s ease"
    };
  
    const fillerStyles = {
      height: "100%",
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: "inherit",
      textAlign: "right",
      transition: "all .5s ease",
      WebkitTransition: "all .5s ease",
      MozTransition: "all .5s ease"
    };
  
    const labelStyles = {
      padding: 5,
      color: "white",
      fontWeight: "bold",
      fontSize: '24px',
      transition: "all .5s ease",
      WebkitTransition: "all .5s ease",
      MozTransition: "all .5s ease"
    };
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
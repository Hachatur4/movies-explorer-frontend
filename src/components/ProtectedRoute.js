import React from "react";

const ProtectedRouteElement = ({
  elementOne: ComponentOne,
  elementTwo: ComponentTwo,
  ...props
}) => {
  return props.loggedIn ? <ComponentTwo /> : <ComponentOne />;
};

export default ProtectedRouteElement;

import React, { Children, cloneElement } from 'react';
import { View, SafeAreaView } from 'react-native';

const isReactComponentType = (component, type) => {
  const types = Array.isArray(type) ? type : [type];
  return types.indexOf(component.type || component) >= 0;
};

const isReactFragment = component => isReactComponentType(component, React.Fragment);
const isReactView = component => isReactComponentType(component, [View, SafeAreaView]);

const mapChildrenWithProps = (children, props) => Children.map(children, (child) => {
  if (isReactFragment(child) || isReactView(child)) {
    const { children: childChildren } = child.props;
    return mapChildrenWithProps(childChildren, props);
  }
  return cloneElement(child, props);
});

export default mapChildrenWithProps;

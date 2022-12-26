import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';


interface LoadingProps {
  type: LoadingType;
  color: string
}

export const Loading: React.FC<LoadingProps> = ({ type, color , ...props}) => (
    <ReactLoading type={type} color={color} height={'5%'} width={'5%'} {...props}/>
);



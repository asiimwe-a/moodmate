import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div {...props} />;
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div {...props} />;
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => {
  return <h2 {...props} />;
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (props) => {
  return <p {...props} />;
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div {...props} />;
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div {...props} />;
};
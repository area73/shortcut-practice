// TODO: Make it polymorphic

import { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';

type MaybeBlockProps<T extends ElementType> = {
  // eslint-disable-next-line react/require-default-props
  as?: T;
  children: ReactNode;
};

const MaybeBlock = <T extends ElementType = 'div'>({
  as,
  children,
  ...props
}: MaybeBlockProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof MaybeBlockProps<T>>) => {
  const Element: ElementType = as || 'div';
  // eslint-disable-next-line react/jsx-props-no-spreading
  return children ? <Element {...props}>{children}</Element> : null;
};

export default MaybeBlock;

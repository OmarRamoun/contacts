const getContainerPadding = (props: any) => {
  const verticalPadding = props.overrideVerticalPadding ? `${props.overrideVerticalPadding}px ` : '2px ';

  if (props.overrideHorizontalPadding !== undefined) {
    return `${verticalPadding}${props.overrideHorizontalPadding}`;
  }

  if (props.iconLeft) return `${verticalPadding} 0`;

  return `${verticalPadding}${props.theme.button[props.paddingKey]}`;
};

export {getContainerPadding};

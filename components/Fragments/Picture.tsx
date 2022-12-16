type Props = {
  image: string;
  image_x2?: string;
  image_x3?: string;
};

const Picture = (props: Props) => {
  return (
    <picture>
      {props.image_x3 && <source media='(min-width: 1024px)' srcSet={props.image_x3} />}
      {props.image_x2 && <source media='(min-width: 800px)' srcSet={props.image_x2} />}
      <img src={props.image} alt='' loading='lazy' />
    </picture>
  );
};

export default Picture;

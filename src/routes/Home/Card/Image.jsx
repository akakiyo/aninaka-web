const Image = ({ image }) => {
  if (!image) {
    return <div>画像なし</div>;
  }

  return <img width="350px" height="250px" src={image} alt="画像なし" />;
};

export default Image;

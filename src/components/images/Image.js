import image from "./dr1.jpg";

const Image = () => {
  return (
    <img
      style={{ height: "100vh", width: "100%" }}
      src={image}
      alt='home pic'
    />
  );
};
export default Image;
